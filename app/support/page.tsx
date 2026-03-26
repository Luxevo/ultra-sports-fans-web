"use client"

import { useState } from "react"


const content = {
  fr: {
    title: "Centre d'aide",
    contact: "Contacter le support",
    contactEmail: "contact@ultrasportsfans.com",
    contactDesc: "On répond sous 24–48h.",
    sections: [
      {
        id: "compte",
        title: "Compte & Connexion",
        items: [
          { q: "Comment créer un compte ?", a: "Télécharge l'app Ultra Sports Fans, appuie sur \"S'inscrire\" et suis les 3 étapes : infos de connexion, choix de ton pseudo et avatar, puis acceptation des conditions." },
          { q: "Puis-je utiliser l'app sans compte ?", a: "Oui. Tu peux consulter les matchs et les équipes en mode visiteur. Pour le chat et les favoris, un compte est requis." },
          { q: "Comment réinitialiser mon mot de passe ?", a: "Sur la page de connexion, appuie sur \"Mot de passe oublié\". Tu recevras un lien par email. Assure-toi que l'app est installée avant de cliquer." },
          { q: "Comment supprimer mon compte ?", a: "Va dans ton Profil → Supprimer le compte. Cette action est irréversible et supprime toutes tes données." },
          { q: "Mon compte a été suspendu. Pourquoi ?", a: "Les comptes sont suspendus suite à une violation des conditions (contenu inapproprié, harcèlement, spam). Pour contester : contact@ultrasportsfans.com." },
        ]
      },
      {
        id: "profil",
        title: "Profil & Paramètres",
        items: [
          { q: "Comment changer mon pseudo ?", a: "Va dans l'onglet Profil et appuie sur ton nom d'utilisateur. Les pseudos doivent avoir entre 3 et 20 caractères." },
          { q: "Comment changer mon avatar ?", a: "Dans ton Profil, appuie sur ton avatar actuel pour en choisir un nouveau parmi les options disponibles." },
          { q: "Comment changer la langue ?", a: "Dans ton Profil, bascule entre Français et Anglais. Dans le chat, un toggle FR/ALL filtre les messages." },
          { q: "Comment me désabonner de la newsletter ?", a: "Va dans ton Profil et désactive l'option Newsletter, ou utilise le lien de désabonnement dans les emails reçus." },
        ]
      },
      {
        id: "matchs",
        title: "Matchs & Favoris",
        items: [
          { q: "Quelles ligues sont disponibles ?", a: "Ultra Sports Fans supporte la NHL (hockey), la NBA (basketball) et la NFL (football américain)." },
          { q: "Comment voir les matchs d'une autre date ?", a: "Sur l'écran principal, utilise le calendrier en haut pour naviguer entre les dates." },
          { q: "Comment ajouter un match en favori ?", a: "Appuie sur l'icône ⭐ sur une carte de match. Tu dois être connecté. Retrouve tes favoris dans l'onglet Favoris." },
          { q: "Pourquoi certains matchs n'ont pas de score ?", a: "Les matchs affichent \"À venir\" avant le début. Les scores apparaissent en temps réel une fois la partie commencée." },
        ]
      },
      {
        id: "chat",
        title: "Chat en direct",
        items: [
          { q: "Comment participer au chat ?", a: "Ouvre un match, appuie sur l'onglet Chat. Tu dois être connecté pour envoyer des messages." },
          { q: "Pourquoi mon message a été bloqué ?", a: "Nos filtres automatiques bloquent les contenus inappropriés : violence, propos haineux, spam et liens externes. Reformule ton message." },
          { q: "Comment signaler un message ?", a: "Maintiens ton doigt sur un message, puis sélectionne \"Signaler\". Notre équipe examine les signalements sous 24h." },
          { q: "Comment bloquer un utilisateur ?", a: "Maintiens ton doigt sur un message de cet utilisateur et sélectionne \"Bloquer\". Ses messages ne seront plus visibles." },
          { q: "Comment réagir à un message ?", a: "Maintiens ton doigt sur un message pour faire apparaître les réactions emoji (👍 👎 🔥 💀)." },
        ]
      },
      {
        id: "equipes",
        title: "Équipes & Statistiques",
        items: [
          { q: "Où voir le roster d'une équipe ?", a: "Va dans l'onglet Équipes, sélectionne une ligue, puis une équipe. L'onglet Joueurs affiche le roster complet." },
          { q: "Les statistiques sont-elles en temps réel ?", a: "Les stats d'équipe et de joueurs sont mises à jour régulièrement via notre partenaire de données sportives." },
          { q: "Où voir les blessures d'une équipe ?", a: "Dans la fiche d'une équipe, l'onglet Blessures liste les joueurs indisponibles avec leur statut (IR, Day-to-Day, etc.)." },
        ]
      },
      {
        id: "legal",
        title: "Légal",
        items: [
          { q: "Ultra Sports Fans est-il un site de paris ?", a: "Non. Ultra Sports Fans est une application de divertissement sportif communautaire. Aucune mise d'argent n'est possible sur notre plateforme." },
          { q: "Quel est l'âge minimum ?", a: "Tu dois avoir 18 ans ou plus pour créer un compte et utiliser toutes les fonctionnalités." },
          { q: "Comment mes données sont-elles protégées ?", a: "Tes données sont hébergées de manière sécurisée. Nous ne revendons pas tes informations personnelles. Consulte notre politique de confidentialité." },
        ]
      },
    ]
  },
  en: {
    title: "Help Center",
    contact: "Contact Support",
    contactEmail: "contact@ultrasportsfans.com",
    contactDesc: "We respond within 24–48 hours.",
    sections: [
      {
        id: "account",
        title: "Account & Login",
        items: [
          { q: "How do I create an account?", a: "Download the Ultra Sports Fans app, tap \"Sign Up\" and follow the 3 steps: login info, choose your username and avatar, then accept the terms." },
          { q: "Can I use the app without an account?", a: "Yes. You can browse matches and teams as a visitor. Chat and favorites require an account." },
          { q: "How do I reset my password?", a: "On the login screen, tap \"Forgot Password\". You'll receive a link by email. Make sure the app is installed before clicking." },
          { q: "How do I delete my account?", a: "Go to your Profile → Delete Account. This action is irreversible and removes all your data." },
          { q: "My account was suspended. Why?", a: "Accounts are suspended for violating our terms (inappropriate content, harassment, spam). To appeal: contact@ultrasportsfans.com." },
        ]
      },
      {
        id: "profile",
        title: "Profile & Settings",
        items: [
          { q: "How do I change my username?", a: "Go to the Profile tab and tap your username to edit it. Usernames must be between 3 and 20 characters." },
          { q: "How do I change my avatar?", a: "In your Profile, tap your current avatar to choose a new one from the available options." },
          { q: "How do I change the language?", a: "In your Profile, switch between French and English. In chat, a FR/ALL toggle filters messages." },
          { q: "How do I unsubscribe from the newsletter?", a: "Go to your Profile and disable the Newsletter option, or use the unsubscribe link in any email." },
        ]
      },
      {
        id: "matches",
        title: "Matches & Favorites",
        items: [
          { q: "Which leagues are available?", a: "Ultra Sports Fans supports the NHL (hockey), NBA (basketball), and NFL (American football)." },
          { q: "How do I view matches on a different date?", a: "On the main screen, use the calendar at the top to navigate between dates." },
          { q: "How do I add a match to favorites?", a: "Tap the ⭐ icon on a match card. You must be logged in. Find your favorites in the Favorites tab." },
          { q: "Why don't some matches have a score?", a: "Matches show \"Upcoming\" before they start. Scores appear in real-time once the game begins." },
        ]
      },
      {
        id: "chat",
        title: "Live Chat",
        items: [
          { q: "How do I join the chat?", a: "Open a match and tap the Chat tab. You must be logged in to send messages." },
          { q: "Why was my message blocked?", a: "Our filters block inappropriate content: violence, hate speech, spam, and external links. Please rephrase your message." },
          { q: "How do I report a message?", a: "Long-press on a message and select \"Report\". Our team reviews reports within 24 hours." },
          { q: "How do I block a user?", a: "Long-press on a message from that user and select \"Block\". Their messages will no longer be visible." },
          { q: "How do I react to a message?", a: "Long-press on a message to bring up emoji reactions (👍 👎 🔥 💀)." },
        ]
      },
      {
        id: "teams",
        title: "Teams & Statistics",
        items: [
          { q: "Where can I see a team's roster?", a: "Go to the Teams tab, select a league, then a team. The Players tab shows the full roster with stats." },
          { q: "Are the statistics real-time?", a: "Team and player stats are updated regularly through our sports data partner." },
          { q: "Where can I see a team's injuries?", a: "In a team's profile, the Injuries tab lists unavailable players with their status (IR, Day-to-Day, etc.)." },
        ]
      },
      {
        id: "legal",
        title: "Legal",
        items: [
          { q: "Is Ultra Sports Fans a betting site?", a: "No. Ultra Sports Fans is a community sports entertainment app. No money can be wagered on our platform." },
          { q: "What is the minimum age?", a: "You must be 18 years or older to create an account and use all features." },
          { q: "How is my data protected?", a: "Your data is securely hosted. We do not sell your personal information. See our privacy policy for details." },
        ]
      },
    ]
  }
}

