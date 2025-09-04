'use client';

import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer
      className="text-white py-10 px-6 transition duration-500 ease-in-out shadow-[inset_0_10px_15px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_#666666]"
      style={{ backgroundColor: '#1C398E' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + Description */}
        <div>
          <Image
            src="/images/logo2.png"
            alt="Logo Najm"
            width={160}
            height={64}
            className="h-24 w-auto mb-4"
          />
          <p className="text-base text-justify">
            L'Association Najm pour le développement culturel et éducatif œuvre à promouvoir l'engagement des jeunes à travers des actions citoyennes et éducatives.
          </p>
        </div>

        {/* Adresse */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-center md:text-left leading-tight">
            <FontAwesomeIcon icon={faLocationDot} className="text-red-500 mr-2" />
            Adresse
          </h3>
          <p className="text-base" dir="ltr">Groupe 3, en face de la Faculté des Lettres et des Sciences Humaines Ben M'sik,
Centre social et économique, Rue Rahmouni Boualam,
Casablanca.</p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-center md:text-left leading-tight">Contact</h3>
          <p className="text-base text-white">
            <FontAwesomeIcon icon={faPhoneVolume} className="text-green-500 mr-2" />
            <span dir="ltr">+212 661 680 893</span>
          </p>
          <p className="text-base">
            <FontAwesomeIcon icon={faPhoneVolume} className="text-green-500 mr-2" />
            <span dir="ltr">Fixe : 08 08 55 86 90 / 08 08 69 34 45</span>
          </p>
          <p className="text-base text-white">
            <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 mr-2" />
            <span dir="ltr">contact@eerchad.ma</span>
          </p>
          <p className="text-base mt-2">
            <FontAwesomeIcon icon={faLocationDot} className="text-red-500 mr-2" />
            Rue Mohamed Bouziane, près du Bureau d'Hygiène, Sidi Othmane
          </p>

          <div className="flex mt-4 space-x-4">
            <a href="https://www.facebook.com/" className="transition hover:scale-110 text-blue-600 hover:text-blue-500">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.instagram.com/" className="transition hover:scale-110 text-pink-500 hover:text-pink-400">
              <FaInstagram size={24} />
            </a>
            <a href="https://x.com/" className="transition hover:scale-110 text-blue-400 hover:text-blue-300">
              <FaTwitter size={24} />
            </a>
            <a href="https://fr.linkedin.com/" className="transition hover:scale-110 text-blue-700 hover:text-blue-600">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-white/30 pt-4 text-center text-base">
        © {new Date().getFullYear()} Association Najm. Tous droits réservés.
      </div>
    </footer>
  );
}
