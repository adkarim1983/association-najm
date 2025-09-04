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
      const group = new L.featureGroup(
        projects.map(project => 
          L.marker([project.coordinates.lat, project.coordinates.lng])
        )
      );
      map.fitBounds(group.getBounds().pad(0.1));
    }
  }, [projects, map]);
  
  return null;
}

export default function ProjectMap({ projects, onProjectSelect }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  if (!mapLoaded) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Chargement de la carte...</div>
      </div>
    );
  }

  // Default center (Morocco)
  const defaultCenter = [31.7917, -7.0926];

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={defaultCenter}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapBounds projects={projects} />
        
        {projects.map((project) => (
          <Marker
            key={project._id}
            position={[project.coordinates.lat, project.coordinates.lng]}
            icon={projectIcon}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-64">
                <h3 className="font-bold text-lg mb-2 text-blue-900">
                  {project.name}
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold">📍 Adresse:</span>
                    <p className="text-gray-700">{project.address}</p>
                  </div>
                  <div>
                    <span className="font-semibold">📍 Localisation:</span>
                    <p className="text-gray-700">{project.location}</p>
                  </div>
                  <div>
                    <span className="font-semibold">🏷️ Catégorie:</span>
                    <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {project.category}
                    </span>
                  </div>
                  {project.contact?.phone && (
                    <div>
                      <span className="font-semibold">📞 Téléphone:</span>
                      <p className="text-gray-700">{project.contact.phone}</p>
                    </div>
                  )}
                  {project.contact?.email && (
                    <div>
                      <span className="font-semibold">✉️ Email:</span>
                      <p className="text-gray-700">{project.contact.email}</p>
                    </div>
                  )}
                  <div className="pt-2">
                    <button
                      onClick={() => onProjectSelect && onProjectSelect(project)}
                      className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Voir les détails
                    </button>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
