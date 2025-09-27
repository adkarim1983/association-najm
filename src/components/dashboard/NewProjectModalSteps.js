'use client';

import { useState } from 'react';

export default function NewProjectModalSteps({ isOpen, onClose, onProjectCreated }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    coordinates: { lat: '', lng: '' },
    address: '',
    description: '',
    contact: { phone: '', email: '', website: '' },
    hours: '',
    founder_info: '',
    presentation: '',
    support: '',
    products: '',
    partners: '',
    status: 'active',
    featured: false,
    tags: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  const categories = [
    'restauration',
    'marketing_digital',
    'evenementiel',
    'design',
    'audio_visuel'
  ];

  const locations = [
    'Annexe administrative de Sidi Othmane',
    'Zone industrielle Sidi Othmane',
    'Annexe administrative du quartier Moulay Rachid',
    'Zone industrielle Moulay Rachid',
    'Annexe administrative du quartier Sadri',
    'Annexe administrative du quartier Mabrouka',
    'Hay El Rajae',
    'Annexe administrative El Harouiyine'
  ];

  const steps = [
    {
      id: 1,
      title: "Informations de base",
      icon: "📝",
      description: "Nom, catégorie et localisation"
    },
    {
      id: 2,
      title: "Détails du projet",
      icon: "📋",
      description: "Description et informations détaillées"
    },
    {
      id: 3,
      title: "Images et finalisation",
      icon: "📸",
      description: "Upload d'images et options finales"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Minimal helper to refresh access token when expired
  const refreshToken = async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include'
      });
      
      if (!response.ok) {
        window.location.href = '/login';
        return null;
      }
      
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      window.location.href = '/login';
      return null;
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImage(true);
    
    for (const file of files) {
      try {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          alert(`Le fichier ${file.name} est trop volumineux. Taille maximale: 5MB`);
          continue;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert(`Le fichier ${file.name} n'est pas une image valide`);
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);

        let token = localStorage.getItem('najm_access_token');
        let response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        // If token expired, refresh and retry
        if (response.status === 401) {
          token = await refreshToken();
          if (!token) return;
          
          localStorage.setItem('najm_access_token', token);
          response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
          });
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de l\'upload');
        }

        const result = await response.json();
        // Ensure the image data has all required fields for the database
        const imageData = {
          url: result.file.url,
          filename: result.file.filename,
          size: file.size, // Add the original file size
          uploadedAt: new Date(),
          alt: result.file.filename || 'Image du projet',
          isMain: uploadedImages.length === 0 // First image is main
        };
        setUploadedImages(prev => {
          const newImages = [...prev, imageData];
          // Ensure only the first image is marked as main
          return newImages.map((img, index) => ({
            ...img,
            isMain: index === 0
          }));
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        alert(`Erreur lors de l'upload de ${file.name}: ${error.message}`);
      }
    }
    
    setUploadingImage(false);
    e.target.value = ''; // Reset input
  };

  const removeImage = (index) => {
    setUploadedImages(prev => {
      const newImages = prev.filter((_, i) => i !== index);
      // Ensure the first remaining image is marked as main
      return newImages.map((img, i) => ({
        ...img,
        isMain: i === 0
      }));
    });
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.name && formData.category && formData.location && 
               formData.coordinates.lat && formData.coordinates.lng && formData.address;
      case 2:
        return formData.description;
      case 3:
        return true; // Step 3 is optional (images and final options)
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      setError('');
    } else {
      setError('Veuillez remplir tous les champs obligatoires');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        images: uploadedImages
      };

      let token = localStorage.getItem('najm_access_token');
      let response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submitData)
      });

      // If token expired, refresh and retry
      if (response.status === 401) {
        token = await refreshToken();
        if (!token) return;
        
        localStorage.setItem('najm_access_token', token);
        response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(submitData)
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création');
      }

      const result = await response.json();
      onProjectCreated(result);
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        location: '',
        coordinates: { lat: '', lng: '' },
        address: '',
        description: '',
        contact: { phone: '', email: '', website: '' },
        hours: '',
        founder_info: '',
        presentation: '',
        support: '',
        products: '',
        partners: '',
        status: 'active',
        featured: false,
        tags: ''
      });
      setUploadedImages([]);
      setCurrentStep(1);
    } catch (error) {
      console.error('Error creating project:', error);
      setError(error.message || 'Une erreur est survenue lors de la création du projet');
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          {/* Step Circle */}
          <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
            currentStep >= step.id 
              ? 'bg-blue-600 border-blue-600 text-white' 
              : 'bg-white border-gray-300 text-gray-500'
          }`}>
            <span className="text-xl">{step.icon}</span>
            {currentStep > step.id && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Step Info */}
          <div className="ml-4 mr-8">
            <div className={`font-semibold ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'}`}>
              {step.title}
            </div>
            <div className="text-sm text-gray-400">{step.description}</div>
          </div>
          
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className={`w-16 h-0.5 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Informations de base</h3>
        <p className="text-gray-600">Commençons par les informations essentielles de votre projet</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom du projet *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Entrez le nom de votre projet"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catégorie *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Localisation *
          </label>
          <select
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="">Sélectionner une ville</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Statut
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
            <option value="pending">En attente</option>
          </select>
        </div>
      </div>

      {/* Coordonnées géographiques */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-4">📍 Coordonnées géographiques</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Latitude *
            </label>
            <input
              type="number"
              step="any"
              name="coordinates.lat"
              value={formData.coordinates.lat}
              onChange={handleInputChange}
              placeholder="Ex: 33.5731"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Longitude *
            </label>
            <input
              type="number"
              step="any"
              name="coordinates.lng"
              value={formData.coordinates.lng}
              onChange={handleInputChange}
              placeholder="Ex: -7.5898"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
        </div>
      </div>

      {/* Adresse */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adresse complète *
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Entrez l'adresse complète du projet"
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Détails du projet</h3>
        <p className="text-gray-600">Décrivez votre projet en détail</p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description du projet *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Décrivez votre projet, ses objectifs et sa mission..."
          required
        />
      </div>

      {/* Informations de contact */}
      <div className="bg-blue-50 p-6 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-4">📞 Informations de contact</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              name="contact.phone"
              value={formData.contact.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="+212 6 XX XX XX XX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="contact.email"
              value={formData.contact.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="contact@exemple.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site web
            </label>
            <input
              type="url"
              name="contact.website"
              value={formData.contact.website}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="https://www.exemple.com"
            />
          </div>
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Horaires d'ouverture
          </label>
          <input
            type="text"
            name="hours"
            value={formData.hours}
            onChange={handleInputChange}
            placeholder="Ex: Lun-Ven 9h-17h"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (séparés par des virgules)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="Ex: innovation, technologie, startup"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Informations détaillées */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Informations sur le fondateur
          </label>
          <textarea
            name="founder_info"
            value={formData.founder_info}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Parlez-nous du fondateur, de son parcours et de sa vision..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Présentation détaillée du projet
          </label>
          <textarea
            name="presentation"
            value={formData.presentation}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Présentez votre projet de manière détaillée..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Soutien reçu
          </label>
          <textarea
            name="support"
            value={formData.support}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Décrivez le soutien que vous avez reçu..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Produits et services
          </label>
          <textarea
            name="products"
            value={formData.products}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Listez vos produits et services..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Partenaires
          </label>
          <textarea
            name="partners"
            value={formData.partners}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Mentionnez vos partenaires et collaborateurs..."
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Images et finalisation</h3>
        <p className="text-gray-600">Ajoutez des images à votre projet et finalisez la création</p>
      </div>

      {/* Upload d'images amélioré */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-dashed border-blue-200">
        <div className="text-center">
          <h4 className="font-semibold text-gray-900 mb-4">📸 Images du projet</h4>
          
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploadingImage}
            className="hidden"
            id="image-upload"
          />
          
          <label
            htmlFor="image-upload"
            className="cursor-pointer inline-flex flex-col items-center justify-center p-8 bg-white rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-400 transition-all duration-200 hover:shadow-lg"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              {uploadingImage ? 'Upload en cours...' : 'Cliquez pour ajouter des images'}
            </p>
            <p className="text-gray-500 text-sm">
              Ou glissez-déposez vos fichiers ici
            </p>
            <p className="text-gray-400 text-xs mt-2">
              PNG, JPG, WebP • Jusqu'à 5MB par image
            </p>
          </label>

          {uploadingImage && (
            <div className="mt-4 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-blue-600">Upload en cours...</span>
            </div>
          )}
        </div>
      </div>

      {/* Images uploadées avec design amélioré */}
      {uploadedImages.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h5 className="font-semibold text-gray-900 mb-4">Images ajoutées ({uploadedImages.length})</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-xl overflow-hidden border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-200">
                  <img
                    src={image.url}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                >
                  ✕
                </button>
                
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    ⭐ Principal
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 <strong>Conseil :</strong> La première image sera utilisée comme image principale du projet.
            </p>
          </div>
        </div>
      )}

      {/* Options finales */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h5 className="font-semibold text-gray-900 mb-4">⚙️ Options du projet</h5>
        <div className="flex items-center space-x-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-5 h-5"
            />
            <span className="ml-3 text-sm font-medium text-gray-700">
              ⭐ Mettre en avant ce projet
            </span>
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Les projets mis en avant apparaissent en premier dans les recherches
        </p>
      </div>

      {/* Résumé du projet */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
        <h5 className="font-semibold text-gray-900 mb-4">📋 Résumé de votre projet</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Nom:</span>
            <span className="ml-2 text-gray-900">{formData.name || 'Non renseigné'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Catégorie:</span>
            <span className="ml-2 text-gray-900">{formData.category || 'Non renseignée'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Localisation:</span>
            <span className="ml-2 text-gray-900">{formData.location || 'Non renseignée'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Images:</span>
            <span className="ml-2 text-gray-900">{uploadedImages.length} image(s)</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Créer un nouveau projet</h2>
              <p className="text-blue-100 mt-1">Étape {currentStep} sur 3</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Step Content */}
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Étape {currentStep} sur 3
            </div>
            
            <div className="flex space-x-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  ← Précédent
                </button>
              )}
              
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
              >
                Annuler
              </button>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg"
                >
                  Suivant →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-medium shadow-lg"
                >
                  {loading && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  )}
                  <span>🚀 {loading ? 'Publication...' : 'Publier le projet'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
