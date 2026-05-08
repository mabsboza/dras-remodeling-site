import Image from 'next/image';

const projects = [
  ['Custom Kitchens', '/images/portafolio/kitchen.webp'],
  ['Inlay Bathrooms', '/images/portafolio/baths.webp'],
  ['Belle & More', '/images/portafolio/homefull.webp'],
  ['Flooring & More', '/images/portafolio/flooring.webp'],
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-cream">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center mb-14"><p className="kicker">Portfolio</p><h2 className="section-title mt-3">Our Recent Remodeling Projects</h2></div>
        <div className="grid md:grid-cols-2 gap-7">
          {projects.map(([title,img]) => (
            <article key={title} className="card overflow-hidden">
              <div className="relative h-80"><Image src={img} alt={title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
              <div className="p-6 flex justify-between items-center"><h3 className="font-display uppercase text-2xl">{title}</h3><a href="#contact" className="text-gold text-xs font-bold uppercase">Get Quote →</a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
