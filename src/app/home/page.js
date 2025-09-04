import Navbar from '../../components/layout/Navbar';
import PresidentMessage from '../../components/sections/PresidentMessage';
import Hero from '../../components/sections/Hero';
import Presentation from '../../components/sections/Presentation';
import ReportsSection from '../../components/sections/ReportsSection';
import NajmStatsSection from '../../components/sections/NajmStatsSection';
import Partners from '../../components/sections/Partners';
import Footer from '../../components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <PresidentMessage />
        <Hero />
        <Presentation />
        <ReportsSection />
        <NajmStatsSection />
        <Partners />
      </main>
      <Footer />
    </div>
  );
}
