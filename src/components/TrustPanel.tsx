const items = [
  {
    icon:"shield",
    title:"Licensed",
    subtitle:"& Insured",
  },
  {
    icon:"receipt",
    title:"Transparent",
    subtitle:"Pricing",
  },
  {
    icon:"star",
    title:"5-Star",
    subtitle:"Client Reviews",
  },
  {
    icon:"clock",
    title:"On-Time &",
    subtitle:"On-Budget",
  },
];

export default function TrustPanel() {
  return (
    <section className="relative z-20 bg-white shadow-[0_8px_30px_rgba(0,0,0,.08)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4">

          {items.map((item, index) => (
            <div
              key={item.title}
              className={`
                flex items-center justify-center gap-6
                py-8
                ${index !== items.length - 1 ? "md:border-r md:border-zinc-200" : ""}
              `}
            >
              <TrustIcon type={item.icon} />

              <div>
                <div className="text-lg font-semibold text-[#111217]">
                  {item.title}
                </div>

                <div className="text-lg text-[#111217]">
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

function TrustIcon({ type }: { type: string }) {
  const className = "w-12 h-12 text-[#d4a64a]";

  // Licensed & Insured
  if (type === "shield") {
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 12l1.8 1.8L15 10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Transparent Pricing
  if (type === "receipt") {
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        viewBox="0 0 24 24"
      >
        <path
          d="M7 3l1.5 1.5L10 3l1.5 1.5L13 3l1.5 1.5L16 3v18l-2-1.5L12 21l-2-1.5L8 21l-1-1V3z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 9h6M9 13h4" />
      </svg>
    );
  }

  // Reviews
  if (type === "star") {
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 3l2.6 5.3 5.9.8-4.3 4.1 1 5.8L12 16.9 6.8 19l1-5.8L3.5 9.1l5.9-.8L12 3z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // On-Time & On-Budget
  if (type === "clock") {
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="8" />
        <path
          d="M12 8v4l3 2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return null;
}
