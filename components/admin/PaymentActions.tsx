"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const plans = [
  {
    code: "basic",
    name: "Basic",
    price: "₱99",
    description: "PDF download",
  },
  {
    code: "professional",
    name: "Professional",
    price: "₱199",
    description: "AI + templates",
  },
  {
    code: "executive",
    name: "Executive",
    price: "₱399",
    description: "Everything unlocked",
  },
];

export default function PaymentActions({ paymentId }: { paymentId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [planCode, setPlanCode] = useState("basic");

  async function updatePayment(action: "approve" | "reject") {
    const confirmed = window.confirm(
      action === "approve"
        ? `Approve payment and assign ${planCode.toUpperCase()} plan?`
        : "Reject this payment?"
    );

    if (!confirmed) return;

    try {
      setIsLoading(true);

      const response = await fetch(`/api/admin/payments/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId,
          planCode,
        }),
      });

      const data = await response.json();
      alert(data.builderUrl);

      if (!response.ok) {
        throw new Error(data.error || "Action failed.");
      }

      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-6 border-t pt-6">
      <p className="mb-3 text-sm font-semibold text-slate-700">
        Assign Plan
      </p>

      <div className="grid gap-3 md:grid-cols-3">
        {plans.map((plan) => {
          const selected = planCode === plan.code;

          return (
            <button
              key={plan.code}
              type="button"
              disabled={isLoading}
              onClick={() => setPlanCode(plan.code)}
              className={`rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-bold">{plan.name}</p>
                {selected && <span className="text-emerald-600">✓</span>}
              </div>

              <p className="mt-1 text-2xl font-black">{plan.price}</p>
              <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => updatePayment("approve")}
          className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Approve"}
        </button>

        <button
          type="button"
          disabled={isLoading}
          onClick={() => updatePayment("reject")}
          className="rounded-xl border border-red-200 bg-white px-6 py-3 font-bold text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          Reject
        </button>
      </div>
    </div>
  );
}