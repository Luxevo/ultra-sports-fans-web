export const revalidate = 0

import { UserDropdown } from './UserDropdown'
import { DateRangePicker } from './DateRangePicker'
import { GrowthPicker } from './GrowthPicker'
import { Suspense } from 'react'

async function getStats(fromDate: string, toDate: string, gfrom: string, gto: string) {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const headers = { 'apikey': key!, 'Authorization': `Bearer ${key}` }
  const adminHeaders = { 'apikey': serviceKey!, 'Authorization': `Bearer ${serviceKey}` }

  const minus30min = new Date(Date.now() - 30 * 60 * 1000).toISOString()
  const startOfDay = new Date(`${fromDate}T00:00:00-04:00`)
  const endOfDay = new Date(`${toDate}T23:59:59-04:00`)

  const gStart = new Date(`${gfrom}T00:00:00-04:00`)
  const gEnd = new Date(`${gto}T23:59:59-04:00`)

  const [r30min, r30minTeam, rToday, rTodayTeam, rReports, rBanned, rNewUsers, rGrowth, rTotal] = await Promise.all([
    fetch(`${url}/rest/v1/chat_messages?select=user_id,username&created_at=gte.${minus30min}`, { headers, cache: 'no-store' }),
    fetch(`${url}/rest/v1/nhl_team_chat_messages?select=user_id,username&created_at=gte.${minus30min}`, { headers, cache: 'no-store' }),
    fetch(`${url}/rest/v1/chat_messages?select=id,user_id,username,content,created_at,match_id&created_at=gte.${startOfDay.toISOString()}&created_at=lte.${endOfDay.toISOString()}&order=created_at.asc`, { headers, cache: 'no-store' }),
    fetch(`${url}/rest/v1/nhl_team_chat_messages?select=id,user_id,username,content,created_at,team_id&created_at=gte.${startOfDay.toISOString()}&created_at=lte.${endOfDay.toISOString()}&order=created_at.asc`, { headers, cache: 'no-store' }),
    fetch(`${url}/rest/v1/reported_messages?select=message_id,reported_user_id,reporter_id,created_at&order=created_at.desc&limit=50`, { headers: adminHeaders, cache: 'no-store' }),
    fetch(`${url}/rest/v1/profiles?select=id,username,created_at&is_banned=eq.true&order=updated_at.desc`, { headers: adminHeaders, cache: 'no-store' }),
    fetch(`${url}/rest/v1/profiles?select=id,username,created_at&created_at=gte.${startOfDay.toISOString()}&created_at=lte.${endOfDay.toISOString()}&order=created_at.desc`, { headers: adminHeaders, cache: 'no-store' }),
    fetch(`${url}/rest/v1/profiles?select=created_at&created_at=gte.${gStart.toISOString()}&created_at=lte.${gEnd.toISOString()}&order=created_at.asc`, { headers: adminHeaders, cache: 'no-store' }),
    fetch(`${url}/rest/v1/profiles?select=count&created_at=lte.${gEnd.toISOString()}`, { headers: { ...adminHeaders, 'Prefer': 'count=exact' }, cache: 'no-store' }),
  ])

  const [d30min, d30minTeam, dToday, dTodayTeam, dReports, dBanned, dNewUsers, dGrowth] = await Promise.all([r30min.json(), r30minTeam.json(), rToday.json(), rTodayTeam.json(), rReports.json(), rBanned.json(), rNewUsers.json(), rGrowth.json(), rTotal.json()])
  const totalUsers = parseInt(rTotal.headers.get('content-range')?.split('/')[1] || '0')

  const rawReports = Array.isArray(dReports) ? dReports : []

  // Fetch message contents + reporter usernames separately
  const messageIds = [...new Set(rawReports.map((r: any) => r.message_id).filter(Boolean))]
  const reporterIds = [...new Set(rawReports.map((r: any) => r.reporter_id).filter(Boolean))]

  const messageContents: Record<string, { content: string; username: string }> = {}
  const reporterProfiles: Record<string, string> = {}

  // Fetch match names for match chat
  const matchIds = [...new Set((Array.isArray(dToday) ? dToday : []).map((m: any) => m.match_id).filter(Boolean))]
  const matchNames: Record<string, string> = {}

  // Fetch team names for team chat
  const teamIds = [...new Set((Array.isArray(dTodayTeam) ? dTodayTeam : []).map((m: any) => m.team_id).filter(Boolean))]
  const teamNames: Record<string, string> = {}

  await Promise.all([
    messageIds.length > 0
      ? fetch(`${url}/rest/v1/chat_messages?select=id,content,username&id=in.(${messageIds.join(',')})`, { headers: adminHeaders, cache: 'no-store' })
          .then(r => r.json()).then((d: any[]) => { if (Array.isArray(d)) for (const m of d) messageContents[m.id] = { content: m.content, username: m.username } })
      : Promise.resolve(),
    reporterIds.length > 0
      ? fetch(`${url}/rest/v1/profiles?select=id,username&id=in.(${reporterIds.join(',')})`, { headers: adminHeaders, cache: 'no-store' })
          .then(r => r.json()).then((d: any[]) => { if (Array.isArray(d)) for (const p of d) reporterProfiles[p.id] = p.username })
      : Promise.resolve(),
    matchIds.length > 0
      ? fetch(`${url}/rest/v1/matches_cache?select=id,away_team_abbr,home_team_abbr&id=in.(${matchIds.join(',')})`, { headers, cache: 'no-store' })
          .then(r => r.json()).then((d: any[]) => { if (Array.isArray(d)) for (const m of d) matchNames[m.id] = `${m.away_team_abbr} vs ${m.home_team_abbr}` })
      : Promise.resolve(),
    teamIds.length > 0
      ? fetch(`${url}/rest/v1/teams?select=goalserve_id,abbr&goalserve_id=in.(${teamIds.join(',')})`, { headers, cache: 'no-store' })
          .then(r => r.json()).then((d: any[]) => { if (Array.isArray(d)) for (const t of d) teamNames[t.goalserve_id] = t.abbr })
      : Promise.resolve(),
  ])

  // Growth chart: group by day (EDT)
  const growthByDay: Record<string, number> = {}
  if (Array.isArray(dGrowth)) {
    for (const u of dGrowth) {
      const day = new Date(u.created_at).toLocaleDateString('en-CA', { timeZone: 'America/Toronto' })
      growthByDay[day] = (growthByDay[day] || 0) + 1
    }
  }
  // Fill missing days in range
  const growthDays: { date: string; count: number }[] = []
  const cursor = new Date(gStart)
  while (cursor <= gEnd) {
    const day = cursor.toLocaleDateString('en-CA', { timeZone: 'America/Toronto' })
    growthDays.push({ date: day, count: growthByDay[day] || 0 })
    cursor.setDate(cursor.getDate() + 1)
  }
  const maxGrowth = Math.max(...growthDays.map(d => d.count), 1)
  const firstDate = growthDays.find(d => d.count > 0)?.date || gfrom

  const allActive = [...(Array.isArray(d30min) ? d30min : []), ...(Array.isArray(d30minTeam) ? d30minTeam : [])]
  const allToday = [...(Array.isArray(dToday) ? dToday : []), ...(Array.isArray(dTodayTeam) ? dTodayTeam : [])]

  const activeUsers = [...new Map(allActive.map((m: any) => [m.user_id, m.username])).entries()]
  const usersToday = [...new Map(allToday.map((m: any) => [m.user_id, m.username])).entries()]

  const totalMatchMessages = Array.isArray(dToday) ? dToday.length : 0
  const totalTeamMessages = Array.isArray(dTodayTeam) ? dTodayTeam.length : 0

  const buildByUser = (data: any[], withMatchLabel = false) => Object.entries(
    data.reduce((acc: Record<string, { username: string; count: number; messages: { id: string; content: string; created_at: string; matchLabel?: string }[] }>, m: any) => {
      if (!acc[m.user_id]) acc[m.user_id] = { username: m.username, count: 0, messages: [] }
      acc[m.user_id].count++
      const matchLabel = m.matchLabel
        || (withMatchLabel && m.match_id ? matchNames[m.match_id] || m.match_id : undefined)
      acc[m.user_id].messages.push({ id: m.id, content: m.content, created_at: m.created_at, matchLabel })
      return acc
    }, {})
  ).sort((a, b) => b[1].count - a[1].count)

  // Group match chat by match
  const matchData = Array.isArray(dToday) ? dToday : []
  const byMatch = Object.entries(
    matchData.reduce((acc: Record<string, { label: string; count: number }>, m: any) => {
      const key = m.match_id || 'unknown'
      if (!acc[key]) acc[key] = { label: matchNames[key] || key, count: 0 }
      acc[key].count++
      return acc
    }, {})
  ).sort((a, b) => b[1].count - a[1].count)

  const matchMessagesByUser = buildByUser(matchData, true)
  const teamData = Array.isArray(dTodayTeam) ? dTodayTeam : []
  const teamMessagesByUser = buildByUser(teamData.map((m: any) => ({
    ...m,
    matchLabel: teamNames[m.team_id] || m.team_id,
  })))

  const byTeam = Object.entries(
    teamData.reduce((acc: Record<string, { label: string; count: number }>, m: any) => {
      const key = m.team_id || 'unknown'
      if (!acc[key]) acc[key] = { label: teamNames[key] || key, count: 0 }
      acc[key].count++
      return acc
    }, {})
  ).sort((a, b) => b[1].count - a[1].count)

  return {
    activeUsers,
    usersToday,
    matchMessagesByUser,
    teamMessagesByUser,
    byMatch,
    byTeam,
    totalToday: allToday.length,
    totalMatchMessages,
    totalTeamMessages,
    reports: rawReports,
    bannedUsers: Array.isArray(dBanned) ? dBanned : [],
    messageContents,
    reporterProfiles,
    newUsers: Array.isArray(dNewUsers) ? dNewUsers : [],
    growthDays,
    maxGrowth,
    totalUsers,
    firstDate,
  }
}

