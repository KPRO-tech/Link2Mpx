"use client"

import { LegalLayout } from "@/components/legal-layout"
import { useI18n } from "@/lib/i18n/context"

interface Section {
  title: string
  text?: string
  subsections?: { subtitle: string; text: string }[]
}

const contentFr: Section[] = [
  {
    title: "1. Introduction",
    text: "Bienvenue sur Link2Mpx, un service gratuit et open source developpe par KPRO.tech.\n\nCette Politique de Confidentialite decrit comment nous collectons, utilisons, stockons et protegeons vos donnees personnelles lorsque vous utilisez notre service.\n\nEn utilisant Link2Mpx, vous acceptez les pratiques decrites dans cette politique.",
  },
  {
    title: "2. Donnees Collectees",
    subsections: [
      {
        subtitle: "2.1 Donnees Fournies Directement",
        text: "Lorsque vous creez un compte, nous collectons :\n- Adresse email (obligatoire pour l'authentification)\n- Nom d'utilisateur / Nom d'affichage (optionnel)\n- Mot de passe (stocke de maniere chiffree via Firebase Authentication)",
      },
      {
        subtitle: "2.2 Donnees Collectees Automatiquement",
        text: "Lors de votre utilisation du Service :\n- URLs des videos telechargees (pour gerer les quotas)\n- Plateforme source (YouTube, TikTok, etc.)\n- Date et heure des telechargements\n- Format choisi (HD, 4K, MP3)\n- Adresse IP (logs serveur pour securite et prevention des abus)\n- Type de navigateur et systeme d'exploitation (via User-Agent)\n- Donnees d'utilisation (nombre de telechargements, frequence)",
      },
      {
        subtitle: "2.3 Cookies et Technologies Similaires",
        text: "Nous utilisons :\n- Cookies essentiels : Authentification, gestion de session, preferences utilisateur (langue, theme)\n- Firebase Analytics : Statistiques d'utilisation anonymisees (nombre de visiteurs, pages vues)\n- LocalStorage : Stockage des quotas pour utilisateurs non connectes\n\nNous n'utilisons AUCUN cookie publicitaire ou de tracking tiers.",
      },
      {
        subtitle: "2.4 Authentification via Google",
        text: "Si vous vous connectez avec Google OAuth :\n- Nous recevons votre email et nom depuis Google\n- Nous ne recevons PAS votre mot de passe Google",
      },
    ],
  },
  {
    title: "3. Utilisation des Donnees",
    subsections: [
      {
        subtitle: "3.1 Finalites",
        text: "Fonctionnement du Service : gerer votre compte utilisateur, appliquer les quotas de telechargement (3 gratuits, 20/jour pour comptes), afficher votre historique de telechargements, reinitialiser votre mot de passe.\n\nAmelioration du Service : analyser les tendances d'utilisation (plateformes populaires, formats preferes), corriger les bugs et ameliorer les performances, developper de nouvelles fonctionnalites.\n\nSecurite et Prevention des Abus : detecter et prevenir les utilisations frauduleuses, bloquer les bots et le scraping automatise, respecter les quotas et empecher la surcharge du serveur.\n\nStatistiques Publiques : afficher des stats anonymisees sur la page d'accueil (nombre d'utilisateurs en ligne, total d'utilisateurs inscrits, nombre de videos telechargees aujourd'hui).",
      },
      {
        subtitle: "3.2 Ce que Nous NE Faisons PAS",
        text: "- Nous ne vendons JAMAIS vos donnees a des tiers\n- Nous ne partageons pas vos donnees avec des annonceurs\n- Nous ne stockons pas les videos telechargees (elles transitent par notre serveur puis sont supprimees)\n- Nous ne regardons pas votre historique pour vous profiler\n- Nous n'envoyons pas de spam ou d'emails marketing non sollicites",
      },
    ],
  },
  {
    title: "4. Base Legale du Traitement (RGPD)",
    text: "Conformement au Reglement General sur la Protection des Donnees (RGPD), nous traitons vos donnees sur les bases legales suivantes :\n- Consentement : En creant un compte, vous consentez au traitement de vos donnees\n- Execution du contrat : Necessaire pour fournir le Service\n- Interet legitime : Securite, prevention des abus, amelioration du Service",
  },
  {
    title: "5. Partage des Donnees",
    subsections: [
      {
        subtitle: "5.1 Aucun Partage Commercial",
        text: "Vos donnees personnelles ne sont JAMAIS vendues, louees ou partagees a des fins commerciales.",
      },
      {
        subtitle: "5.2 Partage Technique Necessaire",
        text: "Vos donnees peuvent etre partagees avec :\n- Firebase (Google Cloud Platform) : Hebergement de la base de donnees, Authentification\n- Vercel (hebergement du frontend) : Logs serveur (IP, User-Agent)\n- yt-dlp (outil open source) : Les URLs sont transmises a yt-dlp pour extraction. Aucune donnee personnelle n'est envoyee aux plateformes video",
      },
      {
        subtitle: "5.3 Obligations Legales",
        text: "Nous pouvons divulguer vos donnees si requis par la loi, une decision de justice, ou pour proteger les droits et la securite de Link2Mpx, prevenir une fraude ou une activite illegale, repondre a une demande des autorites competentes.",
      },
    ],
  },
  {
    title: "6. Conservation des Donnees",
    text: "- Compte actif : Donnees conservees tant que votre compte existe\n- Historique des telechargements : Conserve indefiniment (ou jusqu'a suppression manuelle)\n- Logs serveur : Conserves 90 jours maximum\n- Compte supprime : Donnees effacees sous 30 jours (sauf obligations legales)\n\nLes videos ne sont JAMAIS stockees sur nos serveurs. Elles transitent temporairement (quelques secondes) puis sont automatiquement supprimees.",
  },
  {
    title: "7. Securite des Donnees",
    text: "Nous mettons en oeuvre des mesures de securite pour proteger vos donnees :\n- Chiffrement HTTPS : Toutes les communications sont chiffrees (TLS 1.3)\n- Mots de passe hashes : Via Firebase Authentication (bcrypt/scrypt)\n- Regles de securite Firebase : Acces restreint aux donnees\n- Rate limiting : Protection contre les attaques par force brute\n- Mise a jour reguliere : Patches de securite appliques rapidement\n\nAucun systeme n'est 100% securise. Il est de votre responsabilite de proteger votre mot de passe et de signaler toute activite suspecte.",
  },
  {
    title: "8. Vos Droits (RGPD)",
    text: "En tant qu'utilisateur europeen, vous disposez des droits suivants :\n- Droit d'Acces : Demander une copie de vos donnees personnelles\n- Droit de Rectification : Corriger vos donnees inexactes depuis votre profil\n- Droit a l'Effacement (\"Droit a l'Oubli\") : Demander la suppression complete en supprimant votre compte\n- Droit a la Portabilite : Exporter vos donnees dans un format structure\n- Droit d'Opposition : Vous opposer au traitement a des fins de profilage\n- Droit de Limitation : Demander la limitation du traitement\n\nDelai de reponse : 30 jours maximum",
  },
  {
    title: "9. Transferts Internationaux",
    text: "Vos donnees sont hebergees sur les serveurs de Firebase (Google Cloud) situes en Europe (europe-west) principalement, avec de possibles transferts vers d'autres regions pour redondance.\n\nLes transferts vers les Etats-Unis ou d'autres pays tiers sont encadres par les Clauses Contractuelles Types de l'UE et le cadre de protection des donnees UE-US (Data Privacy Framework).",
  },
  {
    title: "10. Utilisateurs Mineurs",
    text: "Link2Mpx est destine aux personnes de 13 ans et plus.\n- Moins de 13 ans : Interdiction stricte d'utilisation\n- 13-18 ans : Autorisation parentale recommandee\n\nNous ne collectons pas sciemment de donnees sur des enfants de moins de 13 ans. Si nous en avons connaissance, nous supprimerons immediatement le compte.",
  },
  {
    title: "11. Modifications de la Politique",
    text: "Nous pouvons modifier cette Politique de Confidentialite a tout moment. Les modifications seront publiees sur cette page avec mise a jour de la date et notifiees par email pour les changements majeurs.\n\nL'utilisation continue du Service apres modification constitue votre acceptation.",
  },
  {
    title: "12. Notification de Violation de Donnees",
    text: "En cas de violation de donnees compromettant vos informations personnelles :\n- Notification sous 72 heures a l'autorite de controle (CNIL)\n- Notification aux utilisateurs affectes si risque eleve\n- Publication d'un rapport d'incident sur le site",
  },
  {
    title: "13. Autorite de Controle",
    text: "Si vous estimez que vos droits ne sont pas respectes, vous pouvez deposer une plainte aupres de :\n\nFrance : Commission Nationale de l'Informatique et des Libertes (CNIL) - www.cnil.fr\nCote d'Ivoire : Autorite de Regulation des Telecommunications/TIC de Cote d'Ivoire (ARTCI) - www.artci.ci",
  },
]

