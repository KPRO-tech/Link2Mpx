"use client"

import { LegalLayout } from "@/components/legal-layout"
import { useI18n } from "@/lib/i18n/context"

const contentFr = [
  {
    title: "1. Acceptation des Conditions",
    text: "En accedant et en utilisant Link2Mpx (ci-apres \"le Service\"), vous acceptez d'etre lie par les presentes Conditions Generales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le Service.\n\nLink2Mpx est un service gratuit et open source fourni \"tel quel\" sans aucune garantie.",
  },
  {
    title: "2. Description du Service",
    text: "Link2Mpx est un outil permettant aux utilisateurs de telecharger des videos publiquement accessibles depuis diverses plateformes en ligne, notamment : YouTube, TikTok, Instagram, Twitter/X, Facebook.\n\nLe Service est fourni gratuitement et peut evoluer, etre modifie ou interrompu a tout moment sans preavis.",
  },
  {
    title: "3. Responsabilite de l'Utilisateur",
    subsections: [
      {
        subtitle: "3.1 Utilisation Legale",
        text: "L'utilisateur est seul responsable de l'utilisation qu'il fait du Service et des contenus telecharges. L'utilisateur s'engage a :\n- Respecter les droits d'auteur et la propriete intellectuelle\n- Ne telecharger que des contenus dont il possede les droits ou pour lesquels il a obtenu l'autorisation\n- Respecter les Conditions d'Utilisation des plateformes sources\n- Ne pas utiliser le Service a des fins commerciales sans autorisation appropriee\n- Ne pas telecharger de contenus illegaux, diffamatoires, ou portant atteinte aux droits de tiers",
      },
      {
        subtitle: "3.2 Usage Personnel",
        text: "Le Service est destine a un usage personnel et prive uniquement. Toute utilisation commerciale, redistribution, ou revente de contenus telecharges via Link2Mpx sans autorisation des detenteurs de droits est strictement interdite et releve de la seule responsabilite de l'utilisateur.",
      },
      {
        subtitle: "3.3 Fair Use et Exceptions Legales",
        text: "Dans certaines juridictions, le telechargement de contenus peut etre autorise dans le cadre du \"fair use\" (usage equitable) ou d'exceptions similaires, notamment pour : usage educatif ou de recherche, critique ou commentaire, archivage personnel, citation.\n\nL'utilisateur est responsable de s'assurer que son utilisation respecte les lois applicables dans sa juridiction.",
      },
    ],
  },
  {
    title: "4. Limites de Responsabilite de Link2Mpx",
    subsections: [
      {
        subtitle: "4.1 Exoneration de Responsabilite",
        text: "Link2Mpx et ses createurs (KPRO.tech) :\n- NE sont PAS responsables de l'utilisation que les utilisateurs font du Service\n- NE valident PAS la legalite des telechargements effectues par les utilisateurs\n- NE stockent PAS les contenus telecharges sur leurs serveurs\n- NE peuvent PAS etre tenus responsables en cas de violation des droits d'auteur par les utilisateurs\n- NE fournissent AUCUNE garantie quant au bon fonctionnement du Service\n- NE sont PAS responsables des dommages directs ou indirects resultant de l'utilisation du Service",
      },
      {
        subtitle: "4.2 Service Fourni \"Tel Quel\"",
        text: "Le Service est fourni sans aucune garantie, expresse ou implicite, y compris mais sans s'y limiter : garantie de qualite marchande, garantie d'adequation a un usage particulier, garantie de disponibilite ou de continuite du service, garantie d'absence d'erreurs ou de bugs.",
      },
    ],
  },
  {
    title: "5. Droits d'Auteur et Propriete Intellectuelle",
    text: "L'utilisateur reconnait que :\n- Les videos telechargees appartiennent a leurs createurs respectifs\n- Le telechargement ne confere AUCUN droit de propriete sur le contenu\n- La suppression des DRM, filigranes ou autres protections techniques peut etre illegale\n- L'utilisateur doit crediter les createurs originaux lors de toute utilisation autorisee\n\nLe code source de Link2Mpx est sous licence MIT. La marque \"Link2Mpx\" et le logo restent la propriete de KPRO.tech.",
  },
  {
    title: "6. Quotas et Limitations d'Usage",
    text: "Le Service impose des quotas pour prevenir les abus :\n- Utilisateurs non connectes : 3 telechargements gratuits\n- Utilisateurs authentifies : 20 telechargements par jour (reset a minuit UTC)\n\nCes quotas peuvent etre modifies a tout moment sans preavis.\n\nIl est strictement interdit de : creer plusieurs comptes pour contourner les quotas, utiliser des bots/scrapers ou outils automatises, surcharger l'infrastructure du Service, revendre l'acces au Service, utiliser le Service a des fins de piratage de masse.",
  },
  {
    title: "7. Donnees Personnelles et Confidentialite",
    text: "Link2Mpx collecte les donnees minimales necessaires au fonctionnement : adresse email (authentification), nom d'utilisateur (optionnel), historique des telechargements (URLs, dates, plateformes), adresse IP (logs serveur pour securite).\n\nNous ne vendons JAMAIS vos donnees a des tiers. Le Service utilise des cookies essentiels (authentification, preferences), Firebase Analytics (anonymise), et aucun tracking publicitaire tiers.\n\nConformement au RGPD, vous avez le droit d'acceder, rectifier, supprimer, exporter vos donnees et vous opposer au traitement.",
  },
  {
    title: "8. Authentification et Securite",
    text: "L'utilisateur est responsable de la confidentialite de son mot de passe, de toutes les activites effectuees sous son compte, et doit informer immediatement Link2Mpx en cas d'utilisation non autorisee.\n\nLink2Mpx met en oeuvre des mesures de securite raisonnables, mais ne peut garantir une securite absolue.",
  },
  {
    title: "9. Contenu Interdit",
    text: "Il est strictement interdit d'utiliser Link2Mpx pour telecharger : contenus proteges par des DRM actifs, contenus payants ou derriere un paywall, contenus prives sans autorisation, contenus illegaux (pornographie infantile, incitation a la violence, etc.), contenus violant les droits de tiers.\n\nToute violation entrainera la suspension immediate du compte et pourra faire l'objet d'un signalement aux autorites competentes.",
  },
  {
    title: "10. Disponibilite et Modifications du Service",
    text: "Link2Mpx s'efforce de maintenir le Service disponible 24/7, mais ne garantit pas une disponibilite ininterrompue, l'absence de bugs ou d'erreurs, la compatibilite avec toutes les plateformes video, ou la perennite du Service.\n\nLink2Mpx se reserve le droit de modifier les fonctionnalites, ajouter ou retirer des plateformes supportees, modifier les quotas et limitations, ou cesser l'exploitation du Service a tout moment.",
  },
  {
    title: "11. Resiliation",
    text: "L'utilisateur peut supprimer son compte a tout moment depuis son profil. Link2Mpx se reserve le droit de suspendre ou supprimer tout compte violant les presentes CGU, utilisant le Service de maniere abusive, sans preavis et sans justification.",
  },
  {
    title: "12. Indemnisation",
    text: "L'utilisateur accepte d'indemniser et de degager Link2Mpx, KPRO.tech et ses affilies de toute reclamation, perte, responsabilite ou depense (y compris les frais d'avocat) resultant de l'utilisation du Service par l'utilisateur, la violation des presentes CGU, ou la violation de droits de tiers.",
  },
  {
    title: "13. Droit Applicable et Juridiction",
    text: "Les presentes CGU sont regies par le droit francais et ivoirien. En cas de litige, les parties s'efforceront de trouver une solution amiable.",
  },
  {
    title: "14. Gratuite du Service",
    text: "Link2Mpx est actuellement gratuit et le restera dans un avenir previsible. Cependant, Link2Mpx se reserve le droit d'introduire des fonctionnalites payantes ou un modele d'abonnement a l'avenir. Les utilisateurs seront informes au moins 30 jours avant tout changement tarifaire.",
  },
  {
    title: "15. Open Source",
    text: "Le code source de Link2Mpx est disponible sous licence MIT. Toutefois, l'hebergement du Service et la marque \"Link2Mpx\" restent la propriete exclusive de KPRO.tech.",
  },
]

