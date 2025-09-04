'use client';

// Using emoji icons instead of react-icons

export default function AdminStats({ stats }) {
  const statItems = [
    {
      title: 'Utilisateurs',
      value: stats?.users || 0,
      icon: <span className="text-3xl">👥</span>,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Projets',
      value: stats?.projects || 0,
      icon: <span className="text-3xl">📊</span>,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Messages',
      value: stats?.contacts || 0,
      icon: <span className="text-3xl">✉️</span>,
      color: 'bg-yellow-500',
      change: '+15%'
    },
    {
      title: 'Vues totales',
      value: stats?.totalViews || 0,
      icon: <span className="text-3xl">👁️</span>,
      color: 'bg-purple-500',
      change: '+23%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{item.title}</p>
              <p className="text-3xl font-bold text-gray-900">{item.value.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">{item.change} ce mois</p>
            </div>
            <div className={`${item.color} p-3 rounded-lg text-white`}>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
