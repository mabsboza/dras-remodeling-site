import Image from 'next/image';
import WhyUs from './WhyUs';

const values = ['High-Quality Work', 'Transparent Approach', 'Local Specialists', 'Start to Finish Service'];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-[560px] card overflow-hidden"><Image src="/images/team/logo.png" alt="DRAS remodeling team" fill className="object-cover" /></div>
        <div>
          <p className="kicker">About Us</p>
          <h2 className="section-title mt-3">Quality & Experience You Can Trust</h2>
          <p className="mt-6 text-charcoal/70 leading-8">OdaraTrade Group helps homeowners upgrade their spaces with careful planning, clean communication and detailed finish work. The design is inspired by elegant neutral interiors, strong contrast and a premium gold accent.</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            {values.map((value) => <div key={value} className="border border-smoke p-5"><span className="text-gold text-2xl">✦✦✦✦✦</span><h3 className="font-display uppercase text-xl mt-2">{value}</h3><p className="text-sm text-charcoal/60 mt-2">Clear process, careful execution and professional results.</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
