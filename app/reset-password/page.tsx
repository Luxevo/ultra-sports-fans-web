'use client'

import { useEffect } from 'react'

export default function ResetPassword() {
  useEffect(() => {
    const hash = window.location.hash
    window.location.href = 'mordusportmobile://reset-password' + hash
    setTimeout(() => {
      window.location.href = 'exp://localhost:8081/--/reset-password' + hash
    }, 1500)
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#0d0d0d',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
    }}>
      <p style={{ color: '#888888', fontSize: '14px' }}>Redirecting to app...</p>
    </div>
  )
}
