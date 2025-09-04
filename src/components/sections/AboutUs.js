'use client';

import { useRef } from 'react';
import OrgChart from '../OrgChart';



// Remarque: Les images sont servies depuis public/images

export default function AboutUs() {
  const containerRef = useRef(null);

  const scrollLeft = () => containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const scrollRight = () => containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

  const valeursData = [
    { key: 'respect', image: '/images/respect.png', titre: 'Respect', texte: "L'association accorde une grande importance à l'établissement de relations humaines solides, fondées sur l’estime mutuelle. Elle reconnaît la valeur de chaque individu, notamment les jeunes, comme partenaires essentiels du développement." },
    { key: 'transparence', image: '/images/affichage.png', titre: 'Transparence', texte: "La transparence garantit la clarté et la crédibilité de nos actions. L’association maintient une communication ouverte avec les jeunes et les partenaires afin de renforcer la confiance et la compréhension." },
    { key: 'confiance', image: '/images/confiance.png', titre: 'Confiance', texte: "La confiance est essentielle pour une coopération durable. L’association accompagne les jeunes avec bienveillance afin de leur permettre d’atteindre leurs objectifs avec assurance." },
    { key: 'egalite', image: '/images/egalite.png', titre: 'Égalité', texte: "L’égalité des chances entre tous les individus est un principe fondamental dans le travail de l’association. Elle s’engage à offrir un environnement inclusif permettant aux jeunes d’accéder aux opportunités qui les aident à réaliser leur potentiel et à contribuer au développement durable." },
    { key: 'dignite', image: '/images/dignite.png', titre: 'Dignité', texte: "L’association place la préservation de la dignité humaine au cœur de son action en respectant les droits des jeunes et en valorisant leur participation à la société." },
    { key: 'engagement', image: '/images/engagement.png', titre: 'Engagement', texte: "L’engagement envers la responsabilité est la pierre angulaire du succès de l’association dans la réalisation de ses objectifs." },
    { key: 'citoyennete', image: '/images/citoyennete.png', titre: 'Citoyenneté', texte: "L’association considère les jeunes comme une force motrice du développement économique et social et renforce leur sentiment d’appartenance." },
    { key: 'formation', image: '/images/citoyennete.png', titre: 'Formation', texte: "Renforcer les compétences des jeunes via des projets au service de la nation, favorisant une citoyenneté active." },
  ];

  const membres = [
    { id: 'amineMoutassim', image: '/images/image16.png', nom: 'Amine Moutassim', statut: 'Directeur Opérationnel', telephone: '0671 710 091', email: 'fatima.bennani@example.com' },
    { id: 'sanaaBouadel', image: '/images/image17.png', nom: 'Sanaa Bouadel', statut: 'Assistante administrative', telephone: '0671 711 080', email: 'contact@eerchad.ma' },
    { id: 'khadijaKurdawi', image: '/images/image18.png', nom: 'Khadija Kurdawi', statut: 'Adjointe administrative', telephone: '0671 711 940', email: 'assistante.eerchad@gmail.com' },
    { id: 'abdulRazzaqArbah', image: '/images/image19.png', nom: 'Abdul Razzaq Arbah', statut: 'Employé administratif', telephone: '0671 710 091', email: 'assistant.eerchad@gmail.com' },
    { id: 'zahraBalasi', image: '/images/image20.png', nom: 'Zahra Balasi', statut: 'Coordinatrice du projet', telephone: '0671 710 091', email: 'Coordination.eerchad@gmail.com' },
    { id: 'sihamGhazali', image: '/images/image21.png', nom: 'Siham Ghazali', statut: 'Coordinatrice du projet', telephone: '0671 710 098', email: 'coordinatrice.eerchad@example.com' },
    { id: 'shaimaAttar', image: '/images/image22.png', nom: 'Shaima Attar', statut: 'Consultante en orientation et en conseil', telephone: '0671 710 052', email: 'Conseillère.eerchad@example.com' },
    { id: 'ayyoubLaghlali', image: '/images/image23.png', nom: 'Ayyoub Laghlali', statut: 'Formateur et superviseur en soft skills', telephone: '0671 710 000', email: 'formateur.eerchad@example.com' },
    { id: 'muhammadAminAbiAlSurur', image: '/images/image24.png', nom: 'Muhammad Amin Abi Al-Surur', statut: 'Responsable du suivi sur le terrain', telephone: '0671 464 664', email: 'accompagnateur.eerchad@example.com' },
    { id: 'hanaDahman', image: '/images/image25.png', nom: 'Hana Dahman', statut: "Formatrice dans le domaine de l'entreprenariat", telephone: '0671 710 093', email: 'Formateuse.eerchad@example.com' },
    { id: 'yousraHashoum', image: '/images/image26.png', nom: 'Yousra Hashoum', statut: 'Responsable du suivi Administratif', telephone: '0671 710 058', email: 'Accompagnatrice.eerchad@example.com' },
    { id: 'mohsenHaimoud', image: '/images/image27.png', nom: 'Mohsen Haimoud', statut: 'Conseiller en orientation', telephone: '0671 707 272', email: 'Conseiller.eerchad@example.com' },
  ];
// Données pour l'organigramme au format hiérarchique
  const orgChartData = {
    id: 'hassanRezzak',
    name: 'Hassan Rezzak',
    role: 'رئيس الجمعية',
    children: [
      {
        id: 'abdelwahabKaroumi',
        name: 'Abdelwahab Karoumi',
        role: 'Trésorier',
        children: [
          {
            id: 'hajarElRajhi',
            name: 'Hajar El Rajhi',
            role: 'Vice-trésorière'
          }
        ]
      },
      {
        id: 'saidHamdoun',
        name: 'Said Hamdoun',
        role: 'Secrétaire général',
        children: [
          {
            id: 'chaimaaMeziane',
            name: 'Chaimaa Meziane',
            role: 'Vice-secrétaire générale'
          }
        ]
      },
      {
        id: 'mohamedElGhazouani',
        name: 'Mohamed El Ghazouani',
        role: 'Vice-président informatique'
      },
      {
        id: 'moulayYoussef',
        name: 'Moulay Youssef El Haafdissi',
        role: 'Vice-président économie sociale'
      },
      {
        id: 'sanaeElFilali',
        name: 'Sanae El Filali',
        role: 'Vice-présidente innovation sociale'
      }
    ]
  };

  const faq = [
    { q: "Comment puis-je rejoindre l'association ?", r: "Vous pouvez nous contacter via le formulaire de contact ou venir directement à notre siège à Moulay Rachid – Sidi Othmane." },
    { q: "Est-ce que vous accompagnez les jeunes porteurs de projets ?", r: "Oui, nos plateformes Irchad offrent un accompagnement personnalisé pour structurer, financer et lancer les projets des jeunes." },
    { q: "Les formations sont-elles gratuites ?", r: "Toutes nos formations proposées sont gratuites grâce au soutien de nos partenaires institutionnels." },
    { q: "Puis-je bénéficier d'un financement pour mon projet ?", r: "Oui, certains projets peuvent bénéficier de soutien financier après évaluation, notamment dans le cadre de l'INDH." },
    { q: "Quels types de projets soutenez-vous ?", r: "Nous soutenons principalement les projets à fort impact social ou économique : coopératives, auto-entreprenariat, initiatives communautaires." },
    { q: "Qui peut bénéficier de vos services ?", r: "Tout jeune âgé de 18 à 45 ans, résidant dans la région de Moulay Rachid – Sidi Othmane, ayant une idée ou un projet à développer." },
    { q: "Comment se déroule l'accompagnement ?", r: "Après une première rencontre, nous établissons un plan d'accompagnement qui inclut des formations, des sessions de coaching, et un suivi personnalisé." },
  ];

  return (
    <>
      {/* Objectifs */}
      <section className="bg-white py-20 px-6">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-16 text-center leading-tight max-w-4xl mx-auto">
          Objectifs de l'Association Najm
        </h2>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch gap-12">
          <div className="md:w-1/2 text-gray-800 bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-[18px] leading-relaxed space-y-6 text-justify">
              {[1, 2, 3, 4].map((i) => (
                <p key={i} className="text-gray-700">
                  {[
                    "L'Association Najm aspire à faire de la plateforme Irchad une référence de premier plan en matière d'inclusion économique des jeunes, tout en s'inscrivant dans l'esprit de l'Initiative Nationale pour le Développement Humain.",
                    "L'association vise à faire de cette plateforme un espace de convergence pour les différents programmes destinés à la jeunesse, en vue d'en faire un modèle offrant informations et orientation, répondant ainsi aux aspirations des jeunes et contribuant à la réalisation de leurs ambitions.",
                    "Elle se concentre sur la création d'un environnement de travail propice à l'inclusion économique des jeunes, en concluant des accords et des partenariats avec des institutions et organismes nationaux et internationaux issus des secteurs académique, économique et de la société civile.",
                    "L'association adopte une bonne gouvernance fondée sur la compétence, en mettant en place des mécanismes transparents et souples de prise de décision, incluant l'élaboration d'un manuel de procédures complet pour les opérations administratives et financières, dans le but d'obtenir le statut d'utilité publique et de renforcer la confiance dans son action.",
                  ][i - 1]}
                </p>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col gap-8">
            <img src="/images/image30.jpg" alt="Objectif 1" className="rounded-2xl shadow-lg w-full h-[400px] object-cover hover:shadow-xl transition-shadow duration-300" />
            <img src="/images/image32.jpg" alt="Objectif 2" className="rounded-2xl shadow-lg w-full h-[400px] object-cover hover:shadow-xl transition-shadow duration-300" />
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-10 px-6 bg-gray-100 mx-6 rounded-lg">
        <h2 className="text-center text-4xl font-bold text-blue-900 mb-12 leading-tight">
          Valeurs et Principes de l'Association
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
          {valeursData.map((valeur, index) => (
            <div key={index} className="group perspective w-[340px] h-[380px] cursor-pointer">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                <div className="absolute w-full h-full bg-[#1C398E] text-white rounded-xl shadow-xl px-8 py-12 flex flex-col items-center justify-center backface-hidden">
                  <img
                    src={valeur.image}
                    alt={valeur.titre}
                    className="w-24 h-24 rounded-full bg-white p-2 mb-6 shadow-lg object-cover"
                  />
                  <h3 className="text-3xl font-semibold text-center tracking-wide">{valeur.titre}</h3>
                </div>
                <div className="absolute w-full h-full bg-white text-gray-800 rounded-xl shadow-xl p-8 rotate-y-180 backface-hidden overflow-auto flex items-center justify-center">
                  <p className="text-[18px] leading-relaxed text-justify">{valeur.texte}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision stratégique */}
      <section className="bg-white py-14 px-8">
        <div className="max-w-full mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
          <div className="md:col-span-3 flex flex-col pr-6">
            <h2 className="text-[26px] font-extrabold text-[#1C398E] mb-5 text-center md:text-left">
              Vision stratégique de l'Association
            </h2>
            <div className="text-[16px] leading-relaxed space-y-3 text-justify">
              <p className="mb-4">L'Association Najm pour l'inclusion économique des jeunes vise à :</p>
              <ul className="space-y-2 list-disc pl-4">
                {[
                  "Autonomiser les jeunes : en développant leurs compétences pour favoriser leur intégration dans le marché du travail.",
                  "Valoriser les talents : identifier les potentiels cachés des jeunes et les faire émerger.",
                  "Améliorer l'employabilité : offrir des formations efficaces pour augmenter les chances d'embauche.",
                  "Soutenir l'entreprenariat : accompagner les jeunes porteurs de projets avec appui technique et financier.",
                  "Encourager l'économie sociale : promouvoir les initiatives coopératives locales durables.",
                  "Développer les partenariats : créer des réseaux avec les secteurs public, privé et associatif.",
                  "Renforcer la citoyenneté : diffuser les valeurs de volontariat et d'engagement communautaire.",
                  "Contribuer au développement durable : stimuler la créativité des jeunes pour des projets responsables.",
                ].map((item, i) => (
                  <li key={i} className="text-[16px] leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col gap-4 pl-2">
            <img src="/images/image33.jpg" alt="Vision 1" className="rounded-xl shadow-lg object-cover w-full h-[200px]" />
            <img src="/images/image34.jpg" alt="Vision 2" className="rounded-xl shadow-lg object-cover w-full h-[200px]" />
          </div>
        </div>
      </section>

      {/* Organigramme avec OrgChart */}
      <OrgChart data={orgChartData} />

      {/* Équipe - cartes compactes avec animations hover */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Découvrez notre équipe
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {membres.map((membre) => (
              <div
                key={membre.id}
                className="group relative bg-gradient-to-br from-slate-50 via-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-600 overflow-hidden cursor-pointer transform hover:scale-[1.02] border border-slate-200/50"
              >
                {/* État normal - Image seule agrandie */}
                <div className="group-hover:opacity-0 transition-opacity duration-600 h-72 flex items-center justify-center p-3">
                  <img
                    src={membre.image}
                    alt={membre.nom}
                    className="w-56 h-56 rounded-xl object-cover shadow-lg ring-2 ring-slate-200/50 transition-all duration-500"
                  />
                </div>

                {/* État hover - Informations complètes avec style professionnel */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-600 bg-gradient-to-br from-slate-800 via-slate-700 to-gray-800 text-white flex flex-col justify-center p-5">
                  <div className="text-center space-y-3">
                    {/* Photo plus petite en haut */}
                    <div className="flex justify-center mb-3">
                      <img
                        src={membre.image}
                        alt={membre.nom}
                        className="w-16 h-16 rounded-full object-cover shadow-md ring-2 ring-white/20 transition-all duration-500"
                      />
                    </div>
                    
                    {/* Nom et poste */}
                    <div className="mb-4">
                      <h3 className="text-base font-bold text-white mb-1 leading-tight">{membre.nom}</h3>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed px-1">{membre.statut}</p>
                    </div>
                    
                    {/* Informations de contact */}
                    <div className="space-y-2 bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                      <div className="flex items-center justify-center text-xs text-slate-100">
                        <svg className="w-3 h-3 mr-2 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                        </svg>
                        <span className="font-medium">{membre.telephone}</span>
                      </div>
                      
                      <div className="flex items-center justify-center text-xs text-slate-100">
                        <svg className="w-3 h-3 mr-2 text-sky-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                        <span className="font-medium truncate">{membre.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="mt-16 mb-6 border-t pt-10 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 text-center mb-8">
          Foire aux questions (FAQ)
        </h2>
        <div className="space-y-4">
          {faq.map((item, i) => (
            <details key={i} className="group p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <summary className="cursor-pointer font-medium text-gray-800 group-open:text-indigo-700">
                {item.q}
              </summary>
              <p className="mt-2 text-gray-600">{item.r}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
