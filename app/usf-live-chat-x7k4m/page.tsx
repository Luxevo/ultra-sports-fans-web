export const revalidate = 0

import { UserDropdown } from './UserDropdown'
import { DateRangePicker } from './DateRangePicker'
import { Suspense } from 'react'

async function getStats(fromDate: string, toDate: string) {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const headers = { 'apikey': key!, 'Authorization': `Bearer ${key}` }
  const adminHeaders = { 'apikey': serviceKey!, 'Authorization': `Bearer ${serviceKey}` }

  const minus30min = new Date(Date.now() - 30 * 60 * 1000).toISOString()
  const startOfDay = new Date(`${fromDate}T00:00:00`)
  const endOfDay = new Date(`${toDate}T23:59:59`)

  const [r30min, rToday, rReports, rNewUsers] = await Promise.all([
    fetch(`${url}/rest/v1/chat_messages?select=user_id,username&created_at=gte.${minus30min}`, { headers, cache: 'no-store' }),
    fetch(`${url}/rest/v1/chat_messages?select=id,user_id,username,content,created_at&created_at=gte.${startOfDay.toISOString()}&created_at=lte.${endOfDay.toISOString()}&order=created_at.asc`, { headers, cache: 'no-store' }),
    fetch(`${url}/rest/v1/reported_messages?select=message_id,reported_user_id,reporter_id,created_at&order=created_at.desc&limit=50`, { headers: adminHeaders, cache: 'no-store' }),
    fetch(`${url}/rest/v1/profiles?select=id,username,created_at&created_at=gte.${startOfDay.toISOString()}&created_at=lte.${endOfDay.toISOString()}&order=created_at.desc`, { headers: adminHeaders, cache: 'no-store' }),
  ])

  const [d30min, dToday, dReports, dNewUsers] = await Promise.all([r30min.json(), rToday.json(), rReports.json(), rNewUsers.json()])

  const rawReports = Array.isArray(dReports) ? dReports : []

  // Fetch message contents + reporter usernames separately
  const messageIds = [...new Set(rawReports.map((r: any) => r.message_id).filter(Boolean))]
  const reporterIds = [...new Set(rawReports.map((r: any) => r.reporter_id).filter(Boolean))]

  const messageContents: Record<string, { content: string; username: string }> = {}
  const reporterProfiles: Record<string, string> = {}

  await Promise.all([
    messageIds.length > 0
      ? fetch(`${url}/rest/v1/chat_messages?select=id,content,username&id=in.(${messageIds.join(',')})`, { headers: adminHeaders, cache: 'no-store' })
          .then(r => r.json()).then((d: any[]) => { if (Array.isArray(d)) for (const m of d) messageContents[m.id] = { content: m.content, username: m.username } })
      : Promise.resolve(),
    reporterIds.length > 0
      ? fetch(`${url}/rest/v1/profiles?select=id,username&id=in.(${reporterIds.join(',')})`, { headers: adminHeaders, cache: 'no-store' })
          .then(r => r.json()).then((d: any[]) => { if (Array.isArray(d)) for (const p of d) reporterProfiles[p.id] = p.username })
      : Promise.resolve(),
  ])

  const activeUsers = [...new Map((d30min as any[]).map((m: any) => [m.user_id, m.username])).entries()]
  const usersToday = [...new Map((dToday as any[]).map((m: any) => [m.user_id, m.username])).entries()]

  const messagesByUser = Object.entries(
    (dToday as any[]).reduce((acc: Record<string, { username: string; count: number; messages: { id: string; content: string; created_at: string }[] }>, m: any) => {
      if (!acc[m.user_id]) acc[m.user_id] = { username: m.username, count: 0, messages: [] }
      acc[m.user_id].count++
      acc[m.user_id].messages.push({ id: m.id, content: m.content, created_at: m.created_at })
      return acc
    }, {})
  ).sort((a, b) => b[1].count - a[1].count)

  return {
    activeUsers,
    usersToday,
    messagesByUser,
    totalToday: (dToday as any[]).length,
    reports: rawReports,
    messageContents,
    reporterProfiles,
    newUsers: Array.isArray(dNewUsers) ? dNewUsers : [],
  }
}

export default async function Page({ searchParams }: { searchParams: Promise<{ from?: string; to?: string }> }) {
  const today = new Date().toISOString().slice(0, 10)
  const { from = today, to = today } = await searchParams
  const { activeUsers, usersToday, messagesByUser, totalToday, reports, messageContents, reporterProfiles, newUsers } = await getStats(from, to)

  const card = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '16px 20px' }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#00C8FF', margin: 0 }}>USF — Chat Monitor</h1>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: '4px 0 0' }}>F5 pour rafraîchir</p>
        </div>
        <Suspense>
          <DateRangePicker from={from} to={to} />
        </Suspense>
      </div>

      {/* Row 1 : 3 stats rapides */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 12 }}>
        <div style={card}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>Actifs (30 min)</p>
          <p style={{ fontSize: 48, fontWeight: 700, color: '#00ff88', lineHeight: 1, marginBottom: 6 }}>{activeUsers.length}</p>
          {activeUsers.length > 0 && (
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0 }}>{activeUsers.map(([, n]) => n).join(', ')}</p>
          )}
        </div>
        <div style={card}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>Users actifs</p>
          <p style={{ fontSize: 48, fontWeight: 700, color: '#00C8FF', lineHeight: 1, marginBottom: 6 }}>{usersToday.length}</p>
          {usersToday.length > 0 && (
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0 }}>{usersToday.map(([, n]) => n).join(', ')}</p>
          )}
        </div>
        <div style={card}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>Nouveaux inscrits</p>
          <p style={{ fontSize: 48, fontWeight: 700, color: '#00ff88', lineHeight: 1, marginBottom: 6 }}>{newUsers.length}</p>
          {newUsers.length > 0 && (
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0 }}>{newUsers.map((u: any) => u.username).join(', ')}</p>
          )}
          {newUsers.length === 0 && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', margin: 0 }}>Aucun</p>}
        </div>
      </div>

      {/* Row 2 : Messages + Signalés */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={card}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>Messages</p>
          <p style={{ fontSize: 36, fontWeight: 700, color: '#00C8FF', marginBottom: 12 }}>{totalToday}</p>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {messagesByUser.map(([, { username, count, messages }], i) => (
              <UserDropdown key={i} username={username} count={count} isHeavy={count > totalToday * 0.3} messages={messages} />
            ))}
          </div>
        </div>

        <div style={card}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>Signalés</p>
          <p style={{ fontSize: 36, fontWeight: 700, color: reports.length > 0 ? '#ff6b6b' : '#00ff88', marginBottom: reports.length > 0 ? 12 : 0 }}>{reports.length}</p>
          {reports.map((r: any, i: number) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <div>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Signalé : </span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#ff6b6b' }}>{messageContents[r.message_id]?.username || r.reported_user_id}</span>
                  <br />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Par : </span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{reporterProfiles[r.reporter_id] || r.reporter_id}</span>
                </div>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap', marginLeft: 8 }}>{new Date(r.created_at).toLocaleString('fr-CA', { timeZone: 'America/Toronto' })}</span>
              </div>
              {messageContents[r.message_id]?.content && (
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', margin: 0, fontStyle: 'italic' }}>"{messageContents[r.message_id].content}"</p>
              )}
            </div>
          ))}
          {reports.length === 0 && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>Aucun signalement</p>}
        </div>
      </div>
    </div>
  )
}
