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
    title: "Avertissement General",
    text: "Link2Mpx est un outil technique permettant de telecharger des videos publiquement accessibles sur Internet.\n\nVOUS ETES ENTIEREMENT RESPONSABLE de l'utilisation que vous faites de cet outil et des contenus que vous telechargez.",
  },
  {
    title: "Responsabilite Legale de l'Utilisateur",
    subsections: [
      {
        subtitle: "Droits d'Auteur",
        text: "Le telechargement de contenus proteges par des droits d'auteur sans autorisation peut etre ILLEGAL dans votre juridiction.\n\nVous reconnaissez que :\n- Tous les contenus telecharges appartiennent a leurs createurs respectifs\n- Le telechargement ne vous confere AUCUN droit de propriete sur ces contenus\n- Vous devez obtenir l'autorisation du detenteur des droits avant tout telechargement\n- La redistribution, la modification ou l'utilisation commerciale de contenus telecharges sans autorisation peut constituer une violation du droit d'auteur",
      },
      {
        subtitle: "Respect des Conditions d'Utilisation des Plateformes",
        text: "Les plateformes suivantes ont des Conditions d'Utilisation qui peuvent INTERDIRE le telechargement :\n\nYouTube : Les CGU de YouTube interdisent le telechargement de contenus sauf si une option de telechargement est explicitement fournie.\n\nTikTok : TikTok interdit generalement le telechargement de videos sans le filigrane TikTok.\n\nInstagram : Instagram interdit le telechargement de contenus via des outils tiers.\n\nTwitter/X : Les conditions de X limitent l'utilisation de contenus telecharges.\n\nFacebook : Facebook interdit le telechargement de videos sans autorisation.\n\nEN UTILISANT LINK2MPX, VOUS RECONNAISSEZ QUE VOUS POUVEZ VIOLER CES CONDITIONS D'UTILISATION ET QUE VOUS EN ASSUMEZ SEUL LA RESPONSABILITE.",
      },
      {
        subtitle: "Usage Personnel Uniquement",
        text: "Link2Mpx est destine a un usage strictement personnel et prive. Toute utilisation commerciale est interdite sauf autorisation explicite des detenteurs de droits.\n\nExemples d'usages autorises (selon juridiction) :\n- Archivage personnel de contenus dont vous possedez les droits\n- Telechargement de vos propres videos\n- Usage educatif dans le cadre du \"fair use\"\n- Critique ou commentaire avec citation courte\n\nExemples d'usages interdits :\n- Telecharger des films, series, clips musicaux commerciaux\n- Redistribuer ou revendre des contenus telecharges\n- Retirer les credits ou filigranes des createurs\n- Utiliser pour creer des compilations commerciales\n- Telechargement de masse pour piratage",
      },
    ],
  },
  {
    title: "Limitation de Responsabilite de Link2Mpx",
    subsections: [
      {
        subtitle: "Outil Neutre",
        text: "Link2Mpx est un outil technique neutre, similaire a un navigateur web ou un lecteur media. Nous fournissons un logiciel, nous ne validons ni n'encourageons aucune utilisation specifique.",
      },
      {
        subtitle: "Absence de Validation",
        text: "Link2Mpx :\n- NE verifie PAS si vous avez le droit de telecharger un contenu\n- NE valide PAS la legalite de vos telechargements\n- NE stocke PAS les videos sur nos serveurs\n- NE peut PAS empecher les utilisations illegales",
      },
      {
        subtitle: "Exoneration de Responsabilite",
        text: "KPRO.tech et les developpeurs de Link2Mpx ne peuvent en AUCUN CAS etre tenus responsables pour : violations du droit d'auteur par les utilisateurs, violations des CGU de plateformes tierces, consequences legales de l'utilisation du Service, poursuites judiciaires intentees contre les utilisateurs, dommages directs ou indirects, perte de donnees ou dysfonctionnements techniques, actions entreprises par des plateformes tierces.",
      },
      {
        subtitle: "Indemnisation",
        text: "En utilisant Link2Mpx, vous acceptez d'indemniser et de degager de toute responsabilite KPRO.tech, ses developpeurs, affilies et partenaires de toute reclamation, perte, responsabilite, frais ou depense (y compris les frais d'avocat) resultant de votre utilisation du Service.",
      },
    ],
  },
  {
    title: "Variations Juridictionnelles",
    text: "Les lois sur le droit d'auteur varient considerablement d'un pays a l'autre :\n\nFrance :\n- Exception de copie privee (Art. L. 122-5 CPI)\n- Sanction : Jusqu'a 3 ans de prison et 300 000 euros d'amende pour contrefacon\n\nUnion Europeenne :\n- Directive 2001/29/CE : Permet des exceptions nationales pour copie privee\n- Directive 2019/790 : Nouvelle directive sur le droit d'auteur\n\nEtats-Unis :\n- Fair Use Doctrine : Exceptions pour usage educatif, critique, recherche\n- DMCA : Protection contre le contournement de DRM\n\nCote d'Ivoire :\n- Loi n 96-564 du 25 juillet 1996 : Protection du droit d'auteur\n- BURIDA : Organisme de gestion collective\n\nIL EST DE VOTRE RESPONSABILITE de vous informer des lois applicables dans votre juridiction.",
  },
  {
    title: "Contenus Strictement Interdits",
    text: "Il est STRICTEMENT INTERDIT d'utiliser Link2Mpx pour telecharger :\n- Contenus proteges par des DRM (Digital Rights Management)\n- Contenus derriere un paywall ou abonnement payant\n- Contenus prives ou restreints sans autorisation\n- Pornographie infantile ou contenus illegaux (signalement aux autorites)\n- Contenus incitant a la violence, la haine ou le terrorisme\n- Films, series, clips musicaux commerciaux\n- Contenus voles ou pirates\n\nToute violation entrainera : suspension immediate du compte, signalement aux autorites competentes si necessaire, collaboration avec les plateformes et detenteurs de droits.",
  },
  {
    title: "Risques et Consequences",
    text: "En telechargeant des contenus sans autorisation, vous vous exposez a :\n- Poursuites judiciaires : Le detenteur de droits peut vous poursuivre\n- Amendes : Jusqu'a 300 000 euros en France pour contrefacon\n- Peine de prison : Jusqu'a 3 ans dans certains cas graves\n- Suspension de compte : Les plateformes peuvent bloquer votre compte\n- Dommages et interets : Compensation financiere au createur lese\n\nSanctions administratives : suspension du compte Link2Mpx, signalement aux plateformes tierces, transmission de donnees aux autorites si requis par la loi.",
  },
  {
    title: "Recommandations",
    text: "Avant de telecharger, posez-vous ces questions :\n\n1. Ai-je le droit de telecharger ce contenu ?\n   - Est-ce ma propre video ?\n   - Le createur autorise-t-il le telechargement ?\n   - Est-ce sous licence libre (Creative Commons) ?\n\n2. Quelle sera mon utilisation ?\n   - Usage strictement personnel ?\n   - Pas de redistribution ou usage commercial ?\n   - Respect du credit au createur ?\n\n3. Suis-je en conformite avec les CGU de la plateforme ?\n\n4. Mon pays autorise-t-il ce type de copie ?\n\nEn cas de doute, NE TELECHARGEZ PAS.",
  },
  {
    title: "Procedure DMCA / Reclamations",
    text: "Si vous etes detenteur de droits et estimez que Link2Mpx facilite une violation de vos droits d'auteur :\n\nImportant : Link2Mpx est un outil qui ne stocke ni n'heberge de contenu. Nous ne pouvons pas retirer de contenus car nous n'en hebergeons aucun.\n\nNous repondrons sous 72 heures et coopererons dans la mesure du possible.\n\nRecommandation : Contactez directement les plateformes sources (YouTube, TikTok, etc.) et les utilisateurs individuels responsables de la violation.",
  },
]

