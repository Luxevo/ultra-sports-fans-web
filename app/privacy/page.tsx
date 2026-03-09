"use client"

import { useState } from "react"
import { Navbar } from "../components/Navbar"

const privacy = {
  fr: {
    title: "Politique de confidentialité",
    updated: "Date d'entrée en vigueur : 2026-02-11",
    operator: "Exploité par : Prediction Expert Inc.",
    contact: "Contact : contact@ultrasportsfans.com",
    sections: [
      {
        title: "1. Introduction",
        content: "La présente Politique de confidentialité explique comment Prediction Expert Inc. collecte, utilise et partage les informations via Ultra Sports Fans Live.\nEn utilisant le Service, vous consentez à la présente Politique."
      },
      {
        title: "2. Informations que nous collectons",
        content: "A. Informations que vous fournissez\nNous pouvons collecter :\n- Courriel, nom d'utilisateur, détails du compte\n- Date de naissance (vérification de l'âge)\n- Sélection de région ou juridiction\n- Messages de chat et contenu communautaire\n\nB. Données collectées automatiquement\nNous pouvons collecter :\n- Identifiants d'appareil\n- Adresse IP\n- Analyses d'utilisation de l'application\n- Rapports de plantage et diagnostics\n- Localisation approximative (au niveau régional)\n\nC. Données publicitaires et promotionnelles\nNous pouvons collecter :\n- Engagement et interactions publicitaires\n- Activité de liens affiliés\n- Signaux de ciblage régional"
      },
      {
        title: "3. Comment nous utilisons les informations",
        content: "Nous utilisons les informations pour :\n- Exploiter et améliorer le Service\n- Vérifier la conformité à l'âge légal\n- Fournir du contenu régional personnalisé\n- Modérer les chats et prévenir les abus\n- Diffuser de la publicité et des promotions ciblées\n- Analyser les tendances d'engagement et créer des moments forts communautaires\n- Protéger contre la fraude ou les activités illégales"
      },
      {
        title: "4. Publicité et réseaux tiers",
        content: "Le Service peut afficher des publicités ciblées ou des promotions régionales via des fournisseurs publicitaires tiers.\nLes tiers peuvent collecter ou traiter des données selon leurs propres politiques de confidentialité."
      },
      {
        title: "5. Partage des informations",
        content: "Nous pouvons partager des informations avec :\n- Les fournisseurs de services soutenant l'Application\n- Les partenaires publicitaires et analytiques\n- Les partenaires affiliés lorsque des offres sont consultées\n- Les autorités si la loi l'exige\nNous ne vendons pas sciemment des informations personnelles en tant que produit autonome."
      },
      {
        title: "6. Conservation des données",
        content: "Nous conservons les données uniquement aussi longtemps que nécessaire pour exploiter le Service, respecter les obligations légales et appliquer les politiques."
      },
      {
        title: "7. Sécurité des données",
        content: "Nous utilisons des mesures de protection raisonnables, mais aucun système n'est totalement sécurisé."
      },
      {
        title: "8. Vos droits",
        content: "Selon votre région, vous pouvez demander l'accès, la correction ou la suppression de vos données en contactant :\ncontact@ultrasportsfans.com"
      },
      {
        title: "9. Confidentialité des enfants",
        content: "Le Service n'est pas destiné aux personnes n'ayant pas atteint l'âge légal requis dans leur juridiction."
      },
      {
        title: "10. Mises à jour",
        content: "Nous pouvons mettre à jour la présente Politique de confidentialité à tout moment. L'utilisation continue signifie l'acceptation."
      },
    ]
  },
  en: {
    title: "Privacy Policy",
    updated: "Effective Date: 2026-02-11",
    operator: "Operated by: Prediction Expert Inc.",
    contact: "Contact: contact@ultrasportsfans.com",
    sections: [
      {
        title: "1. Introduction",
        content: "This Privacy Policy explains how Prediction Expert Inc. collects, uses, and shares information through Ultra Sports Fans Live.\nBy using the Service, you consent to this Policy."
      },
      {
        title: "2. Information We Collect",
        content: "A. Information You Provide\nWe may collect:\n- Email, username, account details\n- Date of birth (age verification)\n- Region or jurisdiction selection\n- Chat messages and community content\n\nB. Automatically Collected Data\nWe may collect:\n- Device identifiers\n- IP address\n- App usage analytics\n- Crash reports and diagnostics\n- Approximate location (region-level)\n\nC. Advertising and Promotion Data\nWe may collect:\n- Ad engagement and interactions\n- Affiliate link activity\n- Region-based targeting signals"
      },
      {
        title: "3. How We Use Information",
        content: "We use information to:\n- Operate and improve the Service\n- Verify legal age compliance\n- Provide personalized regional content\n- Moderate chats and prevent abuse\n- Deliver targeted advertising and promotions\n- Analyze engagement trends and create community highlights\n- Protect against fraud or unlawful activity"
      },
      {
        title: "4. Advertising and Third-Party Networks",
        content: "The Service may display targeted advertisements or regional promotions through third-party ad providers.\nThird parties may collect or process data under their own privacy policies."
      },
      {
        title: "5. Sharing of Information",
        content: "We may share information with:\n- Service providers supporting the App\n- Advertising and analytics partners\n- Affiliate partners when offers are accessed\n- Authorities if legally required\nWe do not knowingly sell personal information as a standalone product."
      },
      {
        title: "6. Data Retention",
        content: "We retain data only as long as necessary to operate the Service, comply with legal obligations, and enforce policies."
      },
      {
        title: "7. Data Security",
        content: "We use reasonable safeguards, but no system is completely secure."
      },
      {
        title: "8. Your Rights",
        content: "Depending on your region, you may request access, correction, or deletion of your data by contacting:\ncontact@ultrasportsfans.com"
      },
      {
        title: "9. Children's Privacy",
        content: "The Service is not intended for individuals below the legal age requirement in their jurisdiction."
      },
      {
        title: "10. Updates",
        content: "We may update this Privacy Policy at any time. Continued use means acceptance."
      },
    ]
  }
}

export default function PrivacyPage() {
  const [lang, setLang] = useState<"fr" | "en">("fr")
  const t = privacy[lang]

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar lang={lang} onLangChange={setLang} />

      <div className="pt-24 pb-12 px-6 border-b border-white/10 bg-[#111111] text-center">
        <h1 className="text-3xl font-bold text-white mb-3">{t.title}</h1>
        <p className="text-sm text-gray-500">{t.updated}</p>
        <p className="text-sm text-gray-500">{t.operator}</p>
      </div>

      <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
        {t.sections.map((section, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-[#111111] p-6">
            <h2 className="text-base font-bold text-[#39ff14] mb-3">{section.title}</h2>
            <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{section.content}</p>
          </div>
        ))}

        <div className="rounded-xl border border-white/10 bg-[#111111] p-6 text-center">
          <p className="text-sm text-gray-400">{t.contact}</p>
          <a href="mailto:contact@ultrasportsfans.com" className="text-[#39ff14] text-sm hover:underline">
            contact@ultrasportsfans.com
          </a>
        </div>
      </main>

      <footer className="border-t border-white/10 py-6 text-center">
        <p className="text-xs text-gray-600">© 2025 Ultra Sports Fans — Prediction Expert Inc.</p>
      </footer>
    </div>
  )
}
