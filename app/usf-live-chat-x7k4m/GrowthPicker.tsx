'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function GrowthPicker({ gfrom, gto, firstDate }: { gfrom: string; gto: string; firstDate: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [fromVal, setFromVal] = useState(gfrom)
  const [toVal, setToVal] = useState(gto)

  useEffect(() => { setFromVal(gfrom); setToVal(gto) }, [gfrom, gto])

  const apply = (f: string, t: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('gfrom', f)
    params.set('gto', t)
    router.push(`?${params.toString()}`)
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 6,
    padding: '3px 6px',
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 11,
    outline: 'none',
  }

  const btnStyle = (active?: boolean) => ({
    background: active ? 'rgba(0,255,136,0.15)' : 'rgba(255,255,255,0.06)',
    border: `1px solid ${active ? 'rgba(0,255,136,0.3)' : 'rgba(255,255,255,0.12)'}`,
    borderRadius: 6,
    padding: '3px 10px',
    color: active ? '#00ff88' : 'rgba(255,255,255,0.5)',
    fontFamily: 'monospace',
    fontSize: 11,
    cursor: 'pointer',
  })

  const today = new Date().toISOString().slice(0, 10)
  const last7 = new Date(Date.now() - 6 * 86400000).toISOString().slice(0, 10)
  const last30 = new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10)

  const is7 = gfrom === last7 && gto === today
  const is30 = gfrom === last30 && gto === today
  const isAll = gfrom === firstDate && gto === today

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
      <button onClick={() => apply(last7, today)} style={btnStyle(is7)}>7j</button>
      <button onClick={() => apply(last30, today)} style={btnStyle(is30)}>30j</button>
      <button onClick={() => apply(firstDate, today)} style={btnStyle(isAll)}>Tout</button>
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>|</span>
      <input type="date" value={fromVal} onChange={e => setFromVal(e.target.value)} style={inputStyle} />
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>→</span>
      <input type="date" value={toVal} onChange={e => setToVal(e.target.value)} style={inputStyle} />
      <button onClick={() => apply(fromVal, toVal)} style={btnStyle()}>OK</button>
    </div>
  )
}
