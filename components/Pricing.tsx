"use client";

import { useEffect, useRef, useState } from "react";

export default function Pricing() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const packages = [
    {
      name: "Basic",
      price: "₱99",
      features: [
        "Professional resume PDF",
        "1 clean template",
        "Instant download",
      ],
      highlighted: false,
      button: "Choose Basic",
    },
    {
      name: "Pro",
      price: "₱199",
      features: [
        "Resume PDF",
        "Cover letter",
        "AI Professional Summary Improvement",
      ],
      highlighted: true,
      button: "Most Popular",
    },
    {
      name: "Premium",
      price: "₱399",
      features: [
        "Resume PDF",
        "Cover letter",
        "ATS optimization",
        "1 revision",
      ],
      highlighted: false,
      button: "Choose Premium",
    },
  ];

  return (
    <section ref={sectionRef} id="pricing" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold">Simple Pricing</h2>

        <p className="mt-3 text-center text-gray-600">
          Preview for free. Pay only when you are ready to download.
        </p>

        <div className="mt-16 grid items-stretch gap-8 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              style={{ transitionDelay: `${index * 150}ms` }}
              className={`relative flex min-h-[420px] flex-col rounded-2xl p-8 shadow transition-all duration-700 ease-out ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } ${
                pkg.highlighted
                  ? "bg-blue-700 text-white ring-4 ring-blue-200 md:-translate-y-4"
                  : "bg-white text-gray-900"
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-xs font-bold text-blue-700 shadow">
                  BEST VALUE
                </div>
              )}

              <h3 className="text-2xl font-bold">{pkg.name}</h3>

              <p className="mt-6 text-5xl font-bold">{pkg.price}</p>

              <ul className="mt-8 flex-1 space-y-3 text-sm">
                {pkg.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>

              <button
                className={`group mt-auto w-full cursor-pointer rounded-xl py-3 font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] active:scale-95 ${
                  pkg.highlighted
                    ? "bg-white text-blue-700 hover:bg-blue-50 hover:shadow-xl"
                    : "bg-blue-700 text-white hover:bg-blue-800 hover:shadow-xl"
                }`}
              >
                {pkg.button}
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}