const contentEn: Section[] = [
  {
    title: "1. Introduction",
    text: "Welcome to Link2Mpx, a free and open-source service developed by KPRO.tech.\n\nThis Privacy Policy describes how we collect, use, store, and protect your personal data when you use our service.\n\nBy using Link2Mpx, you agree to the practices described in this policy.",
  },
  {
    title: "2. Data Collected",
    subsections: [
      {
        subtitle: "2.1 Data Provided Directly",
        text: "When you create an account, we collect:\n- Email address (required for authentication)\n- Username / Display name (optional)\n- Password (stored encrypted via Firebase Authentication)",
      },
      {
        subtitle: "2.2 Automatically Collected Data",
        text: "During your use of the Service:\n- URLs of downloaded videos (to manage quotas)\n- Source platform (YouTube, TikTok, etc.)\n- Date and time of downloads\n- Chosen format (HD, 4K, MP3)\n- IP address (server logs for security and abuse prevention)\n- Browser type and operating system (via User-Agent)\n- Usage data (number of downloads, frequency)",
      },
      {
        subtitle: "2.3 Cookies and Similar Technologies",
        text: "We use:\n- Essential cookies: Authentication, session management, user preferences (language, theme)\n- Firebase Analytics: Anonymized usage statistics (visitor count, page views)\n- LocalStorage: Quota storage for unregistered users\n\nWe use NO advertising or third-party tracking cookies.",
      },
      {
        subtitle: "2.4 Google Authentication",
        text: "If you sign in with Google OAuth:\n- We receive your email and name from Google\n- We do NOT receive your Google password",
      },
    ],
  },
  {
    title: "3. Use of Data",
    subsections: [
      {
        subtitle: "3.1 Purposes",
        text: "Service Operation: manage your user account, apply download quotas (3 free, 20/day for accounts), display your download history, reset your password.\n\nService Improvement: analyze usage trends (popular platforms, preferred formats), fix bugs and improve performance, develop new features.\n\nSecurity and Abuse Prevention: detect and prevent fraudulent use, block bots and automated scraping, enforce quotas and prevent server overload.\n\nPublic Statistics: display anonymized stats on the homepage (users online, total registered users, videos downloaded today).",
      },
      {
        subtitle: "3.2 What We Do NOT Do",
        text: "- We NEVER sell your data to third parties\n- We do not share your data with advertisers\n- We do not store downloaded videos (they pass through our server then are deleted)\n- We do not analyze your history to profile you\n- We do not send spam or unsolicited marketing emails",
      },
    ],
  },
  {
    title: "4. Legal Basis for Processing (GDPR)",
    text: "In accordance with the General Data Protection Regulation (GDPR), we process your data on the following legal bases:\n- Consent: By creating an account, you consent to the processing of your data\n- Contract performance: Necessary to provide the Service\n- Legitimate interest: Security, abuse prevention, Service improvement",
  },
  {
    title: "5. Data Sharing",
    subsections: [
      {
        subtitle: "5.1 No Commercial Sharing",
        text: "Your personal data is NEVER sold, rented, or shared for commercial purposes.",
      },
      {
        subtitle: "5.2 Necessary Technical Sharing",
        text: "Your data may be shared with:\n- Firebase (Google Cloud Platform): Database hosting, Authentication\n- Vercel (frontend hosting): Server logs (IP, User-Agent)\n- yt-dlp (open source tool): URLs are transmitted to yt-dlp for extraction. No personal data is sent to video platforms",
      },
      {
        subtitle: "5.3 Legal Obligations",
        text: "We may disclose your data if required by law, court order, or to protect the rights and safety of Link2Mpx, prevent fraud or illegal activity, respond to requests from competent authorities.",
      },
    ],
  },
  {
    title: "6. Data Retention",
    text: "- Active account: Data kept as long as your account exists\n- Download history: Kept indefinitely (or until manual deletion)\n- Server logs: Kept for a maximum of 90 days\n- Deleted account: Data erased within 30 days (except legal obligations)\n\nVideos are NEVER stored on our servers. They pass through temporarily (a few seconds) then are automatically deleted.",
  },
  {
    title: "7. Data Security",
    text: "We implement security measures to protect your data:\n- HTTPS encryption: All communications are encrypted (TLS 1.3)\n- Hashed passwords: Via Firebase Authentication (bcrypt/scrypt)\n- Firebase security rules: Restricted data access\n- Rate limiting: Protection against brute force attacks\n- Regular updates: Security patches applied promptly\n\nNo system is 100% secure. It is your responsibility to protect your password and report any suspicious activity.",
  },
  {
    title: "8. Your Rights (GDPR)",
    text: "As a European user, you have the following rights:\n- Right of Access: Request a copy of your personal data\n- Right of Rectification: Correct inaccurate data from your profile\n- Right to Erasure (\"Right to be Forgotten\"): Request complete deletion by deleting your account\n- Right to Portability: Export your data in a structured format\n- Right to Object: Object to processing for profiling purposes\n- Right to Restriction: Request limitation of processing\n\nResponse time: 30 days maximum",
  },
  {
    title: "9. International Transfers",
    text: "Your data is hosted on Firebase (Google Cloud) servers located primarily in Europe (europe-west), with possible transfers to other regions for redundancy.\n\nTransfers to the United States or other third countries are governed by EU Standard Contractual Clauses and the EU-US Data Privacy Framework.",
  },
  {
    title: "10. Minor Users",
    text: "Link2Mpx is intended for persons aged 13 and over.\n- Under 13: Strict prohibition of use\n- 13-18: Parental authorization recommended\n\nWe do not knowingly collect data from children under 13. If we become aware of such data, we will immediately delete the account.",
  },
  {
    title: "11. Policy Modifications",
    text: "We may modify this Privacy Policy at any time. Changes will be published on this page with an updated date and notified by email for major changes.\n\nContinued use of the Service after modification constitutes your acceptance.",
  },
  {
    title: "12. Data Breach Notification",
    text: "In case of a data breach compromising your personal information:\n- Notification within 72 hours to the supervisory authority (CNIL)\n- Notification to affected users if high risk\n- Publication of an incident report on the site",
  },
  {
    title: "13. Supervisory Authority",
    text: "If you believe your rights are not being respected, you can file a complaint with:\n\nFrance: Commission Nationale de l'Informatique et des Libertes (CNIL) - www.cnil.fr\nIvory Coast: Autorite de Regulation des Telecommunications/TIC de Cote d'Ivoire (ARTCI) - www.artci.ci",
  },
]

