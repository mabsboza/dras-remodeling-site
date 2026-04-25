"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  "/images/hero/hero1.png",
  "/images/hero/hero2.png",
  "/images/hero/hero3.png",
];

const features = [
  {
    icon: "shield",
    title: "Licensed",
    subtitle: "& Insured",
  },
  {
    icon: "award",
    title: "Quality",
    subtitle: "Workmanship",
  },
  {
    icon: "users",
    title: "10+ Years",
    subtitle: "Experience",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent(current === 0 ? slides.length - 1 : current - 1);

  const nextSlide = () =>
    setCurrent((current + 1) % slides.length);

  return (
    <section
      id="home"
      className="relative min-h-[850px] pt-24 flex items-center overflow-hidden"
    >
      {/* Background Slider */}
      {slides.map((slide, index) => (
        <div
          key={slide}
          className={`
            absolute inset-0
            transition-opacity duration-[1800ms]
            ${index === current ? "opacity-100" : "opacity-0"}
          `}
        >
          <Image
            src={slide}
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative mx-auto max-w-7xl w-full px-6">
        <div className="grid lg:grid-cols-[1.05fr_.95fr] items-center">

          {/* Left Content */}
          <div className="text-white max-w-3xl">

            <p className="
              uppercase
              tracking-[.28em]
              font-semibold
              text-[#d4a64a]
              text-sm
              mb-5
            ">
              Expert Renovation & Remodeling Services
            </p>

            <h1 className="
              font-display
              uppercase
              leading-[0.92]
              tracking-tight
              text-6xl
              md:text-8xl
              font-black
              drop-shadow-2xl
            ">
              Building Your <br />
              Dream Space
            </h1>

            <p className="
              mt-7
              ml-12
              text-xl
              max-w-2xl
              text-white/90
              leading-relaxed
            ">
              Premium kitchens, bathrooms and complete home renovations
              delivered with craftsmanship, transparent pricing and trusted
              execution.
            </p>

            {/* Feature Bar */}
            <div className="
              mt-8
              inline-flex
              flex-wrap
              overflow-hidden
              bg-[#0d1015]/95
              border border-white/10
              shadow-[0_10px_35px_rgba(0,0,0,.45)]
            ">
              {features.map((item, index) => (
                <div
                  key={item.title}
                  className={`
                    flex items-center gap-4
                    px-6 py-5
                    ${index !== features.length - 1
                      ? "border-r border-white/10"
                      : ""}
                  `}
                >
                  <FeatureIcon type={item.icon} />

                  <div>
                    <div className="
                      uppercase
                      text-white
                      font-bold
                      text-lg
                      leading-none
                    ">
                      {item.title}
                    </div>

                    <div className="
                      mt-1
                      uppercase
                      text-[#d4a64a]
                      font-semibold
                      text-lg
                      leading-none
                    ">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-5">

              <a
                href="/services"
                className="
                  bg-[#d4a64a]
                  hover:bg-[#e0b35a]
                  text-black
                  font-black
                  uppercase
                  tracking-wide
                  px-10 py-5
                  flex items-center gap-4
                  transition
                "
              >
                Explore Services
                <span className="text-2xl">›</span>
              </a>

              <a
                href="#portfolio"
                className="
                  border border-white/40
                  text-white
                  uppercase
                  font-black
                  tracking-wide
                  px-10 py-5
                  flex items-center gap-4
                  hover:bg-white
                  hover:text-black
                  transition
                "
              >
                View Our Work
                <span className="text-2xl">›</span>
              </a>

            </div>
          </div>
        </div>


        {/* Slider Dots */}
        <div className="
          absolute
          bottom-10
          left-1/2
          -translate-x-1/2
          flex gap-4
        ">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`
                h-3 w-3 rounded-full transition
                ${current === i
                  ? "bg-[#d4a64a] scale-125"
                  : "bg-white/70"}
              `}
            />
          ))}
        </div>


        {/* Left Arrow */}
        {/* Left Arrow */}
        <button
          onClick={() =>
            setCurrent(
              current === 0
                ? slides.length - 1
                : current - 1
            )
          }
          className="
            absolute
            left-10
            md:left-1
            lg:left-1
            top-[52%]
            -translate-y-1/2
            w-16
            h-16
            bg-black/70
            backdrop-blur-sm
            border border-white/10
            text-white
            text-5xl
            flex items-center justify-center
            hover:bg-[#d4a64a]
            hover:text-black
            transition
            z-30
"
        >
          ‹
        </button>


        {/* Right Arrow */}
        <button
          onClick={() =>
            setCurrent(
              (current + 1) % slides.length
            )
          }
          className="
            absolute
            right-10
            md:right-16
            lg:right-20
            top-[52%]
            -translate-y-1/2
            w-16
            h-16
            bg-black/70
            backdrop-blur-sm
            border border-white/10
            text-white
            text-5xl
            flex items-center justify-center
            hover:bg-[#d4a64a]
            hover:text-black
            transition
            z-30
            "
        >
          ›
        </button>

      </div>
    </section>
  );
}


function FeatureIcon({ type }: { type: string }) {
  if (type === "shield") {
    return (
      <svg
        className="w-8 h-8 text-[#d4a64a]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "award") {
    return (
      <svg
        className="w-8 h-8 text-[#d4a64a]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M8 14l-2 6 6-3 6 3-2-6" />
      </svg>
    );
  }

  return (
    <svg
      className="w-8 h-8 text-[#d4a64a]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
    </svg>
  );
}