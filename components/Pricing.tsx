"use client";

import { useState } from "react";

type PlanCode = "basic" | "professional" | "executive";

type Package = {
  name: string;
  code: PlanCode;
  price: string;
  amount: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  button: string;
};

const packages: Package[] = [
  {
    name: "Basic",
    code: "basic",
    price: "₱99",
    amount: 99,
    description: "Build first, pay before download.",
    features: ["Resume builder", "Basic template", "Resume score", "PDF download after payment"],
    button: "Start Basic",
  },
  {
    name: "Professional",
    code: "professional",
    price: "₱199",
    amount: 199,
    description: "Pay first, unlock AI resume tools.",
    features: ["Premium templates", "AI summary", "AI work experience", "Resume score"],
    highlighted: true,
    button: "Choose Professional",
  },
  {
    name: "Executive",
    code: "executive",
    price: "₱399",
    amount: 399,
    description: "Premium career toolkit.",
    features: ["Everything in Professional", "Cover letter", "ATS optimization", "Future job matching"],
    button: "Choose Executive",
  },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Package | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function openCheckout(plan: Package) {
    setError("");

    if (plan.code === "basic") {
      window.location.href = "/builder?plan=basic";
      return;
    }

    setSelectedPlan(plan);
  }

  async function handlePaidCheckout() {
    if (!selectedPlan) return;

    setError("");

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          planCode: selectedPlan.code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout.");
      }

      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="pricing" className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Pricing
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Choose the resume package that fits your job hunt
          </h2>

          <p className="mt-4 text-slate-300">
            Start simple with Basic, or unlock premium AI tools with Professional and Executive.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.code}
              className={`rounded-3xl border p-8 shadow-xl transition hover:-translate-y-1 ${
                pkg.highlighted
                  ? "border-cyan-400 bg-white text-slate-950"
                  : "border-white/10 bg-white/5 text-white"
              }`}
            >
              <h3 className="text-2xl font-bold">{pkg.name}</h3>

              <p className={`mt-3 text-sm ${pkg.highlighted ? "text-slate-600" : "text-slate-300"}`}>
                {pkg.description}
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-extrabold">{pkg.price}</span>
                <span className={pkg.highlighted ? "text-slate-500" : "text-slate-400"}>
                  one-time
                </span>
              </div>

              <ul className="mt-8 space-y-3 text-sm">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="text-cyan-400">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => openCheckout(pkg)}
                className={`mt-8 w-full rounded-2xl px-5 py-3 font-semibold transition ${
                  pkg.highlighted
                    ? "bg-slate-950 text-white hover:bg-slate-800"
                    : "bg-white text-slate-950 hover:bg-cyan-100"
                }`}
              >
                {pkg.button}
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-slate-950 shadow-2xl">
            <h3 className="text-2xl font-bold">
              Continue with {selectedPlan.name}
            </h3>

            <p className="mt-3 text-sm text-slate-600">
              Enter your email so we can connect your payment to your builder access.
            </p>

            <label className="mt-6 block text-sm font-semibold text-slate-700">
              Email address
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            />

            {error && (
              <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedPlan(null);
                  setEmail("");
                  setError("");
                }}
                className="w-1/2 rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePaidCheckout}
                disabled={loading}
                className="w-1/2 rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating..." : "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}