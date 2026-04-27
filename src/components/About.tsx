import Image from "next/image";
import WhyUs from "./WhyUs";

const values = [
  "High-Quality Work",
  "Transparent Approach",
  "Local Specialists",
  "Start to Finish Service",
];

export default function About() {
  return (
    <section id="about" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12">
        {/* Image */}
        <div
          className="
            relative
            h-[280px]
            sm:h-[380px]
            md:h-[460px]
            lg:h-[560px]
            w-full
            overflow-hidden
            rounded-xl
            bg-smoke
            shadow-xl
          "
        >
          <Image
            src="/images/team/logo.png"
            alt="Odara Trade Group remodeling team"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-6 sm:p-10 lg:p-14"
            priority
          />
        </div>

        {/* Content */}
        <div>
          <p className="kicker">About Us</p>

          <h2 className="section-title mt-3 text-3xl sm:text-4xl lg:text-5xl">
            Quality & Experience You Can Trust
          </h2>

          <p className="mt-5 sm:mt-6 text-charcoal/70 leading-7 sm:leading-8">
            Odara Trade Group helps homeowners upgrade their spaces with careful
            planning, clean communication and detailed finish work. The design is
            inspired by elegant neutral interiors, strong contrast and a premium
            gold accent.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value} className="border border-smoke p-5">
                <span className="text-gold text-xl sm:text-2xl">✦✦✦✦✦</span>

                <h3 className="mt-2 font-display text-lg sm:text-xl uppercase">
                  {value}
                </h3>

                <p className="mt-2 text-sm leading-6 text-charcoal/60">
                  Clear process, careful execution and professional results.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
