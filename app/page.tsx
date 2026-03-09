"use client"

import { useState } from "react"
import { Navbar } from "./components/Navbar"

export default function Home() {
  const [lang, setLang] = useState<"fr" | "en">("fr")

  const t = {
    fr: {
      tagline: "Le chat des vrais fans.",
      sub: "Suis tes matchs NHL, NBA et NFL en temps réel. Réagis, discute et vis le sport autrement.",
      cta_ios: "Disponible sur App Store",
      cta_android: "Disponible sur Google Play",
      cta_soon: "Bientôt disponible",
      features_title: "Tout ce dont un fan a besoin",
      features: [
        {
          icon: "🏒",
          title: "NHL • NBA • NFL",
          desc: "Suis toutes les ligues majeures. Scores en temps réel, stats d'équipes et rosters complets."
        },
        {
          icon: "💬",
          title: "Chat en direct",
          desc: "Discute avec les autres fans pendant le match. Réagis avec des emojis, envoie tes opinions."
        },
        {
          icon: "⭐",
          title: "Tes matchs favoris",
          desc: "Sauvegarde les matchs qui t'intéressent et retrouve-les en un clic dans ton onglet Favoris."
        },
        {
          icon: "📊",
          title: "Stats & Blessures",
          desc: "Consulte les stats de saison, le roster complet et la liste des blessés pour chaque équipe."
        },
        {
          icon: "🛡️",
          title: "Communauté saine",
          desc: "Filtre anti-contenu, signalement de messages et blocage d'utilisateurs pour un chat respectueux."
        },
        {
          icon: "🌍",
          title: "FR • EN",
          desc: "L'app est entièrement disponible en français et en anglais. Change la langue à tout moment."
        },
      ],
      leagues_title: "Les ligues supportées",
      how_title: "Comment ça marche ?",
      steps: [
        { num: "01", title: "Crée ton compte", desc: "Inscription en 3 étapes rapides. Choisis ton pseudo et ton avatar." },
        { num: "02", title: "Choisis un match", desc: "Filtre par ligue et par date pour trouver le match qui t'intéresse." },
        { num: "03", title: "Rejoins le chat", desc: "Discute en temps réel avec les autres fans pendant la partie." },
      ],
      footer_support: "Assistance",
      footer_copy: "© 2025 Ultra Sports Fans — Prediction Expert Inc.",
      not_betting: "⚠️ Ultra Sports Fans n'est pas un site de paris. Plateforme de divertissement sportif uniquement.",
    },
    en: {
      tagline: "The chat for real fans.",
      sub: "Follow your NHL, NBA and NFL games in real time. React, chat and experience sports differently.",
      cta_ios: "Available on App Store",
      cta_android: "Available on Google Play",
      cta_soon: "Coming soon",
      features_title: "Everything a fan needs",
      features: [
        {
          icon: "🏒",
          title: "NHL • NBA • NFL",
          desc: "Follow all major leagues. Real-time scores, team stats and full rosters."
        },
        {
          icon: "💬",
          title: "Live Chat",
          desc: "Talk with other fans during the game. React with emojis, share your takes."
        },
        {
          icon: "⭐",
          title: "Your favorite games",
          desc: "Save the matches you care about and find them in one tap in your Favorites tab."
        },
        {
          icon: "📊",
          title: "Stats & Injuries",
          desc: "Browse season stats, full rosters and injury reports for every team."
        },
        {
          icon: "🛡️",
          title: "Healthy community",
          desc: "Content filter, message reporting and user blocking for a respectful chat."
        },
        {
          icon: "🌍",
          title: "FR • EN",
          desc: "The app is fully available in French and English. Switch languages anytime."
        },
      ],
      leagues_title: "Supported leagues",
      how_title: "How it works",
      steps: [
        { num: "01", title: "Create your account", desc: "Sign up in 3 quick steps. Pick your username and avatar." },
        { num: "02", title: "Pick a game", desc: "Filter by league and date to find the match you want." },
        { num: "03", title: "Join the chat", desc: "Talk in real time with other fans during the game." },
      ],
      footer_support: "Assistance",
      footer_copy: "© 2025 Ultra Sports Fans — Prediction Expert Inc.",
      not_betting: "⚠️ Ultra Sports Fans is not a betting site. Sports entertainment platform only.",
    }
  }[lang]

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans">

      <Navbar lang={lang} onLangChange={setLang} activePage="home" />

      {/* HERO */}
      <section className="pt-32 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#39ff1415_0%,_transparent_60%)] pointer-events-none" />
        <div className="mx-auto max-w-3xl relative">
          <div className="inline-flex items-center gap-2 bg-[#39ff14]/10 border border-[#39ff14]/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse" />
            <span className="text-xs text-[#39ff14] font-semibold">NHL • NBA • NFL</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            {t.tagline}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            {t.sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="flex items-center justify-center gap-3 bg-white text-black font-semibold px-6 py-3.5 rounded-2xl hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              {t.cta_ios}
            </button>
            <button className="flex items-center justify-center gap-3 bg-[#1a1a1a] border border-white/10 text-white font-semibold px-6 py-3.5 rounded-2xl hover:bg-[#222] transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.22 0a1.1 1.1 0 0 0-.54.14L12 11.37 22.32.14A1.1 1.1 0 0 0 21.78 0H1.22zM0 1.02v21.96l10.73-10.73L0 1.02zm24 0L13.27 12.25 24 22.98V1.02zM1.22 24h20.56a1.1 1.1 0 0 0 .54-.14L12 13.63 1.68 23.86a1.1 1.1 0 0 0 .54.14z"/>
              </svg>
              {t.cta_android}
            </button>
          </div>
        </div>
      </section>

      {/* LEAGUES */}
      <section className="py-12 border-y border-white/10 bg-[#0a0a0a]">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-8">{t.leagues_title}</p>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            {["NHL", "NBA", "NFL"].map((league) => (
              <span key={league} className="text-3xl font-black text-white/20 hover:text-[#39ff14] transition-colors cursor-default">
                {league}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16">{t.features_title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.features.map((f, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-[#111111] p-6 hover:border-[#39ff14]/30 transition-colors">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-[#0a0a0a] border-y border-white/10">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16">{t.how_title}</h2>
          <div className="space-y-8">
            {t.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-6">
                <span className="text-4xl font-black text-[#39ff14]/30 w-16 flex-shrink-0">{step.num}</span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#39ff1410_0%,_transparent_60%)] pointer-events-none" />
        <div className="mx-auto max-w-xl relative">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ultra <span className="text-[#39ff14]">Sports Fans</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="flex items-center justify-center gap-3 bg-white text-black font-semibold px-6 py-3.5 rounded-2xl hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              {t.cta_ios}
            </button>
            <button className="flex items-center justify-center gap-3 bg-[#1a1a1a] border border-white/10 text-white font-semibold px-6 py-3.5 rounded-2xl hover:bg-[#222] transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.22 0a1.1 1.1 0 0 0-.54.14L12 11.37 22.32.14A1.1 1.1 0 0 0 21.78 0H1.22zM0 1.02v21.96l10.73-10.73L0 1.02zm24 0L13.27 12.25 24 22.98V1.02zM1.22 24h20.56a1.1 1.1 0 0 0 .54-.14L12 13.63 1.68 23.86a1.1 1.1 0 0 0 .54.14z"/>
              </svg>
              {t.cta_android}
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">{t.footer_copy}</p>
          <div className="flex items-center gap-6">
            <a href="/support" className="text-xs text-gray-500 hover:text-white transition-colors">{t.footer_support}</a>
            <a href="mailto:contact@ultrasportsfans.com" className="text-xs text-gray-500 hover:text-white transition-colors">contact@ultrasportsfans.com</a>
          </div>
        </div>
        <div className="mx-auto max-w-5xl mt-4 pt-4 border-t border-white/5">
          <p className="text-xs text-gray-600 text-center">{t.not_betting}</p>
        </div>
      </footer>
    </div>
  )
}
