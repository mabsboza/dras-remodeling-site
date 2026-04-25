import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import TrustPanel from '@/components/TrustPanel';
import WhyChooseUs from '@/components/WhyUs';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustPanel />
      <Services />
      <About />
      <WhyChooseUs />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
}
