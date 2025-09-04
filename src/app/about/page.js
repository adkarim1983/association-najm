'use client';

import Navbar from '../../components/layout/Navbar';
import AboutUs from '../../components/sections/AboutUs';
import Footer from '../../components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}
