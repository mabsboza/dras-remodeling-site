const items = [
  {
    icon:"document",
    title:"Transparent",
    subtitle:"Pricing",
  },
  {
    icon: "document",
    title: "Transparent",
    subtitle: "Pricing",
  },
  {
    icon:"star",
    title:"5-Star",
    subtitle:"Client Reviews",
   },
  {
    icon: "briefcase",
    title: "On-Time &",
    subtitle: "On-Budget",
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

  if (type === "person") {
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21a8 8 0 0116 0" />
      </svg>
    );
  }

  if (type === "document") {
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M6 3h9l3 3v15H6z" />
        <path d="M15 3v4h4" />
        <path d="M9 11h6M9 15h4" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-5" />
      </svg>
    );
  }

  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M9 6V4h6v2" />
      <rect x="4" y="6" width="16" height="14" rx="2" />
      <path d="M4 12h16" />
    </svg>
  );
}
