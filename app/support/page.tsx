"use client"

import { useState } from "react"
import { Navbar } from "../components/Navbar"

const legalTexts = {
  fr: {
    termsTitle: "Conditions d'utilisation",
    privacyTitle: "Politique de confidentialité",
    terms: `CONDITIONS D'UTILISATION
Ultra Sports Fans Live
Date d'entrée en vigueur : 2026-02-11
Exploité par : Prediction Expert Inc.
Contact : contact@ultrasportsfans.com

1. Acceptation des conditions
Les présentes conditions d'utilisation (« Conditions ») régissent votre accès et votre utilisation d'Ultra Sports Fans Live (l'« Application » ou le « Service »).
En créant un compte ou en utilisant le Service, vous acceptez d'être lié par les présentes Conditions.
Si vous n'acceptez pas, vous ne devez pas utiliser le Service.

2. Admissibilité et exigence d'âge légal
Le Service est destiné uniquement aux personnes ayant l'âge légal dans leur juridiction.
En utilisant le Service, vous confirmez que :
- Vous respectez l'exigence d'âge minimum dans votre région, et
- Vous êtes légalement autorisé à accéder à des promotions ou du contenu liés au sport, le cas échéant.
Nous pouvons restreindre ou résilier l'accès si vous ne respectez pas ces exigences.

3. Plateforme communautaire sportive uniquement (pas un opérateur de jeux)
Ultra Sports Fans Live est une plateforme de divertissement sportif et communautaire.
Prediction Expert Inc. n'opère pas en tant que site de paris, opérateur de jeux de hasard ou service de paris.
Le Service peut afficher des promotions tierces, des liens affiliés, du contenu lié aux cotes ou des offres externes.
Les utilisateurs sont seuls responsables de s'assurer du respect des lois applicables dans leur juridiction.

4. Publicité, contenu commandité et liens affiliés
Le Service peut inclure :
- Des publicités
- Du contenu commandité
- Des offres promotionnelles
- Des liens affiliés vers des partenaires tiers
Nous pouvons percevoir des commissions lorsque les utilisateurs interagissent avec des promotions affiliées.
Les services tiers sont régis par leurs propres conditions et politiques, et nous ne sommes pas responsables de leurs actions, produits ou disponibilité.

5. Comptes utilisateurs
Vous pourriez devoir créer un compte pour accéder à certaines fonctionnalités.
Vous acceptez de :
- Fournir des informations exactes
- Maintenir la sécurité de votre compte
- Accepter la responsabilité de toute activité sous votre compte
Nous pouvons suspendre ou résilier les comptes impliqués dans des abus, fraudes ou violations des présentes Conditions.

6. Contenu utilisateur et fonctionnalités communautaires
Le Service permet aux utilisateurs de publier du contenu, incluant des messages de chat, commentaires, réactions, noms d'utilisateur et autres matériaux (« Contenu utilisateur »).
Vous êtes seul responsable du contenu que vous soumettez.
Nous ne garantissons pas que le Contenu utilisateur sera exact, approprié ou légal.

7. Licence d'utilisation du contenu utilisateur (marketing + promotion)
En publiant du Contenu utilisateur, vous accordez à Prediction Expert Inc. une licence mondiale, perpétuelle, libre de redevances et irrévocable pour utiliser, reproduire, modifier, publier, afficher et distribuer ce contenu :
- pour exploiter et améliorer le Service
- pour modérer et appliquer les règles de la communauté
- pour créer des moments forts et des fonctionnalités d'engagement communautaire
- à des fins promotionnelles et marketing, incluant la mise en valeur des tendances, réactions de fans ou activité communautaire publique
Vous comprenez que le contenu du chat peut être visible par d'autres utilisateurs.

8. Règles de la communauté et conduite interdite
Vous acceptez de ne pas :
- Harceler, abuser, menacer ou nuire à autrui
- Publier du contenu illégal, haineux, violent ou sexuellement explicite
- Faire du spam, usurper l'identité d'autrui ou manipuler les discussions
- Utiliser le Service à des fins illégales
Nous nous réservons le droit de supprimer du contenu ou de restreindre l'accès à tout moment.

9. Modération et application
Nous pouvons surveiller, supprimer, restreindre ou effacer du contenu à notre discrétion pour maintenir la sécurité, la conformité et l'intégrité de la plateforme.
Nous ne sommes pas obligés de pré-filtrer le Contenu utilisateur.

10. Disponibilité régionale et ciblage
Certains contenus, fonctionnalités, promotions ou publicités peuvent varier selon votre région, juridiction ou signaux de localisation.
Certaines offres peuvent ne pas être disponibles là où elles sont interdites par la loi.

11. Exclusion de garanties
Le Service est fourni « TEL QUEL » et « SELON LA DISPONIBILITÉ ».
Nous ne faisons aucune garantie concernant :
- La disponibilité ininterrompue
- L'exactitude du contenu
- Les promotions ou services tiers
- L'adéquation à un usage particulier
L'utilisation du Service est à vos propres risques.

12. Limitation de responsabilité
Dans toute la mesure permise par la loi, Prediction Expert Inc. ne sera pas responsable de :
- Dommages indirects ou consécutifs
- Contenu généré par les utilisateurs
- Services tiers ou offres affiliées
- Décisions ou résultats liés aux paris
- Perte de données, profits ou opportunités commerciales

13. Résiliation
Nous pouvons suspendre ou résilier votre accès à tout moment, sans préavis, si vous violez les présentes Conditions ou pour toute raison légitime.

14. Modifications des conditions
Nous pouvons mettre à jour les présentes Conditions à tout moment. L'utilisation continue du Service signifie l'acceptation des Conditions mises à jour.

15. Droit applicable
Les présentes Conditions sont régies par les lois de la Province de Québec, Canada.`,
    privacy: `POLITIQUE DE CONFIDENTIALITÉ
Ultra Sports Fans Live
Date d'entrée en vigueur : 2026-02-11
Exploité par : Prediction Expert Inc.
Contact : contact@ultrasportsfans.com

1. Introduction
La présente Politique de confidentialité explique comment Prediction Expert Inc. collecte, utilise et partage les informations via Ultra Sports Fans Live.
En utilisant le Service, vous consentez à la présente Politique.

2. Informations que nous collectons

A. Informations que vous fournissez
Nous pouvons collecter :
- Courriel, nom d'utilisateur, détails du compte
- Date de naissance (vérification de l'âge)
- Sélection de région ou juridiction
- Messages de chat et contenu communautaire

B. Données collectées automatiquement
Nous pouvons collecter :
- Identifiants d'appareil
- Adresse IP
- Analyses d'utilisation de l'application
- Rapports de plantage et diagnostics
- Localisation approximative (au niveau régional)

C. Données publicitaires et promotionnelles
Nous pouvons collecter :
- Engagement et interactions publicitaires
- Activité de liens affiliés
- Signaux de ciblage régional

3. Comment nous utilisons les informations
Nous utilisons les informations pour :
- Exploiter et améliorer le Service
- Vérifier la conformité à l'âge légal
- Fournir du contenu régional personnalisé
- Modérer les chats et prévenir les abus
- Diffuser de la publicité et des promotions ciblées
- Analyser les tendances d'engagement et créer des moments forts communautaires
- Protéger contre la fraude ou les activités illégales

4. Publicité et réseaux tiers
Le Service peut afficher des publicités ciblées ou des promotions régionales via des fournisseurs publicitaires tiers.
Les tiers peuvent collecter ou traiter des données selon leurs propres politiques de confidentialité.

5. Partage des informations
Nous pouvons partager des informations avec :
- Les fournisseurs de services soutenant l'Application
- Les partenaires publicitaires et analytiques
- Les partenaires affiliés lorsque des offres sont consultées
- Les autorités si la loi l'exige
Nous ne vendons pas sciemment des informations personnelles en tant que produit autonome.

6. Conservation des données
Nous conservons les données uniquement aussi longtemps que nécessaire pour exploiter le Service, respecter les obligations légales et appliquer les politiques.

7. Sécurité des données
Nous utilisons des mesures de protection raisonnables, mais aucun système n'est totalement sécurisé.

8. Vos droits
Selon votre région, vous pouvez demander l'accès, la correction ou la suppression de vos données en contactant :
contact@ultrasportsfans.com

9. Confidentialité des enfants
Le Service n'est pas destiné aux personnes n'ayant pas atteint l'âge légal requis dans leur juridiction.

10. Mises à jour
Nous pouvons mettre à jour la présente Politique de confidentialité à tout moment. L'utilisation continue signifie l'acceptation.`,
  },
  en: {
    termsTitle: "Terms of Use",
    privacyTitle: "Privacy Policy",
    terms: `TERMS OF USE
Ultra Sports Fans Live
Effective Date: 2026-02-11
Operated by: Prediction Expert Inc.
Contact: contact@ultrasportsfans.com

1. Acceptance of Terms
These Terms of Use ("Terms") govern your access to and use of Ultra Sports Fans Live (the "App" or "Service").
By creating an account or using the Service, you agree to be bound by these Terms.
If you do not agree, you must not use the Service.

2. Eligibility and Legal Age Requirement
The Service is intended only for individuals who are of legal age in their jurisdiction.
By using the Service, you confirm that:
- You meet the minimum legal age requirement in your region, and
- You are legally permitted to access sports-related promotions or content where applicable.
We may restrict or terminate access if you do not meet these requirements.

3. Sports Community Platform Only (No Gambling Operator)
Ultra Sports Fans Live is a sports entertainment and community platform.
Prediction Expert Inc. does not operate as a sportsbook, gambling operator, or betting service.
The Service may display third-party promotions, affiliate links, odds-related content, or external offers.
Users are solely responsible for ensuring compliance with applicable laws in their jurisdiction.

4. Advertising, Sponsored Content, and Affiliate Links
The Service may include:
- Advertisements
- Sponsored content
- Promotional offers
- Affiliate links to third-party partners
We may earn commissions when users interact with affiliate promotions.
Third-party services are governed by their own terms and policies, and we are not responsible for their actions, products, or availability.

5. User Accounts
You may be required to create an account to access certain features.
You agree to:
- Provide accurate information
- Maintain the security of your account
- Accept responsibility for all activity under your account
We may suspend or terminate accounts involved in abuse, fraud, or violations of these Terms.

6. User Content and Community Features
The Service allows users to post content, including chat messages, comments, reactions, usernames, and other materials ("User Content").
You are solely responsible for the content you submit.
We do not guarantee that User Content will be accurate, appropriate, or lawful.

7. License to Use User Content (Marketing + Promotion)
By posting User Content, you grant Prediction Expert Inc. a worldwide, perpetual, royalty-free, irrevocable license to use, reproduce, modify, publish, display, and distribute such content:
- to operate and improve the Service
- to moderate and enforce community rules
- to create community highlights and engagement features
- for promotional and marketing purposes, including showcasing trends, fan reactions, or public community activity
You understand that chat content may be visible to other users.

8. Community Rules and Prohibited Conduct
You agree not to:
- Harass, abuse, threaten, or harm others
- Post illegal, hateful, violent, or sexually explicit content
- Spam, impersonate, or manipulate discussions
- Use the Service for unlawful purposes
We reserve the right to remove content or restrict access at any time.

9. Moderation and Enforcement
We may monitor, remove, restrict, or delete content at our discretion to maintain safety, compliance, and platform integrity.
We are not obligated to pre-screen User Content.

10. Regional Availability and Targeting
Certain content, features, promotions, or advertisements may vary based on your region, jurisdiction, or location signals.
Some offers may not be available where prohibited by law.

11. Disclaimer of Warranties
The Service is provided "AS IS" and "AS AVAILABLE."
We make no warranties regarding:
- uninterrupted availability
- accuracy of content
- third-party promotions or services
- fitness for any particular purpose
Use of the Service is at your own risk.

12. Limitation of Liability
To the maximum extent permitted by law, Prediction Expert Inc. shall not be liable for:
- indirect or consequential damages
- user-generated content
- third-party services or affiliate offers
- gambling-related decisions or outcomes
- loss of data, profits, or business opportunities

13. Termination
We may suspend or terminate your access at any time, without notice, if you violate these Terms or for any lawful reason.

14. Changes to Terms
We may update these Terms at any time. Continued use of the Service means acceptance of the updated Terms.

15. Governing Law
These Terms are governed by the laws of the Province of Quebec, Canada.`,
    privacy: `PRIVACY POLICY
Ultra Sports Fans Live
Effective Date: 2026-02-11
Operated by: Prediction Expert Inc.
Contact: contact@ultrasportsfans.com

1. Introduction
This Privacy Policy explains how Prediction Expert Inc. collects, uses, and shares information through Ultra Sports Fans Live.
By using the Service, you consent to this Policy.

2. Information We Collect

A. Information You Provide
We may collect:
- Email, username, account details
- Date of birth (age verification)
- Region or jurisdiction selection
- Chat messages and community content

B. Automatically Collected Data
We may collect:
- Device identifiers
- IP address
- App usage analytics
- Crash reports and diagnostics
- Approximate location (region-level)

C. Advertising and Promotion Data
We may collect:
- Ad engagement and interactions
- Affiliate link activity
- Region-based targeting signals

3. How We Use Information
We use information to:
- Operate and improve the Service
- Verify legal age compliance
- Provide personalized regional content
- Moderate chats and prevent abuse
- Deliver targeted advertising and promotions
- Analyze engagement trends and create community highlights
- Protect against fraud or unlawful activity

4. Advertising and Third-Party Networks
The Service may display targeted advertisements or regional promotions through third-party ad providers.
Third parties may collect or process data under their own privacy policies.

5. Sharing of Information
We may share information with:
- Service providers supporting the App
- Advertising and analytics partners
- Affiliate partners when offers are accessed
- Authorities if legally required
We do not knowingly sell personal information as a standalone product.

6. Data Retention
We retain data only as long as necessary to operate the Service, comply with legal obligations, and enforce policies.

7. Data Security
We use reasonable safeguards, but no system is completely secure.

8. Your Rights
Depending on your region, you may request access, correction, or deletion of your data by contacting:
contact@ultrasportsfans.com

9. Children's Privacy
The Service is not intended for individuals below the legal age requirement in their jurisdiction.

10. Updates
We may update this Privacy Policy at any time. Continued use means acceptance.`,
  },
}

