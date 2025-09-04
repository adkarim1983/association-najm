'use client';

// Using emoji icons instead of react-icons

export default function Activities() {
  const activities = [
    {
      icon: <span className="text-4xl">🤝</span>,
      title: "Développement Économique",
      description: "Soutien aux entrepreneurs et création d'opportunités économiques durables pour les communautés locales."
    },
    {
      icon: <span className="text-4xl">🎓</span>,
      title: "Éducation et Formation",
      description: "Programmes de formation professionnelle et éducative pour développer les compétences et l'autonomie."
    },
    {
      icon: <span className="text-4xl">🌱</span>,
      title: "Environnement",
      description: "Projets écologiques et initiatives de développement durable pour préserver notre environnement."
    },
    {
      icon: <span className="text-4xl">👥</span>,
      title: "Action Sociale",
      description: "Programmes d'aide sociale et d'accompagnement pour les populations les plus vulnérables."
    }
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos Domaines d'Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous intervenons dans plusieurs secteurs clés pour maximiser notre impact social et économique
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="text-blue-600 mb-4 flex justify-center">
                {activity.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {activity.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/projects"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Voir tous nos projets
          </a>
        </div>
      </div>
    </section>
  );
}