export default function SupportPage() {
  const [lang, setLang] = useState<"fr" | "en">("fr")
  const [openItem, setOpenItem] = useState<string | null>(null)
  const t = content[lang]

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

      <div className="pt-14 pb-14 px-6 text-center">
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700 }}>
          {t.title}
        </h1>
      </div>

      {/* FAQ */}
      <main style={{ maxWidth: 720, margin: '0 auto', width: '100%', padding: '64px 24px', display: 'flex', flexDirection: 'column', gap: 48 }}>
        {t.sections.map((section) => (
          <div key={section.id}>
            <h2 className="font-bold mb-4" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              {section.title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {section.items.map((item, i) => {
                const id = `${section.id}-${i}`
                const isOpen = openItem === id
                return (
                  <div
                    key={id}
                    className="rounded-xl overflow-hidden transition-all"
                    style={{ background: isOpen ? 'rgba(0,200,255,0.04)' : 'var(--card)', border: `1px solid ${isOpen ? 'rgba(0,200,255,0.2)' : 'var(--border)'}` }}
                  >
                    <button
                      onClick={() => setOpenItem(isOpen ? null : id)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', textAlign: 'left', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                    >
                      <span className="font-medium pr-4" style={{ fontSize: '0.9rem' }}>{item.q}</span>
                      <span
                        className="flex-shrink-0 transition-transform"
                        style={{
                          color: 'var(--accent)',
                          fontSize: '1.2rem',
                          fontWeight: 300,
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                        }}
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 28px 20px' }}>
                        <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Contact block */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: 'rgba(0,200,255,0.05)', border: '1px solid rgba(0,200,255,0.2)' }}
        >
          <p className="font-bold mb-1" style={{ fontSize: '1.05rem' }}>{t.contact}</p>
          <p className="mb-4" style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{t.contactDesc}</p>
          <a
            href={`mailto:${t.contactEmail}`}
            className="font-semibold hover:underline"
            style={{ color: 'var(--accent)', fontSize: '0.9rem' }}
          >
            {t.contactEmail}
          </a>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem' }}>© 2025 Ultra Sports Fans — Prediction Expert Inc.</p>
      </footer>
    </div>
  )
}
