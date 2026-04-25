const reasons = [
  {
    title: "Detailed Planning Process",
    text: "Every project starts with clear scope, timeline and execution planning."
  },
  {
    title: "Budget Reliability",
    text: "Accurate estimating and disciplined project management help avoid surprises."
  },
  {
    title: "Warranty-Backed Work",
    text: "We stand behind our workmanship and deliver peace of mind after completion."
  },
  {
    title: "Trusted By Homeowners",
    text: "Clients choose us for craftsmanship, transparency and dependable service."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#f8f7f3] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex items-center justify-center gap-6">
          <span className="hidden sm:block h-px w-32 bg-zinc-300" />

          <h2 className="font-display text-4xl md:text-5xl uppercase text-[#111217] text-center">
            Also Homeowners Choose Us
          </h2>

          <span className="hidden sm:block h-px w-32 bg-zinc-300" />
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#111217] text-[#d4a64a]">
                <span className="text-xl">✓</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#111217]">
                  {reason.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-600">
                  {reason.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}