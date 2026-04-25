import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { featuredProjects, services } from '@/lib/site';

const categories = Array.from(new Set(featuredProjects.map((project) => project.category)));

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-20 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.svg')] bg-cover bg-center opacity-25" />
        <div className="relative mx-auto max-w-7xl px-5">
          <p className="kicker">Services</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl uppercase max-w-4xl">Remodeling Services & Featured Projects</h1>
          <p className="mt-6 max-w-2xl text-white/75">Detailed service page with the most important project types divided by kitchens, bathrooms, flooring, full renovations and finishing work.</p>
        </div>
      </section>

      <section className="py-20 bg-[#f5f1ea]">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center max-w-3xl mx-auto">
            <p className="kicker">What We Do</p>
            <h2 className="section-title mt-3">Core Services</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {services.map((service) => (
              <article key={service.slug} className="card overflow-hidden group">
                <div className="relative h-48">
                  <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl uppercase text-charcoal">{service.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="kicker">Portfolio Details</p>
              <h2 className="section-title mt-3">10 Key Project Types</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => <span key={category} className="text-xs uppercase tracking-widest border border-smoke px-4 py-2 text-neutral-600">{category}</span>)}
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <article key={project.id} className="card grid md:grid-cols-[220px_1fr] overflow-hidden">
                <div className="relative min-h-64 md:min-h-full">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                  <span className="absolute left-4 top-4 bg-charcoal text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2">{project.category}</span>
                </div>
                <div className="p-7">
                  <p className="text-gold text-sm font-bold">Project #{project.id.toString().padStart(2, '0')}</p>
                  <h3 className="mt-2 font-display text-3xl uppercase text-charcoal">{project.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-neutral-600">{project.summary}</p>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {project.highlights.map((highlight) => (
                      <div key={highlight} className="bg-[#f5f1ea] px-4 py-3 text-xs font-bold uppercase tracking-wide text-neutral-700">{highlight}</div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-16 text-center text-white">
        <p className="kicker">Need an estimate?</p>
        <h2 className="mt-3 font-display text-4xl uppercase">Start with a free consultation</h2>
        <Link href="/contact" className="gold-btn mt-8">Contact Us</Link>
      </section>
      <Footer />
    </main>
  );
}
