'use client'

export default function DeleteAccount() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#000', color: '#fff' }}>
      <div className="max-w-lg w-full text-center">

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8"
          style={{ background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.25)' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF3C3C" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
        </div>

        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>
          Delete your account
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '32px' }}>
          To delete your account and all associated data, open the{' '}
          <strong style={{ color: '#fff' }}>Ultra Sports Fans</strong> app, go to{' '}
          <strong style={{ color: '#fff' }}>Profile</strong>, and tap{' '}
          <strong style={{ color: '#fff' }}>"Delete my account."</strong>
          <br /><br />
          This action is permanent and cannot be undone.
        </p>

        <div
          className="rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.7 }}>
            If you cannot access the app, email us and we will process your deletion request manually.
          </p>
        </div>

        <a
          href="mailto:contact@ultrasportsfans.com"
          className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all hover:opacity-80"
          style={{ background: 'rgba(0,200,255,0.1)', border: '1px solid rgba(0,200,255,0.25)', color: 'var(--accent)', fontSize: '0.9rem' }}
        >
          Nous contacter
        </a>
      </div>
    </div>
  )
}
