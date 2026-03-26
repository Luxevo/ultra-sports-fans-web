"use client"

import { useState } from "react"


const privacy = {
  fr: {
    title: "Politique de confidentialité",
    updated: "En vigueur depuis le 2026-02-11",
    operator: "Prediction Expert Inc.",
    sections: [
      { title: "1. Introduction", content: "La présente Politique explique comment Prediction Expert Inc. collecte, utilise et partage les informations via Ultra Sports Fans Live.\nEn utilisant le Service, vous consentez à la présente Politique." },
      { title: "2. Informations collectées", content: "A. Informations fournies\n- Courriel, nom d'utilisateur, détails du compte\n- Date de naissance (vérification de l'âge)\n- Sélection de région ou juridiction\n- Messages de chat et contenu communautaire\n\nB. Données automatiques\n- Identifiants d'appareil\n- Adresse IP\n- Analyses d'utilisation\n- Rapports de plantage et diagnostics\n- Localisation approximative (niveau régional)\n\nC. Données publicitaires\n- Engagement publicitaire\n- Activité de liens affiliés\n- Signaux de ciblage régional" },
      { title: "3. Utilisation des informations", content: "Nous utilisons les informations pour :\n- Exploiter et améliorer le Service\n- Vérifier la conformité à l'âge légal\n- Fournir du contenu régional personnalisé\n- Modérer les chats et prévenir les abus\n- Diffuser de la publicité et des promotions ciblées\n- Protéger contre la fraude" },
      { title: "4. Publicité et tiers", content: "Le Service peut afficher des publicités ciblées via des fournisseurs tiers.\nCes tiers peuvent collecter des données selon leurs propres politiques." },
      { title: "5. Partage des informations", content: "Nous pouvons partager des informations avec :\n- Les fournisseurs de services soutenant l'Application\n- Les partenaires publicitaires et analytiques\n- Les partenaires affiliés\n- Les autorités si la loi l'exige\n\nNous ne vendons pas sciemment des informations personnelles." },
      { title: "6. Conservation des données", content: "Nous conservons les données aussi longtemps que nécessaire pour exploiter le Service et respecter nos obligations légales." },
      { title: "7. Sécurité", content: "Nous utilisons des mesures de protection raisonnables, mais aucun système n'est totalement sécurisé." },
      { title: "8. Vos droits", content: "Selon votre région, vous pouvez demander l'accès, la correction ou la suppression de vos données :\ncontact@ultrasportsfans.com" },
      { title: "9. Confidentialité des mineurs", content: "Le Service n'est pas destiné aux personnes n'ayant pas atteint l'âge légal requis dans leur juridiction." },
      { title: "10. Mises à jour", content: "Nous pouvons mettre à jour cette Politique à tout moment. L'utilisation continue signifie l'acceptation." },
    ]
  },
  en: {
    title: "Privacy Policy",
    updated: "Effective Date: 2026-02-11",
    operator: "Prediction Expert Inc.",
    sections: [
      { title: "1. Introduction", content: "This Privacy Policy explains how Prediction Expert Inc. collects, uses, and shares information through Ultra Sports Fans Live.\nBy using the Service, you consent to this Policy." },
      { title: "2. Information We Collect", content: "A. Information You Provide\n- Email, username, account details\n- Date of birth (age verification)\n- Region or jurisdiction selection\n- Chat messages and community content\n\nB. Automatically Collected Data\n- Device identifiers\n- IP address\n- App usage analytics\n- Crash reports and diagnostics\n- Approximate location (region-level)\n\nC. Advertising and Promotion Data\n- Ad engagement and interactions\n- Affiliate link activity\n- Region-based targeting signals" },
      { title: "3. How We Use Information", content: "We use information to:\n- Operate and improve the Service\n- Verify legal age compliance\n- Provide personalized regional content\n- Moderate chats and prevent abuse\n- Deliver targeted advertising and promotions\n- Protect against fraud" },
      { title: "4. Advertising and Third Parties", content: "The Service may display targeted ads through third-party providers.\nThird parties may collect data under their own privacy policies." },
      { title: "5. Sharing of Information", content: "We may share information with:\n- Service providers supporting the App\n- Advertising and analytics partners\n- Affiliate partners\n- Authorities if legally required\n\nWe do not knowingly sell personal information." },
      { title: "6. Data Retention", content: "We retain data only as long as necessary to operate the Service and comply with legal obligations." },
      { title: "7. Security", content: "We use reasonable safeguards, but no system is completely secure." },
      { title: "8. Your Rights", content: "Depending on your region, you may request access, correction, or deletion of your data:\ncontact@ultrasportsfans.com" },
      { title: "9. Children's Privacy", content: "The Service is not intended for individuals below the legal age requirement in their jurisdiction." },
      { title: "10. Updates", content: "We may update this Privacy Policy at any time. Continued use means acceptance." },
    ]
  }
}

export default function PrivacyPage() {
  const [lang, setLang] = useState<"fr" | "en">("fr")
  const t = privacy[lang]

  return (
    <div className="min-h-screen" style={{ background: '#000', color: '#fff', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>

      {/* Header */}
      <div style={{ padding: '32px 24px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 720, margin: '0 auto', width: '100%' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem' }}>
          ← Accueil
        </a>
        <div style={{ display: 'flex', gap: 4 }}>
          {(["fr", "en"] as const).map((l) => (
            <button key={l} onClick={() => setLang(l)} style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', background: lang === l ? 'rgba(255,255,255,0.12)' : 'transparent', color: lang === l ? '#fff' : 'rgba(255,255,255,0.3)' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-14 pb-14 px-6 text-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700 }}>
          {t.title}
        </h1>
        <p className="mt-3" style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{t.updated} · {t.operator}</p>
      </div>

      <main style={{ maxWidth: 720, margin: '0 auto', width: '100%', padding: '64px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {t.sections.map((section, i) => (
          <div
            key={i}
            style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 32px' }}
          >
            <h2 className="font-bold mb-3" style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              {section.title}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.75, whiteSpace: 'pre-line' }}>
              {section.content}
            </p>
          </div>
        ))}

        <div
          className="rounded-xl p-6 text-center"
          style={{ background: 'rgba(0,200,255,0.04)', border: '1px solid rgba(0,200,255,0.15)' }}
        >
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '8px' }}>
            Contact
          </p>
          <a
            href="mailto:contact@ultrasportsfans.com"
            className="font-semibold hover:underline"
            style={{ color: 'var(--accent)', fontSize: '0.9rem' }}
          >
            contact@ultrasportsfans.com
          </a>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem' }}>© 2025 Ultra Sports Fans — Prediction Expert Inc.</p>
      </footer>
    </div>
  )
}
