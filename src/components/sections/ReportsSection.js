import React from 'react';
import Link from 'next/link';
const image1 = '/images/image1.jpg';
const image2 = '/images/image2.jpg';
const image3 = '/images/image3.jpg';

export default function ReportsSection() {
  const reports = [
    {
      image: image1,
      text: 'Rapport d\'Activités 2024',
      link: '/rapports/activites-2024',
    },
    {
      image: image2,
      text: 'Culture et Jeunesse',
      link: '/rapports/culture-et-jeunesse',
    },
    {
      image: image3,
      text: 'Solidarité et Développement',
      link: '/rapports/solidarite-developpement',
    },
  ];

  return (
    <section className="py-16 mx-2 sm:mx-4 md:mx-6 lg:m-[25px] rounded-2xl" style={{ backgroundColor: '#EFF6FF' }}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 relative">
        <h2 className="text-[30px] font-bold text-center text-blue-900 mb-12 leading-tight">
          Nos Rapports
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reports.map((report, index) => (
            <div key={index} className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <img
                src={report.image}
                alt={`Report ${index + 1}`}
                className="w-full h-72 object-cover"
              />
              <div className="p-4 sm:p-6 md:p-8">
                <p className="text-lg text-gray-700 mb-6">{report.text}</p>
                <Link
                  href={report.link}
                  className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
