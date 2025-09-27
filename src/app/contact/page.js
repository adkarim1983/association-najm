'use client';

import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useTranslation } from '../../hooks/useTranslation';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function ContactPage() {
  const { t } = useTranslation();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Get translated data
  const header = t('contact.header', { returnObjects: true }) || {};
  const form_data = t('contact.form', { returnObjects: true }) || {};
  const info = t('contact.info', { returnObjects: true }) || {};
  const hours = t('contact.hours', { returnObjects: true }) || {};

  const handleChange = (e) => {
    const { id, value } = e.target; 
    setForm((prev) => ({ ...prev, [id]: value }));
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Minimal front validation
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError(form_data.validation?.required || "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      setLoading(true);
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(form_data.validation?.success || "Message envoyé avec succès.");
      setForm({ name: "", email: "", subject: "", message: "", phone: "" });
    } catch (err) {
      setError(form_data.validation?.error || "Erreur lors de l'envoi du message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <section id="contact" className="py-10 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          {/* Décors */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#1C398E]/5 rounded-full opacity-70 -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#1C398E]/5 rounded-full opacity-70 -ml-20 -mb-20 blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(28,57,142,0.05)_1px,transparent_0)] bg-[length:40px_40px]"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-[#1C398E] font-medium uppercase tracking-wider text-sm">{header.badge}</span>
              <h2 className="text-[30px] font-bold text-[#1C398E] mt-3 mb-4">{header.title}</h2>
              <div className="w-20 h-1 bg-[#1C398E] mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 text-lg leading-relaxed">{header.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mt-12">
              {/* Formulaire */}
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <h3 className="text-[30px] font-bold text-[#1C398E] mb-8">{form_data.title}</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-100 text-sm">{error}</div>
                  )}
                  {success && (
                    <div className="p-3 rounded-xl bg-green-50 text-green-700 border border-green-100 text-sm">{success}</div>
                  )}

                  <div className="relative">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-sm uppercase tracking-wide">{form_data.fields?.name?.label}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#1C398E] focus:bg-white transition-all duration-300 placeholder-gray-400"
                      placeholder={form_data.fields?.name?.placeholder}
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm uppercase tracking-wide">{form_data.fields?.email?.label}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#1C398E] focus:bg-white transition-all duration-300 placeholder-gray-400"
                      placeholder={form_data.fields?.email?.placeholder}
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2 text-sm uppercase tracking-wide">{form_data.fields?.phone?.label}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#1C398E] focus:bg-white transition-all duration-300 placeholder-gray-400"
                      placeholder={form_data.fields?.phone?.placeholder}
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2 text-sm uppercase tracking-wide">{form_data.fields?.subject?.label}</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#1C398E] focus:bg-white transition-all duration-300 placeholder-gray-400"
                      placeholder={form_data.fields?.subject?.placeholder}
                      required
                      value={form.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2 text-sm uppercase tracking-wide">{form_data.fields?.message?.label}</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#1C398E] focus:bg-white transition-all duration-300 placeholder-gray-400 resize-none"
                      placeholder={form_data.fields?.message?.placeholder}
                      required
                      value={form.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1C398E] hover:bg-[#152a68] text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg mb-8 disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? form_data.submit?.loading : form_data.submit?.text}
                  </button>
                </form>

                {/* Réseaux sociaux */}
                <div className="border-t border-gray-100 pt-8">
                  <h4 className="text-xl font-bold text-[#1C398E] mb-6 text-center">{form_data.social?.title}</h4>
                  <div className="flex justify-center space-x-4">
                    <a 
                      href="https://www.facebook.com/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                    >
                      <FaFacebook size={20} />
                    </a>
                    <a 
                      href="https://www.instagram.com/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                    >
                      <FaInstagram size={20} />
                    </a>
                    <a 
                      href="https://x.com/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                    >
                      <FaTwitter size={20} />
                    </a>
                    <a 
                      href="https://fr.linkedin.com/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bloc droit */}
              <div className="space-y-8">
                {/* Informations de contact */}
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <h3 className="text-[30px] font-bold text-[#1C398E] mb-8">{info.title}</h3>
                  <div className="space-y-8">
                    {info.items?.map((item, index) => (
                      <div key={index} className="flex items-start p-4 rounded-2xl">
                        <div className="flex-shrink-0 bg-[#1C398E]/10 p-4 rounded-2xl mr-5">
                          <span className="w-7 h-7 text-[#1C398E]">{item.icon}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-[#1C398E] mb-1">{item.title}</h4>
                          <p className="text-gray-600 leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Heures d'ouverture */}
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <h3 className="text-[30px] font-bold text-[#1C398E] mb-8">{hours.title}</h3>
                  <ul className="space-y-6">
                    {hours.schedule?.map((schedule, index) => (
                      <li key={index} className={`flex justify-between items-center ${index < hours.schedule.length - 1 ? 'pb-6 border-b border-gray-100' : ''}`}>
                        <span className="text-gray-600 font-medium">{schedule.days}</span>
                        <span className="text-[#1C398E] font-bold bg-[#1C398E]/5 px-4 py-2 rounded-xl">{schedule.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
