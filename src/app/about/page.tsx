import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import About from '@/components/About';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-16 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/about.svg')] bg-cover bg-center opacity-20" />
        <div className="relative mx-auto max-w-7xl px-5">
          <p className="kicker">About Us</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl uppercase max-w-3xl">Quality & Experience You Can Trust</h1>
          <p className="mt-6 max-w-2xl text-white/75">We help homeowners transform kitchens, bathrooms, floors and living spaces with reliable execution and a clean design process.</p>
        </div>
      </section>
      <About />
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 grid gap-10 md:grid-cols-3">
          {['Transparent Planning', 'Clean Execution', 'Final Detail'].map((item, index) => (
            <article key={item} className="card p-8">
              <span className="text-gold text-4xl font-display">0{index + 1}</span>
              <h2 className="mt-4 text-2xl font-display uppercase text-charcoal">{item}</h2>
              <p className="mt-3 text-sm text-neutral-600">Clear scope, organized work, and professional finish so the client always knows what is happening.</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-charcoal py-16 text-center text-white">
        <p className="kicker">Ready to transform your home?</p>
        <h2 className="mt-3 font-display text-4xl uppercase">Let’s plan your project</h2>
        <Link href="/contact" className="gold-btn mt-8">Request A Free Quote</Link>
      </section>
      <Footer />
    </main>
  );
}
