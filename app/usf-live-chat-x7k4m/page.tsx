export const revalidate = 0

import { UserDropdown } from './UserDropdown'

async function getStats() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const headers = { 'apikey': key!, 'Authorization': `Bearer ${key}` }
  const adminHeaders = { 'apikey': serviceKey!, 'Authorization': `Bearer ${serviceKey}` }

  const minus30min = new Date(Date.now() - 30 * 60 * 1000).toISOString()
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const [r30min, rToday, rReports] = await Promise.all([
    fetch(`${url}/rest/v1/chat_messages?select=user_id,username&created_at=gte.${minus30min}`, { headers, cache: 'no-store' }),
    fetch(`${url}/rest/v1/chat_messages?select=id,user_id,username,content,created_at&created_at=gte.${startOfDay.toISOString()}&order=created_at.asc`, { headers, cache: 'no-store' }),
    fetch(`${url}/rest/v1/reported_messages?select=message_id,reported_user_id,reporter_id,created_at&order=created_at.desc&limit=50`, { headers: adminHeaders, cache: 'no-store' }),
  ])

  const [d30min, dToday, dReports] = await Promise.all([r30min.json(), rToday.json(), rReports.json()])

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
  }
}

export default async function Page() {
  const { activeUsers, usersToday, messagesByUser, totalToday, reports, messageContents, reporterProfiles } = await getStats()

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace', padding: '40px 24px' }}>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#00C8FF', marginBottom: 4 }}>USF — Chat Monitor</h1>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>F5 pour rafraîchir</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '20px 24px' }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>Actifs (30 dernières min)</p>
            <p style={{ fontSize: 56, fontWeight: 700, color: '#00ff88', lineHeight: 1 }}>{activeUsers.length}</p>
            {activeUsers.length > 0 && (
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>
                {activeUsers.map(([, name]) => name).join(', ')}
              </p>
            )}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '16px 20px' }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>Users aujourd'hui</p>
            <p style={{ fontSize: 36, fontWeight: 700, color: '#00C8FF' }}>{usersToday.length}</p>
            {usersToday.length > 0 && (
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>
                {usersToday.map(([, name]) => name).join(', ')}
              </p>
            )}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '20px 24px' }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>Messages aujourd'hui</p>
            <p style={{ fontSize: 36, fontWeight: 700, color: '#00C8FF', marginBottom: 16 }}>{totalToday}</p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 4 }}>
              {messagesByUser.map(([, { username, count, messages }], i) => (
                <UserDropdown
                  key={i}
                  username={username}
                  count={count}
                  isHeavy={count > totalToday * 0.3}
                  messages={messages}
                />
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '20px 24px' }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>Messages signalés</p>
            <p style={{ fontSize: 36, fontWeight: 700, color: reports.length > 0 ? '#ff6b6b' : '#00ff88', marginBottom: reports.length > 0 ? 16 : 0 }}>{reports.length}</p>
            {reports.map((r: any, i: number) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Signalé : </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#ff6b6b' }}>{messageContents[r.message_id]?.username || r.reported_user_id}</span>
                    <br />
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Par : </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{reporterProfiles[r.reporter_id] || r.reporter_id}</span>
                  </div>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap', marginLeft: 8 }}>{new Date(r.created_at).toLocaleString('fr-CA', { timeZone: 'America/Toronto' })}</span>
                </div>
                {messageContents[r.message_id]?.content && (
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: 0, fontStyle: 'italic' }}>"{messageContents[r.message_id].content}"</p>
                )}
              </div>
            ))}
            {reports.length === 0 && (
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>Aucun signalement</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
