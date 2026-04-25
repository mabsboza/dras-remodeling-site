import Link from "next/link";

const links = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Services", "/services"],
  ["Portfolio", "/services#projects"],
  ["Contact", "/contact"],
];

function BrandLogo() {
  return (
    <div className="flex flex-col leading-none scale-125 origin-left pl-10">

      <div className="flex items-end gap-1">
        <span
          className="
            font-display
            text-5xl
            font-black
            italic
            tracking-tight
            text-white
            drop-shadow-[0_0_14px_rgba(220,38,38,.8)]
          "
        >
          O&apos;
        </span>

        <span
          className="
            font-display
            text-5xl
            font-black
            italic
            tracking-tight
            bg-gradient-to-b
            from-white
            via-zinc-300
            to-zinc-600
            bg-clip-text
            text-transparent
          "
        >
          DARA
        </span>
      </div>

      <div className="-mt-2 flex items-center gap-3">
        <span className="h-[3px] w-10 bg-red-700" />

        <span
          className="
            text-sm
            font-bold
            tracking-[0.30em]
            text-zinc-200
          "
        >
          TRADE GROUP
        </span>

        <span className="h-[3px] w-10 bg-red-700" />
      </div>

      <div
        className="
          mt-2
          text-[10px]
          font-bold
          tracking-[0.28em]
          uppercase
          text-[#d4a64a]
        "
      >
        Remodeling & Renovation Experts
      </div>

    </div>
  );
}

export default function Navbar() {
  return (
    <header
      className="
        fixed
        top-0
        z-50
        w-full
        bg-[#08090c]/95
        backdrop-blur-md
        border-b
        border-red-900/40
        shadow-[0_2px_30px_rgba(120,20,15,.35)]
      "
    >
      <nav
        className="
          w-full
          pl-0
          pr-8
          h-24
          flex
          items-center
          justify-between
        "
      >

        {/* LOGO */}
        <Link
          href="/"
          className="
            group
            -ml-8
          "
        >
          <div
            className="
              rounded-md
              border
              border-red-900/50
              bg-gradient-to-r
              from-[#111217]
              to-[#1a0b0b]
              px-5
              py-3
              shadow-[0_0_25px_rgba(185,28,28,.35)]
              group-hover:shadow-[0_0_35px_rgba(212,166,74,.55)]
              transition
            "
          >
            <BrandLogo />
          </div>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="
                text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                text-zinc-200
                hover:text-[#d4a64a]
                transition
                relative
                after:absolute
                after:left-0
                after:-bottom-2
                after:h-[2px]
                after:w-0
                after:bg-[#d4a64a]
                hover:after:w-full
                after:transition-all
              "
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/contact"
          className="
            hidden
            sm:inline-flex
            bg-gradient-to-r
            from-[#c98d2d]
            to-[#e0b35a]
            px-7
            py-4
            text-xs
            font-black
            uppercase
            tracking-wide
            text-black
            rounded-sm
            hover:brightness-110
            hover:scale-105
            transition
          "
        >
          Get A Quote
        </Link>

      </nav>
    </header>
  );
}