const content = {
  fr: {
    title: "Centre d'aide",
    subtitle: "Ultra Sports Fans",
    contact: "Contacter le support",
    contactEmail: "contact@ultrasportsfans.com",
    sections: [
      {
        id: "compte",
        title: "Compte & Connexion",
        icon: "👤",
        items: [
          {
            q: "Comment créer un compte ?",
            a: "Télécharge l'app Ultra Sports Fans, appuie sur \"S'inscrire\" et suis les 3 étapes : infos de connexion, choix de ton pseudo et avatar, puis acceptation des conditions."
          },
          {
            q: "Puis-je utiliser l'app sans compte ?",
            a: "Oui. Tu peux consulter les matchs et les équipes en mode visiteur. Pour le chat et les favoris, un compte est requis."
          },
          {
            q: "Comment réinitialiser mon mot de passe ?",
            a: "Sur la page de connexion, appuie sur \"Mot de passe oublié\". Tu recevras un lien par email. Assure-toi que l'app est installée avant de cliquer sur le lien."
          },
          {
            q: "Comment supprimer mon compte ?",
            a: "Va dans ton Profil → Supprimer le compte. Cette action est irréversible et supprime toutes tes données."
          },
          {
            q: "Mon compte a été suspendu. Pourquoi ?",
            a: "Les comptes sont suspendus suite à une violation de nos conditions d'utilisation (contenu inapproprié, harcèlement, spam). Pour contester, contacte-nous à contact@ultrasportsfans.com."
          },
        ]
      },
      {
        id: "profil",
        title: "Profil & Paramètres",
        icon: "⚙️",
        items: [
          {
            q: "Comment changer mon pseudo ?",
            a: "Va dans l'onglet Profil et appuie sur ton nom d'utilisateur pour le modifier. Les pseudos doivent avoir entre 3 et 20 caractères."
          },
          {
            q: "Comment changer mon avatar ?",
            a: "Dans ton Profil, appuie sur ton avatar actuel pour en choisir un nouveau parmi les options disponibles."
          },
          {
            q: "Comment changer la langue ?",
            a: "Dans ton Profil, tu peux basculer entre le Français et l'Anglais. Dans le chat, un toggle FR/ALL te permet de filtrer les messages."
          },
          {
            q: "Comment me désabonner de la newsletter ?",
            a: "Va dans ton Profil et désactive l'option Newsletter, ou utilise le lien de désabonnement dans les emails reçus."
          },
        ]
      },
      {
        id: "matchs",
        title: "Matchs & Favoris",
        icon: "🏒",
        items: [
          {
            q: "Quelles ligues sont disponibles ?",
            a: "Ultra Sports Fans supporte actuellement la NHL (hockey), la NBA (basketball) et la NFL (football américain)."
          },
          {
            q: "Comment voir les matchs d'une autre date ?",
            a: "Sur l'écran principal, utilise le calendrier en haut pour naviguer entre les dates."
          },
          {
            q: "Comment ajouter un match en favori ?",
            a: "Appuie sur l'icône ⭐ sur une carte de match. Tu dois être connecté. Retrouve tes favoris dans l'onglet Favoris."
          },
          {
            q: "Pourquoi certains matchs n'ont pas de score ?",
            a: "Les matchs affichent \"À venir\" avant le début. Les scores apparaissent en temps réel une fois la partie commencée."
          },
        ]
      },
      {
        id: "chat",
        title: "Chat en direct",
        icon: "💬",
        items: [
          {
            q: "Comment participer au chat ?",
            a: "Ouvre un match, appuie sur l'onglet Chat. Tu dois être connecté pour envoyer des messages."
          },
          {
            q: "Pourquoi mon message a été bloqué ?",
            a: "Nos filtres automatiques bloquent les contenus inappropriés : violence, propos haineux, contenu explicite, spam et liens externes. Reformule ton message."
          },
          {
            q: "Comment signaler un message inapproprié ?",
            a: "Maintiens ton doigt appuyé sur un message, puis appuie sur ••• et sélectionne \"Signaler\". Notre équipe examine les signalements sous 24h."
          },
          {
            q: "Comment bloquer un utilisateur ?",
            a: "Maintiens ton doigt appuyé sur un message de cet utilisateur, appuie sur ••• et sélectionne \"Bloquer\". Ses messages ne seront plus visibles pour toi."
          },
          {
            q: "Comment réagir à un message ?",
            a: "Maintiens ton doigt appuyé sur un message pour faire apparaître les réactions emoji (👍 👎 🔥 💀)."
          },
        ]
      },
      {
        id: "equipes",
        title: "Équipes & Statistiques",
        icon: "📊",
        items: [
          {
            q: "Où voir le roster d'une équipe ?",
            a: "Va dans l'onglet Équipes, sélectionne une ligue, puis une équipe. L'onglet Joueurs affiche le roster complet avec les stats."
          },
          {
            q: "Les statistiques sont-elles en temps réel ?",
            a: "Les stats d'équipe et de joueurs sont mises à jour régulièrement via notre partenaire de données sportives."
          },
          {
            q: "Où voir les blessures d'une équipe ?",
            a: "Dans la fiche d'une équipe, l'onglet Blessures liste les joueurs indisponibles avec leur statut (IR, Day-to-Day, etc.)."
          },
        ]
      },
      {
        id: "legal",
        title: "Politique & Légal",
        icon: "📋",
        items: [
          {
            q: "Ultra Sports Fans est-il un site de paris ?",
            a: "Non. Ultra Sports Fans est une application de divertissement sportif communautaire. Aucune mise d'argent n'est possible sur notre plateforme."
          },
          {
            q: "Quel est l'âge minimum pour utiliser l'app ?",
            a: "Tu dois avoir 18 ans ou plus pour créer un compte et utiliser toutes les fonctionnalités."
          },
          {
            q: "Comment mes données sont-elles protégées ?",
            a: "Tes données sont hébergées de manière sécurisée. Nous ne revendons pas tes informations personnelles. Consulte notre politique de confidentialité pour plus de détails."
          },
          {
            q: "Comment contacter le support ?",
            a: "Envoie-nous un email à contact@ultrasportsfans.com. Nous répondons sous 24-48h."
          },
        ]
      },
    ]
  },
  en: {
    title: "Help Center",
    subtitle: "Ultra Sports Fans",
    contact: "Contact Support",
    contactEmail: "contact@ultrasportsfans.com",
    sections: [
      {
        id: "account",
        title: "Account & Login",
        icon: "👤",
        items: [
          {
            q: "How do I create an account?",
            a: "Download the Ultra Sports Fans app, tap \"Sign Up\" and follow the 3 steps: login info, choose your username and avatar, then accept the terms."
          },
          {
            q: "Can I use the app without an account?",
            a: "Yes. You can browse matches and teams as a visitor. Chat and favorites require an account."
          },
          {
            q: "How do I reset my password?",
            a: "On the login screen, tap \"Forgot Password\". You'll receive a link by email. Make sure the app is installed before clicking the link."
          },
          {
            q: "How do I delete my account?",
            a: "Go to your Profile → Delete Account. This action is irreversible and removes all your data."
          },
          {
            q: "My account was suspended. Why?",
            a: "Accounts are suspended for violating our terms of use (inappropriate content, harassment, spam). To appeal, contact us at contact@ultrasportsfans.com."
          },
        ]
      },
      {
        id: "profile",
        title: "Profile & Settings",
        icon: "⚙️",
        items: [
          {
            q: "How do I change my username?",
            a: "Go to the Profile tab and tap your username to edit it. Usernames must be between 3 and 20 characters."
          },
          {
            q: "How do I change my avatar?",
            a: "In your Profile, tap your current avatar to choose a new one from the available options."
          },
          {
            q: "How do I change the language?",
            a: "In your Profile, you can switch between French and English. In chat, a FR/ALL toggle lets you filter messages by language."
          },
          {
            q: "How do I unsubscribe from the newsletter?",
            a: "Go to your Profile and disable the Newsletter option, or use the unsubscribe link in any email you've received."
          },
        ]
      },
      {
        id: "matches",
        title: "Matches & Favorites",
        icon: "🏒",
        items: [
          {
            q: "Which leagues are available?",
            a: "Ultra Sports Fans currently supports the NHL (hockey), NBA (basketball), and NFL (American football)."
          },
          {
            q: "How do I view matches on a different date?",
            a: "On the main screen, use the calendar at the top to navigate between dates."
          },
          {
            q: "How do I add a match to favorites?",
            a: "Tap the ⭐ icon on a match card. You must be logged in. Find your favorites in the Favorites tab."
          },
          {
            q: "Why don't some matches have a score?",
            a: "Matches show \"Upcoming\" before they start. Scores appear in real-time once the game begins."
          },
        ]
      },
      {
        id: "chat",
        title: "Live Chat",
        icon: "💬",
        items: [
          {
            q: "How do I join the chat?",
            a: "Open a match and tap the Chat tab. You must be logged in to send messages."
          },
          {
            q: "Why was my message blocked?",
            a: "Our automatic filters block inappropriate content: violence, hate speech, explicit content, spam, and external links. Please rephrase your message."
          },
          {
            q: "How do I report an inappropriate message?",
            a: "Long-press on a message, tap ••• and select \"Report\". Our team reviews reports within 24 hours."
          },
          {
            q: "How do I block a user?",
            a: "Long-press on a message from that user, tap ••• and select \"Block\". Their messages will no longer be visible to you."
          },
          {
            q: "How do I react to a message?",
            a: "Long-press on a message to bring up emoji reactions (👍 👎 🔥 💀)."
          },
        ]
      },
      {
        id: "teams",
        title: "Teams & Statistics",
        icon: "📊",
        items: [
          {
            q: "Where can I see a team's roster?",
            a: "Go to the Teams tab, select a league, then a team. The Players tab shows the full roster with stats."
          },
          {
            q: "Are the statistics real-time?",
            a: "Team and player stats are updated regularly through our sports data partner."
          },
          {
            q: "Where can I see a team's injuries?",
            a: "In a team's profile, the Injuries tab lists unavailable players with their status (IR, Day-to-Day, etc.)."
          },
        ]
      },
      {
        id: "legal",
        title: "Policy & Legal",
        icon: "📋",
        items: [
          {
            q: "Is Ultra Sports Fans a betting site?",
            a: "No. Ultra Sports Fans is a community sports entertainment app. No money can be wagered on our platform."
          },
          {
            q: "What is the minimum age to use the app?",
            a: "You must be 18 years or older to create an account and use all features."
          },
          {
            q: "How is my data protected?",
            a: "Your data is securely hosted. We do not sell your personal information. See our privacy policy for full details."
          },
          {
            q: "How do I contact support?",
            a: "Send us an email at contact@ultrasportsfans.com. We respond within 24-48 hours."
          },
        ]
      },
    ]
  }
}

