import { site } from '@/lib/site';
import { FaWhatsapp } from 'react-icons/fa';

type ContactStatus = 'sent' | 'missing-env';

type ContactProps = {
  status?: ContactStatus;
};

export default function Contact({ status }: ContactProps) {
  return (
    <section id="contact" className="py-24 bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-[.8fr_1.2fr] gap-12">
        <div>
          <p className="kicker">Get In Touch</p>
          <h2 className="font-display text-5xl md:text-6xl uppercase mt-3">Ready To Transform Your Home?</h2>
          <p className="mt-6 text-white/70 leading-7">Send your project details and the team will contact you to schedule a consultation.</p>
          <div className="mt-8 space-y-4 text-xl text-white/80"><p>☎ {site.phone}</p><p>✉ {site.email}</p><p>⌖ {site.address}</p></div>
          <div className="mt-5 space-y-4">
          <a
            href="https://wa.me/16788328593"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-3
              rounded-full
              bg-[#25D366]
              px-7 py-3
              font-semibold
              text-white
              hover:scale-105
              transition
              shadow-lg
            "
          >
            <FaWhatsapp className="text-2xl" />
            Chat on WhatsApp
          </a>
            </div>
        </div>
        <form action="/api/contact" method="POST" className="bg-white text-charcoal p-8 shadow-soft grid gap-4">
          {status === 'sent' && (
            <div role="status" className="border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
              Your message was sent successfully. We will contact you soon.
            </div>
          )}
          {status === 'missing-env' && (
            <div role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
              We could not send your message right now. Please contact us by phone or WhatsApp.
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-4"><input required name="name" placeholder="Full Name" className="border border-smoke px-4 py-3"/><input required name="email" type="email" placeholder="Email" className="border border-smoke px-4 py-3"/></div>
          <input name="phone" placeholder="Phone" className="border border-smoke px-4 py-3"/>
          <select name="service" className="border border-smoke px-4 py-3"><option>Kitchen Remodeling</option><option>Bathroom Remodeling</option><option>Full Home Renovation</option><option>Flooring & More</option></select>
          <textarea required name="message" placeholder="Tell us about your project" rows={6} className="border border-smoke px-4 py-3" />
          <button className="gold-btn w-fit" type="submit">Request A Free Quote</button>
        </form>
      </div>
    </section>
  );
}
