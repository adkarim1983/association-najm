'use client';

import Link from 'next/link';
// Using emoji icons instead of react-icons

export default function RecentItems({ recentProjects, recentContacts, recentUsers }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Recent Projects */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Projets récents
        </h3>
        <div className="space-y-4">
          {recentProjects && recentProjects.length > 0 ? (
            recentProjects.slice(0, 5).map((project) => (
              <div key={project._id} className="flex items-start space-x-3">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/projects/${project._id}`}
                    className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-1"
                  >
                    {project.title}
                  </Link>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-gray-400">📅</span>
                    <span className="text-xs text-gray-500">
                      {formatDate(project.createdAt)}
                    </span>
                    <span className="text-gray-400 ml-2">👁️</span>
                    <span className="text-xs text-gray-500">
                      {project.views || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Aucun projet récent</p>
          )}
        </div>
        <div className="mt-4">
          <Link
            href="/admin/projects"
            className="text-sm text-blue-600 hover:underline"
          >
            Voir tous les projets →
          </Link>
        </div>
      </div>

      {/* Recent Contacts */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Messages récents
        </h3>
        <div className="space-y-4">
          {recentContacts && recentContacts.length > 0 ? (
            recentContacts.slice(0, 5).map((contact) => (
              <div key={contact._id} className="flex items-start space-x-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">
                    {contact.name}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {contact.subject}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-gray-400">✉️</span>
                    <span className="text-xs text-gray-500">
                      {contact.email}
                    </span>
                    <span className="text-gray-400 ml-2">📅</span>
                    <span className="text-xs text-gray-500">
                      {formatDate(contact.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Aucun message récent</p>
          )}
        </div>
        <div className="mt-4">
          <Link
            href="/admin/contacts"
            className="text-sm text-blue-600 hover:underline"
          >
            Voir tous les messages →
          </Link>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Utilisateurs récents
        </h3>
        <div className="space-y-4">
          {recentUsers && recentUsers.length > 0 ? (
            recentUsers.slice(0, 5).map((user) => (
              <div key={user._id} className="flex items-start space-x-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">
                    {user.name}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-gray-400">👤</span>
                    <span className="text-xs text-gray-500">
                      {user.role}
                    </span>
                    <span className="text-gray-400 ml-2">📅</span>
                    <span className="text-xs text-gray-500">
                      {formatDate(user.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Aucun utilisateur récent</p>
          )}
        </div>
        <div className="mt-4">
          <Link
            href="/admin/users"
            className="text-sm text-blue-600 hover:underline"
          >
            Voir tous les utilisateurs →
          </Link>
        </div>
      </div>
    </div>
  );
}