export default async function Page({ searchParams }: { searchParams: Promise<{ from?: string; to?: string; gfrom?: string; gto?: string }> }) {
  const today = new Date().toISOString().slice(0, 10)
  const last7 = new Date(Date.now() - 6 * 86400000).toISOString().slice(0, 10)
  const { from = today, to = today, gfrom = last7, gto = today } = await searchParams
  const { activeUsers, usersToday, matchMessagesByUser, teamMessagesByUser, byMatch, byTeam, totalToday, totalMatchMessages, totalTeamMessages, reports, bannedUsers, messageContents, reporterProfiles, newUsers, growthDays, maxGrowth, totalUsers, firstDate } = await getStats(from, to, gfrom, gto)

  const card = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '16px 20px' }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: '4px 0 0' }}>F5 pour rafraîchir</p>
        </div>
        <Suspense>
          <DateRangePicker from={from} to={to} />
        </Suspense>
      </div>

      {/* Row 1 : 2 stats rapides */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div style={card}>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Actifs (30 min)</p>
          <p style={{ fontSize: 48, fontWeight: 700, color: '#00ff88', lineHeight: 1, marginBottom: 6 }}>{activeUsers.length}</p>
          {activeUsers.length > 0 && (
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0 }}>{activeUsers.map(([, n]) => n).join(', ')}</p>
          )}
        </div>
        <div style={card}>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Users actifs</p>
          <p style={{ fontSize: 48, fontWeight: 700, color: '#00C8FF', lineHeight: 1, marginBottom: 6 }}>{usersToday.length}</p>
          {usersToday.length > 0 && (
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0 }}>{usersToday.map(([, n]) => n).join(', ')}</p>
          )}
        </div>
      </div>

      {/* Row 2 : Messages + Signalés */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={card}>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Messages total</p>
          <p style={{ fontSize: 36, fontWeight: 700, color: '#00C8FF', marginBottom: 12 }}>{totalToday}</p>

          {/* Chat matchs */}
          <p style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.75)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Chat matchs — {totalMatchMessages}</p>
          {byMatch.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {byMatch.map(([, { label, count }], i) => (
                <span key={i} style={{ fontSize: 11, background: 'rgba(0,200,255,0.1)', border: '1px solid rgba(0,200,255,0.2)', borderRadius: 6, padding: '2px 8px', color: '#00C8FF' }}>
                  {label} — {count}
                </span>
              ))}
            </div>
          )}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: 16 }}>
            {matchMessagesByUser.length === 0 && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', padding: '6px 0' }}>Aucun message</p>}
            {matchMessagesByUser.map(([, { username, count, messages }], i) => (
              <UserDropdown key={i} username={username} count={count} isHeavy={count > totalMatchMessages * 0.3} messages={messages} />
            ))}
          </div>

          {/* Chat équipes */}
          <p style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.75)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Chat équipes — {totalTeamMessages}</p>
          {byTeam.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {byTeam.map(([, { label, count }], i) => (
                <span key={i} style={{ fontSize: 11, background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: 6, padding: '2px 8px', color: '#00ff88' }}>
                  {label} — {count}
                </span>
              ))}
            </div>
          )}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {teamMessagesByUser.length === 0 && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', padding: '6px 0' }}>Aucun message</p>}
            {teamMessagesByUser.map(([, { username, count, messages }], i) => (
              <UserDropdown key={i} username={username} count={count} isHeavy={count > totalTeamMessages * 0.3} messages={messages} />
            ))}
          </div>
        </div>

        <div style={card}>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Signalés</p>
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

          {/* Bannis */}
          <div style={{ marginTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>
              Bannis <span style={{ color: bannedUsers.length > 0 ? '#ff6b6b' : 'rgba(255,255,255,0.3)' }}>({bannedUsers.length})</span>
            </p>
            {bannedUsers.length === 0 && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>Aucun</p>}
            {bannedUsers.map((u: any, i: number) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#ff6b6b' }}>{u.username}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inscriptions — en bas pour ne pas pousser le reste */}
      <div style={{ ...card, marginTop: 12 }}>
        <p style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Inscriptions</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
          <p style={{ fontSize: 48, fontWeight: 700, color: '#00ff88', lineHeight: 1, margin: 0 }}>{newUsers.length}</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: 0 }}>/ {totalUsers} total</p>
        </div>
        {newUsers.length > 0 && (
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: '0 0 10px' }}>{newUsers.map((u: any) => u.username).join(', ')}</p>
        )}
        {newUsers.length === 0 && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', margin: '0 0 10px' }}>Aucun</p>}
        <Suspense>
          <GrowthPicker gfrom={gfrom} gto={gto} firstDate={firstDate} />
        </Suspense>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {growthDays.map(({ date, count }) => {
            const barWidth = Math.round((count / maxGrowth) * 100)
            const label = new Date(`${date}T12:00:00`).toLocaleDateString('fr-CA', { month: 'short', day: 'numeric' })
            return (
              <div key={date} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', width: 40, textAlign: 'right', flexShrink: 0 }}>{label}</span>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 2, height: 12, overflow: 'hidden' }}>
                  <div style={{ width: `${barWidth}%`, height: '100%', background: count > 0 ? '#00ff88' : 'transparent', borderRadius: 2, minWidth: count > 0 ? 3 : 0 }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: count > 0 ? '#00ff88' : 'rgba(255,255,255,0.2)', width: 20, flexShrink: 0 }}>{count}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