function SectionBlock({ section }: { section: Section }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-2">
        {section.title}
      </h2>
      {section.text && (
        <p className="whitespace-pre-line">{section.text}</p>
      )}
      {section.subsections?.map((sub) => (
        <div key={sub.subtitle} className="mt-3 ml-4">
          <h3 className="text-sm font-semibold text-foreground mb-1">
            {sub.subtitle}
          </h3>
          <p className="whitespace-pre-line">{sub.text}</p>
        </div>
      ))}
    </div>
  )
}

export default function PrivacyPage() {
  const { locale, t } = useI18n()
  const content = locale === "fr" ? contentFr : contentEn

  return (
    <LegalLayout
      title={t.legal.privacyTitle}
      effectiveDate={locale === "fr" ? "1er Fevrier 2026" : "February 1, 2026"}
      lastUpdated={locale === "fr" ? "8 Fevrier 2026" : "February 8, 2026"}
      currentPage="privacy"
    >
      {content.map((section) => (
        <SectionBlock key={section.title} section={section} />
      ))}
      <div className="mt-6 pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground font-semibold">
          BY KPRO.tech - Link2Mpx - {locale === "fr" ? "Votre vie privee, notre priorite" : "Your privacy, our priority"}
        </p>
      </div>
    </LegalLayout>
  )
}
