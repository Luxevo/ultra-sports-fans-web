"use client"

import { useState } from "react"

const LOGO_URL = "/logoUSF.svg"
const AVATAR_BASE = "https://wrajekuuhbuneoualiix.supabase.co/storage/v1/object/public/usfAvatar"

const AVATARS = [
  { file: "rose.png",   ring: "#FF3FA4" },
  { file: "orange.png", ring: "#FF7A00" },
  { file: "vert.png",   ring: "#39FF14" },
  { file: "bleu.png",   ring: "#00C8FF" },
  { file: "rouge.png",  ring: "#FF3A3A" },
]

const AppleIcon = () => (
  <img src="/apple-icon.png" alt="Apple" width={28} height={28} style={{ objectFit: 'contain' }} />
)

const GooglePlayIcon = () => (
  <img src="/google-play-icon.png" alt="Google Play" width={28} height={28} style={{ objectFit: 'contain' }} />
)

const translations = {
  fr: {
    headline: ["Tous les fans,", "un seul endroit."],
    sub1: "Rejoins des milliers de fans partout",
    sub2: " dans le monde.",
    dl_label: "Télécharger dans",
    ios: "l'App Store",
    android: "Google Play",
    strip: [
      { plain: "Chat en direct. Chaque sport.", accent: "Chaque match." },
      { plain: "Personnalise ton profil.", accent: "Représente ton équipe." },
      { plain: "Change de langue.", accent: "Chatte à ta façon." },
    ],
    footer: {
      copy: "© 2026 Ultra Sports Fans",
      support: "Assistance",
      privacy: "Confidentialité",
      not_betting: "Ultra Sports Fans n'est pas un site de paris.",
    }
  },
  en: {
    headline: ["Bringing sports fans", "together."],
    sub1: "Join thousands of fans all",
    sub2: " around the world.",
    dl_label: "Download on",
    ios: "App Store",
    android: "Google Play",
    strip: [
      { plain: "Real live chat. Every sport.", accent: "Every game." },
      { plain: "Customize your profile.", accent: "Rep your team." },
      { plain: "Switch languages.", accent: "Chat your way." },
    ],
    footer: {
      copy: "© 2026 Ultra Sports Fans",
      support: "Support",
      privacy: "Privacy",
      not_betting: "Ultra Sports Fans is not a betting site.",
    }
  }
}

export default function Home() {
  const [lang, setLang] = useState<"fr" | "en">("fr")
  const t = translations[lang]

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @media (max-width: 600px) {
          .usf-logo { width: 200px !important; }
          .usf-avatar { width: 52px !important; height: 52px !important; }
          .usf-avatars { gap: 12px !important; }
          .usf-avatars .animate-float { animation: none !important; }
          .usf-strip { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
          .usf-strip p { white-space: normal !important; font-size: 0.8rem !important; }
          .usf-footer-links { flex-direction: column !important; align-items: flex-start !important; }
          .usf-footer-links > div { flex-wrap: wrap !important; gap: 12px !important; }
        }
      `}</style>

      {/* Lang toggle — top right */}
      <div style={{ position: 'fixed', top: 20, right: 24, zIndex: 50, display: 'flex', gap: 4 }}>
        {(["fr", "en"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '5px 10px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              background: lang === l ? 'rgba(255,255,255,0.12)' : 'transparent',
              color: lang === l ? '#fff' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.2s',
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {/* ── HERO ─────────────────────────────────────────── */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px 60px',
      }}>

        {/* Logo */}
        <div className="animate-fade-in-up-1" style={{ marginBottom: 56 }}>
          <img
            src={LOGO_URL}
            alt="Ultra Sports Fans"
            className="usf-logo"
            style={{ height: 'auto', width: 320, objectFit: 'contain' }}
          />
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up-2" style={{
          fontFamily: 'var(--font-poppins), Poppins, sans-serif',
          fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          marginBottom: 60,
        }}>
          {t.headline[0]}{" "}
          <span style={{ color: '#00C8FF' }}>{t.headline[1]}</span>
        </h1>

        {/* Avatars */}
        <div className="animate-fade-in-up-3 usf-avatars" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          marginBottom: 36,
        }}>
          {AVATARS.map((av, i) => (
            <div
              key={av.file}
              className="animate-float"
              style={{ animationDelay: `${i * 0.25}s` }}
            >
              <div className="usf-avatar" style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                overflow: 'hidden',
              }}>
                <img
                  src={`${AVATAR_BASE}/${av.file}`}
                  alt={`Fan ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Sub text */}
        <p className="animate-fade-in-up-3" style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          marginBottom: 40,
          color: '#fff',
        }}>
          {t.sub1}<span style={{ color: '#00C8FF' }}>{t.sub2}</span>
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up-4" style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {/* iOS */}
          <a href="https://apps.apple.com/ca/app/ultra-sports-fans/id6754298738" target="_blank" rel="noopener noreferrer" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '18px 36px',
            borderRadius: 16,
            border: '1.5px solid rgba(255,255,255,0.5)',
            background: 'transparent',
            color: '#fff',
            textDecoration: 'none',
            transition: 'all 0.2s',
            minWidth: 230,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <AppleIcon />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.7, lineHeight: 1.2, fontWeight: 500 }}>{t.dl_label}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.2 }}>{t.ios}</div>
            </div>
          </a>

          {/* Android */}
          <a href="https://play.google.com/store/apps/details?id=com.ultrasportsfans.app" target="_blank" rel="noopener noreferrer" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '18px 36px',
            borderRadius: 16,
            border: '1.5px solid rgba(255,255,255,0.5)',
            background: 'transparent',
            color: '#fff',
            textDecoration: 'none',
            transition: 'all 0.2s',
            minWidth: 230,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <GooglePlayIcon />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.7, lineHeight: 1.2, fontWeight: 500 }}>{t.dl_label}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.2 }}>{t.android}</div>
            </div>
          </a>
        </div>
      </main>

      {/* ── BOTTOM STRIP ─────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '28px 40px',
      }}>
        {/* Feature strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: 16,
          maxWidth: 1000,
          margin: '0 auto 24px',
        }}
        className="usf-strip">
          {t.strip.map((item, i) => (
            <p key={i} style={{ fontSize: 'clamp(0.7rem, 1.3vw, 0.85rem)', color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' }}>
              {item.plain}{" "}
              <span style={{ color: '#00C8FF' }}>{item.accent}</span>
            </p>
          ))}
        </div>

        {/* Footer links */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          maxWidth: 900,
          margin: '0 auto',
        }}
        className="usf-footer-links">
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>{t.footer.copy}</p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <a href="/support" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{t.footer.support}</a>
            <a href="/privacy" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{t.footer.privacy}</a>
            <a href="mailto:contact@ultrasportsfans.com" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{lang === "fr" ? "Nous contacter" : "Contact us"}</a>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: '0.65rem', color: 'rgba(255,255,255,0.15)', marginTop: 12, maxWidth: 900, margin: '12px auto 0' }}>
          {t.footer.not_betting}
        </p>
      </footer>
    </div>
  )
}