export default function SupportPage() {
  const [lang, setLang] = useState<"fr" | "en">("fr")
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [openLegal, setOpenLegal] = useState<string | null>(null)
  const t = content[lang]
  const legal = legalTexts[lang]

  const toggle = (id: string) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar lang={lang} onLangChange={setLang} activePage="support" />

      {/* Hero */}
      <div className="border-b border-white/10 bg-[#111111] pt-24 pb-12 px-6 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">{t.title}</h1>
        <p className="text-gray-400 text-sm">Ultra Sports Fans</p>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-12 space-y-10">
        {t.sections.map((section) => (
          <div key={section.id}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{section.icon}</span>
              <h2 className="text-xl font-bold text-white">{section.title}</h2>
            </div>
            <div className="space-y-2">
              {section.items.map((item, i) => {
                const id = `${section.id}-${i}`
                const isOpen = openItem === id
                return (
                  <div
                    key={id}
                    className="rounded-xl border border-white/10 bg-[#111111] overflow-hidden"
                  >
                    <button
                      onClick={() => toggle(id)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="text-sm font-medium text-white pr-4">{item.q}</span>
                      <span className={`text-[#39ff14] text-lg transition-transform flex-shrink-0 ${isOpen ? "rotate-45" : ""}`}>
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4">
                        <p className="text-sm text-gray-400 leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Legal */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">⚖️</span>
            <h2 className="text-xl font-bold text-white">{lang === "fr" ? "Documents légaux" : "Legal Documents"}</h2>
          </div>
          <div className="space-y-2">
            {[
              { id: "terms", title: legal.termsTitle, text: legal.terms },
              { id: "privacy", title: legal.privacyTitle, text: legal.privacy },
            ].map((doc) => (
              <div key={doc.id} className="rounded-xl border border-white/10 bg-[#111111] overflow-hidden">
                <button
                  onClick={() => setOpenLegal(openLegal === doc.id ? null : doc.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-medium text-white">{doc.title}</span>
                  <span className={`text-[#39ff14] text-lg transition-transform flex-shrink-0 ${openLegal === doc.id ? "rotate-45" : ""}`}>+</span>
                </button>
                {openLegal === doc.id && (
                  <div className="px-5 pb-5">
                    <pre className="text-xs text-gray-400 leading-relaxed whitespace-pre-wrap font-sans max-h-96 overflow-y-auto">
                      {doc.text}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-2xl border border-[#39ff14]/30 bg-[#39ff14]/5 p-8 text-center">
          <p className="text-white font-semibold text-lg mb-2">{t.contact}</p>
          <a
            href={`mailto:${t.contactEmail}`}
            className="text-[#39ff14] font-mono text-sm hover:underline"
          >
            {t.contactEmail}
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center">
        <p className="text-xs text-gray-600">© 2025 Ultra Sports Fans. All rights reserved.</p>
      </footer>
    </div>
  )
}