const contentEn = [
  {
    title: "1. Acceptance of Terms",
    text: "By accessing and using Link2Mpx (hereinafter \"the Service\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.\n\nLink2Mpx is a free, open-source service provided \"as is\" without any warranty.",
  },
  {
    title: "2. Service Description",
    text: "Link2Mpx is a tool that allows users to download publicly accessible videos from various online platforms, including: YouTube, TikTok, Instagram, Twitter/X, Facebook.\n\nThe Service is provided free of charge and may be updated, modified, or discontinued at any time without notice.",
  },
  {
    title: "3. User Responsibility",
    subsections: [
      {
        subtitle: "3.1 Legal Use",
        text: "The user is solely responsible for how they use the Service and the content they download. The user agrees to:\n- Respect copyright and intellectual property rights\n- Only download content for which they have the rights or authorization\n- Respect the Terms of Service of source platforms\n- Not use the Service for commercial purposes without proper authorization\n- Not download illegal, defamatory, or rights-infringing content",
      },
      {
        subtitle: "3.2 Personal Use",
        text: "The Service is intended for personal and private use only. Any commercial use, redistribution, or resale of content downloaded via Link2Mpx without authorization from rights holders is strictly prohibited and is the sole responsibility of the user.",
      },
      {
        subtitle: "3.3 Fair Use and Legal Exceptions",
        text: "In some jurisdictions, downloading content may be authorized under \"fair use\" or similar exceptions, particularly for: educational or research purposes, criticism or commentary, personal archiving, citation.\n\nThe user is responsible for ensuring their use complies with applicable laws in their jurisdiction.",
      },
    ],
  },
  {
    title: "4. Limitation of Liability",
    subsections: [
      {
        subtitle: "4.1 Disclaimer",
        text: "Link2Mpx and its creators (KPRO.tech):\n- Are NOT responsible for how users use the Service\n- Do NOT validate the legality of downloads made by users\n- Do NOT store downloaded content on their servers\n- Cannot be held responsible for copyright violations by users\n- Provide NO warranty regarding the proper functioning of the Service\n- Are NOT responsible for direct or indirect damages resulting from use of the Service",
      },
      {
        subtitle: "4.2 Service Provided \"As Is\"",
        text: "The Service is provided without any warranty, express or implied, including but not limited to: warranty of merchantability, warranty of fitness for a particular purpose, warranty of availability or continuity of service, warranty of absence of errors or bugs.",
      },
    ],
  },
  {
    title: "5. Copyright and Intellectual Property",
    text: "The user acknowledges that:\n- Downloaded videos belong to their respective creators\n- Downloading confers NO ownership rights over the content\n- Removing DRM, watermarks, or other technical protections may be illegal\n- Users must credit original creators for any authorized use\n\nThe Link2Mpx source code is under the MIT license. The \"Link2Mpx\" brand and logo remain the property of KPRO.tech.",
  },
  {
    title: "6. Quotas and Usage Limits",
    text: "The Service imposes quotas to prevent abuse:\n- Unregistered users: 3 free downloads\n- Authenticated users: 20 downloads per day (reset at midnight UTC)\n\nThese quotas may be changed at any time without notice.\n\nIt is strictly forbidden to: create multiple accounts to bypass quotas, use bots/scrapers or automated tools, overload the Service infrastructure, resell access to the Service, use the Service for mass piracy.",
  },
  {
    title: "7. Personal Data and Privacy",
    text: "Link2Mpx collects minimal data necessary for operation: email address (authentication), username (optional), download history (URLs, dates, platforms), IP address (server logs for security).\n\nWe NEVER sell your data to third parties. The Service uses essential cookies (authentication, preferences), Firebase Analytics (anonymized), and no third-party advertising tracking.\n\nIn accordance with GDPR, you have the right to access, rectify, delete, export your data and object to processing.",
  },
  {
    title: "8. Authentication and Security",
    text: "The user is responsible for the confidentiality of their password, all activities performed under their account, and must immediately inform Link2Mpx of any unauthorized use.\n\nLink2Mpx implements reasonable security measures but cannot guarantee absolute security.",
  },
  {
    title: "9. Prohibited Content",
    text: "It is strictly forbidden to use Link2Mpx to download: content protected by active DRM, paid content or content behind a paywall, private content without authorization, illegal content (child pornography, incitement to violence, etc.), content violating third-party rights.\n\nAny violation will result in immediate account suspension and may be reported to competent authorities.",
  },
  {
    title: "10. Availability and Service Modifications",
    text: "Link2Mpx strives to maintain the Service available 24/7 but does not guarantee uninterrupted availability, absence of bugs or errors, compatibility with all video platforms, or the permanence of the Service.\n\nLink2Mpx reserves the right to modify features, add or remove supported platforms, modify quotas and limitations, or cease operation of the Service at any time.",
  },
  {
    title: "11. Termination",
    text: "Users can delete their account at any time from their profile. Link2Mpx reserves the right to suspend or delete any account that violates these Terms, uses the Service abusively, without notice and without justification.",
  },
  {
    title: "12. Indemnification",
    text: "The user agrees to indemnify and hold harmless Link2Mpx, KPRO.tech, and its affiliates from any claim, loss, liability, or expense (including attorney's fees) resulting from the user's use of the Service, violation of these Terms, or violation of third-party rights.",
  },
  {
    title: "13. Applicable Law and Jurisdiction",
    text: "These Terms are governed by French and Ivorian law. In case of dispute, the parties will endeavor to find an amicable solution.",
  },
  {
    title: "14. Free Service",
    text: "Link2Mpx is currently free and will remain so for the foreseeable future. However, Link2Mpx reserves the right to introduce paid features or a subscription model in the future. Users will be notified at least 30 days before any pricing change.",
  },
  {
    title: "15. Open Source",
    text: "The Link2Mpx source code is available under the MIT license. However, the hosting of the Service and the \"Link2Mpx\" brand remain the exclusive property of KPRO.tech.",
  },
]

interface Section {
  title: string
  text?: string
  subsections?: { subtitle: string; text: string }[]
}

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

export default function TermsPage() {
  const { locale, t } = useI18n()
  const content = locale === "fr" ? contentFr : contentEn

  return (
    <LegalLayout
      title={t.legal.termsTitle}
      effectiveDate={locale === "fr" ? "1er Fevrier 2026" : "February 1, 2026"}
      lastUpdated={locale === "fr" ? "8 Fevrier 2026" : "February 8, 2026"}
      currentPage="terms"
    >
      {content.map((section) => (
        <SectionBlock key={section.title} section={section} />
      ))}
      <div className="mt-6 pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground font-semibold">
          BY KPRO.tech - Link2Mpx
        </p>
      </div>
    </LegalLayout>
  )
}
