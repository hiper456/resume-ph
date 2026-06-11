"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentActions({
  paymentId,
}: {
  paymentId: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function updatePayment(action: "approve" | "reject") {
    const confirmed = window.confirm(
      action === "approve"
        ? "Approve this payment and unlock the resume?"
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
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Action failed.");
      }

      router.refresh();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
<button
  type="button"
  disabled={isLoading}
  onClick={() => updatePayment("approve")}
  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
>
  ✓ Approve Payment
</button>

<button
  type="button"
  disabled={isLoading}
  onClick={() => updatePayment("reject")}
  className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-2.5 font-semibold text-red-600 transition-all duration-200 hover:bg-red-50 hover:border-red-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
>
  ✕ Reject
</button>
    </div>
  );
}