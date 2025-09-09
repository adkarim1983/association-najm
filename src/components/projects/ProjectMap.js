'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon for projects
const projectIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to fit map bounds to markers
function MapBounds({ projects }) {
  const map = useMap();
  
  useEffect(() => {
    if (projects.length > 0) {
      const validProjects = projects.filter(project => project.coordinates && project.coordinates.lat && project.coordinates.lng);
      if (validProjects.length > 0) {
        const group = new L.featureGroup(
          validProjects.map(project => 
            L.marker([project.coordinates.lat, project.coordinates.lng])
          )
        );
        map.fitBounds(group.getBounds().pad(0.1));
      }
    }
  }, [projects, map]);
  
  return null;
}

export default function ProjectMap({ projects, onProjectSelect }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  console.log('ProjectMap rendered with projects:', projects.length);
  console.log('Projects data:', projects);

  if (!mapLoaded) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Chargement de la carte...</div>
      </div>
    );
  }

  // Filter valid projects
  const validProjects = projects.filter(project => project.coordinates && project.coordinates.lat && project.coordinates.lng);
  console.log('Valid projects for map:', validProjects.length);

  if (validProjects.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Aucun projet avec coordonnées valides trouvé</div>
      </div>
    );
  }

  // Default center (Morocco)
  const defaultCenter = [31.7917, -7.0926];

  return (
    <div className="w-full h-96 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 backdrop-blur-sm bg-gradient-to-br from-blue-50/30 to-purple-50/30 relative group">
      {/* Decorative elements */}
      <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-400/20 rounded-full blur-sm animate-pulse"></div>
      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-400/20 rounded-full blur-sm animate-pulse delay-300"></div>
      
      {/* Map container with enhanced styling */}
      <div className="relative h-full w-full rounded-3xl overflow-hidden">
        <MapContainer
          center={defaultCenter}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          className="z-0 rounded-3xl"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapBounds projects={validProjects} />
          
          {validProjects.map((project) => (
            <Marker
              key={project._id}
              position={[project.coordinates.lat, project.coordinates.lng]}
              icon={projectIcon}
            >
              <Popup className="custom-popup" maxWidth={280}>
                <div className="p-3 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/30">
                  {/* Project header - compact */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                      <img 
                        src={project.image || project.images?.[0]?.url || 'https://via.placeholder.com/32x32?text=📋'} 
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-blue-900 leading-tight truncate">
                        {project.name}
                      </h3>
                      <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Compact project details */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-600 text-sm flex-shrink-0">📍</span>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-gray-800">Lieu:</span>
                        <p className="text-gray-700 truncate">{project.location}</p>
                      </div>
                    </div>
                    
                    {project.address && (
                      <div className="flex items-start space-x-2">
                        <span className="text-green-600 text-sm flex-shrink-0">🏠</span>
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-gray-800">Adresse:</span>
                          <p className="text-gray-700 line-clamp-2 leading-tight">{project.address}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Compact contact */}
                    {project.contact?.phone && (
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 text-sm">📱</span>
                        <a href={`tel:${project.contact.phone}`} className="text-green-700 hover:text-green-800 font-medium text-xs truncate">
                          {project.contact.phone}
                        </a>
                      </div>
                    )}
                    
                    {project.contact?.email && (
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600 text-sm">📧</span>
                        <a href={`mailto:${project.contact.email}`} className="text-blue-700 hover:text-blue-800 font-medium text-xs truncate">
                          {project.contact.email}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  {/* Compact action button */}
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <button
                      onClick={() => onProjectSelect && onProjectSelect(project)}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-xs font-medium shadow-sm hover:shadow-md flex items-center justify-center space-x-1"
                    >
                      <span>Détails</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Overlay gradient for enhanced visual appeal */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none rounded-3xl"></div>
      </div>
      
      {/* Map controls overlay */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/30">
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium text-gray-700">{validProjects.length} projet{validProjects.length > 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  );
}
