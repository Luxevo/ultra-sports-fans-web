export const revalidate = 0

async function getStats() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  const headers = { 'apikey': key!, 'Authorization': `Bearer ${key}` }

  const minus30min = new Date(Date.now() - 30 * 60 * 1000).toISOString()
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const [r30min, rToday] = await Promise.all([
    fetch(`${url}/rest/v1/chat_messages?select=user_id,username&created_at=gte.${minus30min}`, { headers, cache: 'no-store' }),
    fetch(`${url}/rest/v1/chat_messages?select=user_id,username&created_at=gte.${startOfDay.toISOString()}`, { headers, cache: 'no-store' }),
  ])

  const [d30min, dToday] = await Promise.all([r30min.json(), rToday.json()])

  const activeUsers = [...new Map((d30min as any[]).map((m: any) => [m.user_id, m.username])).entries()]
  const usersToday = [...new Map((dToday as any[]).map((m: any) => [m.user_id, m.username])).entries()]

  return {
    activeUsers,
    usersToday,
  }
}

export default async function Page() {
  const { activeUsers, usersToday } = await getStats()

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
        </div>
      </div>
    </div>
  )
}
