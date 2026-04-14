'use client'

import { useState } from 'react'

type Message = { id: string; content: string; created_at: string }

export function UserDropdown({
  username,
  count,
  isHeavy,
  messages,
}: {
  username: string
  count: number
  isHeavy: boolean
  messages: Message[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'inherit',
          fontFamily: 'monospace',
        }}
      >
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>
          {open ? '▼' : '▶'} {username}
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: isHeavy ? '#ff6b6b' : 'rgba(255,255,255,0.5)' }}>
          {count} msgs
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap', paddingTop: 2 }}>
                {new Date(m.created_at).toLocaleTimeString('fr-CA', { timeZone: 'America/Toronto', hour: '2-digit', minute: '2-digit' })}
              </span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontStyle: 'italic' }}>"{m.content}"</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
