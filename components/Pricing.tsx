"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type PlanCode = "basic" | "professional" | "executive";

type PricingPackage = {
  name: string;
  code: PlanCode;
  price: string;
  features: string[];
  highlighted: boolean;
  button: string;
};



function createEmptyResumeData() {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    status: "draft",
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      linkedin: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    templateId: "basic",
  };
}

export default function Pricing() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<PlanCode | null>(null);
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

  const packages: PricingPackage[] = [
    {
      name: "Basic",
      code: "basic",
      price: "₱99",
      features: [
        "Professional resume PDF",
        "1 clean template",
        "No AI features",
      ],
      highlighted: false,
      button: "Choose Basic",
    },
    {
      name: "Professional",
      code: "professional",
      price: "₱199",
      features: [
        "Resume PDF",
        "AI summary improvement",
        "AI work experience improvement",
      ],
      highlighted: true,
      button: "Choose Professional",
    },
    {
      name: "Executive",
      code: "executive",
      price: "₱399",
      features: [
        "Resume PDF",
        "Cover letter",
        "ATS optimization",
        "1 revision",
      ],
      highlighted: false,
      button: "Choose Executive",
    },
  ];

  async function handleSelectPlan(planCode: PlanCode) {
    if (planCode === "basic") {
      router.push("/builder?plan=basic");
      return;
    }

    try {
      setCheckoutPlan(planCode);

      const response = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planCode,
          resumeData: createEmptyResumeData(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      if (!data.checkoutUrl) {
        throw new Error("Checkout URL was not returned.");
      }

      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error("PRICING CHECKOUT ERROR:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to start checkout. Please try again."
      );
    } finally {
      setCheckoutPlan(null);
    }
  }

  return (
    <section ref={sectionRef} id="pricing" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold">Simple Pricing</h2>

        <p className="mt-3 text-center text-gray-600">
          Start with Basic or unlock AI features with a paid plan.
        </p>

        <div className="mt-16 grid items-stretch gap-8 md:grid-cols-3">
          {packages.map((pkg, index) => {
            const isCheckingOut = checkoutPlan === pkg.code;

            return (
              <div
                key={pkg.code}
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
                  type="button"
                  onClick={() => handleSelectPlan(pkg.code)}
                  disabled={checkoutPlan !== null}
                  className={`group mt-auto w-full cursor-pointer rounded-xl py-3 font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 ${
                    pkg.highlighted
                      ? "bg-white text-blue-700 hover:bg-blue-50 hover:shadow-xl"
                      : "bg-blue-700 text-white hover:bg-blue-800 hover:shadow-xl"
                  }`}
                >
                  {isCheckingOut ? "Starting checkout..." : pkg.button}
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}