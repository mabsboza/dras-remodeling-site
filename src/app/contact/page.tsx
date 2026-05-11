import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

type PageProps = {
  searchParams?: Promise<{
    contact?: string;
  }>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const contactStatus = (await searchParams)?.contact;

  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-16 bg-charcoal text-white text-center">
        <p className="kicker">Contact Us</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl uppercase">Get In Touch</h1>
        <p className="mt-6 mx-auto max-w-2xl text-white/75">Tell us about your kitchen, bathroom, flooring or remodeling project and we’ll follow up with next steps.</p>
      </section>
      <Contact status={contactStatus === 'sent' || contactStatus === 'missing-env' ? contactStatus : undefined} />
      <Footer />
    </main>
  );
}