const contentEn: Section[] = [
  {
    title: "General Warning",
    text: "Link2Mpx is a technical tool for downloading publicly accessible videos on the Internet.\n\nYOU ARE ENTIRELY RESPONSIBLE for how you use this tool and the content you download.",
  },
  {
    title: "User Legal Responsibility",
    subsections: [
      {
        subtitle: "Copyright",
        text: "Downloading content protected by copyright without authorization may be ILLEGAL in your jurisdiction.\n\nYou acknowledge that:\n- All downloaded content belongs to their respective creators\n- Downloading confers NO ownership rights over this content\n- You must obtain authorization from the rights holder before downloading\n- Redistribution, modification, or commercial use of downloaded content without authorization may constitute copyright infringement",
      },
      {
        subtitle: "Platform Terms of Service Compliance",
        text: "The following platforms have Terms of Service that may PROHIBIT downloading:\n\nYouTube: YouTube's ToS prohibit downloading content unless a download option is explicitly provided.\n\nTikTok: TikTok generally prohibits downloading videos without the TikTok watermark.\n\nInstagram: Instagram prohibits downloading content via third-party tools.\n\nTwitter/X: X's terms limit the use of downloaded content.\n\nFacebook: Facebook prohibits downloading videos without authorization.\n\nBY USING LINK2MPX, YOU ACKNOWLEDGE THAT YOU MAY VIOLATE THESE TERMS OF SERVICE AND THAT YOU ASSUME SOLE RESPONSIBILITY.",
      },
      {
        subtitle: "Personal Use Only",
        text: "Link2Mpx is intended for strictly personal and private use. Any commercial use is prohibited unless explicitly authorized by rights holders.\n\nExamples of authorized uses (depending on jurisdiction):\n- Personal archiving of content you own the rights to\n- Downloading your own videos\n- Educational use under \"fair use\"\n- Criticism or commentary with short quotes\n\nExamples of prohibited uses:\n- Downloading commercial movies, series, music videos\n- Redistributing or reselling downloaded content\n- Removing creator credits or watermarks\n- Using to create commercial compilations\n- Mass downloading for piracy",
      },
    ],
  },
  {
    title: "Limitation of Liability of Link2Mpx",
    subsections: [
      {
        subtitle: "Neutral Tool",
        text: "Link2Mpx is a neutral technical tool, similar to a web browser or media player. We provide software; we do not validate or encourage any specific use.",
      },
      {
        subtitle: "No Validation",
        text: "Link2Mpx:\n- Does NOT verify if you have the right to download content\n- Does NOT validate the legality of your downloads\n- Does NOT store videos on our servers\n- Cannot prevent illegal uses",
      },
      {
        subtitle: "Disclaimer",
        text: "KPRO.tech and Link2Mpx developers can in NO CASE be held responsible for: copyright violations by users, violations of third-party platform ToS, legal consequences of using the Service, lawsuits against users, direct or indirect damages, data loss or technical malfunctions, actions taken by third-party platforms.",
      },
      {
        subtitle: "Indemnification",
        text: "By using Link2Mpx, you agree to indemnify and hold harmless KPRO.tech, its developers, affiliates, and partners from any claim, loss, liability, cost, or expense (including attorney's fees) resulting from your use of the Service.",
      },
    ],
  },
  {
    title: "Jurisdictional Variations",
    text: "Copyright laws vary significantly from country to country:\n\nFrance:\n- Private copy exception (Art. L. 122-5 CPI)\n- Penalty: Up to 3 years imprisonment and 300,000 euros fine for counterfeiting\n\nEuropean Union:\n- Directive 2001/29/EC: Allows national exceptions for private copying\n- Directive 2019/790: New copyright directive\n\nUnited States:\n- Fair Use Doctrine: Exceptions for educational, critical, research use\n- DMCA: Protection against DRM circumvention\n\nIvory Coast:\n- Law No. 96-564 of July 25, 1996: Copyright protection\n- BURIDA: Collective management organization\n\nIT IS YOUR RESPONSIBILITY to inform yourself of the applicable laws in your jurisdiction.",
  },
  {
    title: "Strictly Prohibited Content",
    text: "It is STRICTLY PROHIBITED to use Link2Mpx to download:\n- Content protected by DRM (Digital Rights Management)\n- Content behind a paywall or paid subscription\n- Private or restricted content without authorization\n- Child pornography or illegal content (reported to authorities)\n- Content inciting violence, hatred, or terrorism\n- Commercial movies, series, music videos\n- Stolen or pirated content\n\nAny violation will result in: immediate account suspension, reporting to competent authorities if necessary, cooperation with platforms and rights holders.",
  },
  {
    title: "Risks and Consequences",
    text: "By downloading content without authorization, you expose yourself to:\n- Lawsuits: The rights holder can sue you\n- Fines: Up to 300,000 euros in France for counterfeiting\n- Prison: Up to 3 years in serious cases\n- Account suspension: Platforms may block your account\n- Damages: Financial compensation to the harmed creator\n\nAdministrative sanctions: Link2Mpx account suspension, reporting to third-party platforms, transmission of data to authorities if required by law.",
  },
  {
    title: "Recommendations",
    text: "Before downloading, ask yourself these questions:\n\n1. Do I have the right to download this content?\n   - Is this my own video?\n   - Does the creator authorize downloading?\n   - Is it under a free license (Creative Commons)?\n\n2. What will my use be?\n   - Strictly personal use?\n   - No redistribution or commercial use?\n   - Respecting creator credit?\n\n3. Am I compliant with the platform's Terms of Service?\n\n4. Does my country authorize this type of copying?\n\nWhen in doubt, DO NOT DOWNLOAD.",
  },
  {
    title: "DMCA / Claims Procedure",
    text: "If you are a rights holder and believe that Link2Mpx facilitates a violation of your copyright:\n\nImportant: Link2Mpx is a tool that does not store or host content. We cannot remove content because we do not host any.\n\nWe will respond within 72 hours and cooperate as much as possible.\n\nRecommendation: Contact the source platforms (YouTube, TikTok, etc.) and individual users responsible for the violation directly.",
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

export default function LegalNoticePage() {
  const { locale, t } = useI18n()
  const content = locale === "fr" ? contentFr : contentEn

  return (
    <LegalLayout
      title={t.legal.legalNoticeTitle}
      effectiveDate={locale === "fr" ? "1er Fevrier 2026" : "February 1, 2026"}
      lastUpdated={locale === "fr" ? "8 Fevrier 2026" : "February 8, 2026"}
      currentPage="legal-notice"
    >
      {content.map((section) => (
        <SectionBlock key={section.title} section={section} />
      ))}
      <div className="mt-6 pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground font-semibold">
          BY KPRO.tech - Link2Mpx - {locale === "fr" ? "Utilisez de maniere responsable et legale" : "Use responsibly and legally"}
        </p>
      </div>
    </LegalLayout>
  )
}
