"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Services", "/services"],
  ["Portfolio", "/services#projects"],
  ["Contact", "/contact"],
];

function BrandLogo() {
  return (
    <div className="flex flex-col leading-none scale-120 origin-left pl-4 md:pl-8">
      <div className="flex items-end gap-2">
        <span
          className="
            font-display
            text-5xl
            md:text-6xl
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
            text-4xl
            md:text-5xl
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

      <div className="-mt-2 flex items-center gap-2 md:gap-3">
        <span className="h-[3px] w-8 md:w-10 bg-red-700" />

        <span
          className="
            text-xs
            mt-1
            md:text-sm
            font-bold
            tracking-[0.25em]
            md:tracking-[0.30em]
            text-zinc-200
          "
        >
          TRADE GROUP
        </span>

        <span className="h-[3px] w-8 md:w-10 bg-red-700" />
      </div>

      <div
        className="
          mt-2
          text-[8px]
          md:text-[10px]
          font-bold
          tracking-[0.22em]
          md:tracking-[0.28em]
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
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

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
          px-4
          md:pl-0
          md:pr-8
          h-25
          md:h-25
          flex
          items-center
          justify-between
        "
      >
        {/* LOGO */}
        <Link href="/" onClick={closeMenu} className="group">
          <div
            className="
              rounded-md
              border
              border-red-900/50
              bg-gradient-to-r
              from-[#111217]
              to-[#1a0b0b]
              px-3
              py-3
              md:px-4
              md:py-3
              shadow-[0_0_25px_rgba(185,28,28,.35)]
              group-hover:shadow-[0_0_35px_rgba(212,166,74,.55)]
              transition
            "
          >
            <BrandLogo />
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
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

        {/* DESKTOP CTA */}
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

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            md:hidden
            inline-flex
            items-center
            justify-center
            rounded-md
            border
            border-red-900/50
            bg-[#111217]
            p-3
            text-white
            shadow-[0_0_20px_rgba(185,28,28,.3)]
          "
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>
      </nav>

      {/* OVERLAY */}
      {open && (
        <button
          type="button"
          onClick={closeMenu}
          className="
            fixed
            inset-0
            z-40
            bg-black/70
            backdrop-blur-sm
            md:hidden
          "
          aria-label="Close menu overlay"
        />
      )}

      {/* MOBILE SIDE MENU */}
      <aside
        className={`
          fixed
          top-0
          right-0
          z-50
          h-screen
          w-[82%]
          max-w-sm
          bg-[#08090c]
          border-l
          border-red-900/50
          shadow-[-10px_0_40px_rgba(0,0,0,.6)]
          transform
          transition-transform
          duration-300
          md:hidden
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between border-b border-red-900/40 px-6 py-5">
          <span className="text-sm font-black uppercase tracking-[0.25em] text-[#d4a64a]">
            Menu
          </span>

          <button
            type="button"
            onClick={closeMenu}
            className="
              rounded-md
              border
              border-red-900/50
              p-2
              text-white
              hover:text-[#d4a64a]
              transition
            "
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col px-6 py-8">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="
                border-b
                border-white/10
                py-5
                text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                text-zinc-200
                hover:text-[#d4a64a]
                transition
              "
            >
              {label}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={closeMenu}
            className="
              mt-8
              inline-flex
              justify-center
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
              transition
            "
          >
            Get A Quote
          </Link>
        </div>
      </aside>
    </header>
  );
}
