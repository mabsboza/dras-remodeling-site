import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import TrustPanel from '@/components/TrustPanel';
import WhyChooseUs from '@/components/WhyUs';
import Reviews from '@/components/Reviews';

type PageProps = {
  searchParams?: Promise<{
    contact?: string;
  }>;
};

export default async function Home({ searchParams }: PageProps) {
  const contactStatus = (await searchParams)?.contact;

  return (
    <main>
      <Navbar />
      <Hero />
      <TrustPanel />
      <Services />
      <About />
      <WhyChooseUs />
      <Portfolio />
      <Reviews />
      <Contact status={contactStatus === 'sent' || contactStatus === 'missing-env' || contactStatus === 'turnstile' ? contactStatus : undefined} />
      <Footer />
    </main>
  );
}
