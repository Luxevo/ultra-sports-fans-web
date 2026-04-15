'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function DateRangePicker({ from, to }: { from: string; to: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [fromVal, setFromVal] = useState(from)
  const [toVal, setToVal] = useState(to)

  useEffect(() => {
    setFromVal(from)
    setToVal(to)
  }, [from, to])

  const apply = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('from', fromVal)
    params.set('to', toVal)
    router.push(`?${params.toString()}`)
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 6,
    padding: '4px 8px',
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 12,
    outline: 'none',
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
      <input type="date" value={fromVal} onChange={e => setFromVal(e.target.value)} style={inputStyle} />
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>→</span>
      <input type="date" value={toVal} onChange={e => setToVal(e.target.value)} style={inputStyle} />
      <button
        onClick={apply}
        style={{
          background: '#00C8FF',
          border: 'none',
          borderRadius: 6,
          padding: '4px 12px',
          color: '#000',
          fontFamily: 'monospace',
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        OK
      </button>
      <button
        onClick={() => {
          const today = new Date().toISOString().slice(0, 10)
          setFromVal(today)
          setToVal(today)
          router.push('?')
        }}
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 6,
          padding: '4px 12px',
          color: 'rgba(255,255,255,0.6)',
          fontFamily: 'monospace',
          fontSize: 12,
          cursor: 'pointer',
        }}
      >
        Aujourd'hui
      </button>
    </div>
  )
}
