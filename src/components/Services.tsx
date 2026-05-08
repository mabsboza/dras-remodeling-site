import Image from 'next/image';
import { services } from '@/lib/site';

export default function Services() {
  return (
    <section id="services" className="py-24 bg-paper">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center mb-14">
          <p className="kicker">Our Services</p>
          <h2 className="section-title mt-3">Transforming Homes With Excellence</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <article key={service.title} className="card group overflow-hidden">
              <div className="relative h-56 overflow-hidden"><Image src={service.image} alt={service.title} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover group-hover:scale-105 transition duration-500" /></div>
              <div className="p-6">
                <h3 className="font-display uppercase text-2xl text-charcoal">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-charcoal/65">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
