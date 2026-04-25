import Link from "next/link";
import { site } from "@/lib/site";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#101114] text-white/70 border-t border-white/10">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="
                font-display
                text-3xl
                text-white
                tracking-tight
              "
            >
              <span className="text-red-700">O</span>dara Trade Group
            </Link>

            <p className="mt-5 text-sm leading-7 text-white/60">
              Expert renovation and remodeling services with
              quality craftsmanship, clean design and reliable
              communication.
            </p>
          </div>


          {/* Pages */}
          <div>
            <h3 className="
              text-white
              font-bold
              uppercase
              text-xs
              tracking-[.25em]
            ">
              Pages
            </h3>

            <div className="mt-5 grid gap-3 text-sm">
              <Link href="/" className="hover:text-[#d4a64a] transition">
                Home
              </Link>

              <Link href="/about" className="hover:text-[#d4a64a] transition">
                About Us
              </Link>

              <Link href="/services" className="hover:text-[#d4a64a] transition">
                Services
              </Link>

              <Link href="/contact" className="hover:text-[#d4a64a] transition">
                Contact Us
              </Link>
            </div>
          </div>


          {/* Services */}
          <div>
            <h3 className="
              text-white
              font-bold
              uppercase
              text-xs
              tracking-[.25em]
            ">
              Services
            </h3>

            <p className="mt-5 text-sm leading-7 text-white/60">
              Kitchens, bathrooms, flooring,
              full home renovations,
              repairs, painting and finish work.
            </p>
          </div>


          {/* Contact */}
          <div>
            <h3 className="
              text-white
              font-bold
              uppercase
              text-xs
              tracking-[.25em]
            ">
              Contact
            </h3>

            <p className="mt-5 text-sm leading-7 text-white/60">
              {site.phone}
              <br />
              {site.email}
              <br />
              {site.address}
            </p>
          </div>

        </div>
      </div>


      {/* Social Band Center */}
      <div className="border-y border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8">

          <div className="flex flex-col items-center">
            <h4 className="
              text-white
              uppercase
              tracking-[.25em]
              text-xs
              font-bold
            ">
              Follow Us
            </h4>

            <div className="w-24 h-px bg-[#d4a64a] my-5" />

            <div className="flex items-center gap-8">
              <a
                href="https://www.facebook.com/yuimaginewemake"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-12 h-12
                  rounded-full
                  border border-white/20
                  flex items-center justify-center
                  hover:border-[#d4a64a]
                  hover:text-[#d4a64a]
                  transition
                "
              >
                <Facebook size={20} />
              </a>

              <a
                href="https://www.instagram.com/odaratradegroup/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-12 h-12
                  rounded-full
                  border border-white/20
                  flex items-center justify-center
                  hover:border-[#d4a64a]
                  hover:text-[#d4a64a]
                  transition
                "
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

        </div>
      </div>


      {/* Bottom Bar */}
      <div className="py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} O'Dara Trade Group —
        <a
          href="https://home-code-pearl.vercel.app/"
          target="_blank"
          className="ml-1 hover:text-white transition"
        >
          by HomeCode
        </a>
      </div>

    </footer>
  );
}
