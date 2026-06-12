"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type PaymentDetails = {
  id: string;
  resume_id: string;
  email: string;
  amount: number;
  plan_code: string;
  status: string;
};

const PAYMENT_DETAILS = {
  accountName: "Your Account Name",
  mobileNumber: "09XX XXX XXXX",
};

function getPlanName(planCode?: string) {
  if (planCode === "professional") return "Professional Package";
  if (planCode === "executive") return "Executive Package";
  return "Basic Package";
}

export default function ManualPaymentClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");

  const [payment, setPayment] = useState<PaymentDetails | null>(null);
  const [loadingPayment, setLoadingPayment] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState("GCash");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    async function loadPayment() {
      if (!paymentId) {
        setMessage("Missing payment ID. Please return to the builder and try again.");
        setIsSuccess(false);
        setLoadingPayment(false);
        return;
      }

      try {
        const response = await fetch(`/api/payments/${paymentId}`);
        const result = await response.json();

        if (!response.ok) {
          setMessage(result.error || "Unable to load payment details.");
          setIsSuccess(false);
          return;
        }

        setPayment(result.payment);
      } catch {
        setMessage("Unable to load payment details.");
        setIsSuccess(false);
      } finally {
        setLoadingPayment(false);
      }
    }

    loadPayment();
  }, [paymentId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!paymentId) {
      setIsSuccess(false);
      setMessage("Missing payment ID. Please return to the builder and try again.");
      return;
    }

    if (!referenceNumber.trim()) {
      setIsSuccess(false);
      setMessage("Please enter your payment reference number.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");

      const response = await fetch("/api/payments/manual-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId,
          paymentMethod,
          referenceNumber: referenceNumber.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit payment reference.");
      }

      setIsSuccess(true);
      setMessage("Payment reference submitted. Redirecting to your download page...");
      setReferenceNumber("");

      setTimeout(() => {
        router.replace(`/payment/download/${paymentId}`);
      }, 1200);
    } catch (error) {
      setIsSuccess(false);
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const amountDisplay = loadingPayment ? "..." : payment?.amount ?? "...";
  const planName = getPlanName(payment?.plan_code);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_35%),linear-gradient(to_bottom,#f8fafc,#eef2ff)] px-4 py-6 text-slate-900 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-center sm:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200 backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            Secure manual verification
          </div>
        </div>

        <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-blue-950/10 ring-1 ring-slate-200 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950 p-6 text-white sm:p-8 lg:p-10">
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-100">
                Resume PH Checkout
              </p>

              <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Unlock your professional resume PDF
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-blue-100">
                Complete your one-time payment and submit your reference number
                so we can verify and unlock your download.
              </p>

              <div className="mt-8 rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur">
                <p className="text-sm font-medium text-blue-100">
                  {planName}
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <p className="text-6xl font-black tracking-tight">
                    ₱{amountDisplay}
                  </p>
                  <p className="mb-2 text-sm font-semibold text-blue-100">
                    one-time
                  </p>
                </div>

                <div className="mt-5 grid gap-2 text-sm text-blue-50">
                  <FeatureCheck text="PDF download access" />
                  <FeatureCheck text="No subscription or hidden fees" />
                  <FeatureCheck text="Manual payment verification" />
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                <CheckoutStep
                  number="1"
                  title="Send payment"
                  description={`Pay exactly ₱${amountDisplay} using your chosen method.`}
                  active
                />
                <CheckoutStep
                  number="2"
                  title="Submit reference"
                  description="Enter the reference number from your payment receipt."
                  active
                />
                <CheckoutStep
                  number="3"
                  title="PDF unlocked"
                  description="After approval, your resume PDF becomes available."
                />
              </div>
            </div>
          </section>

          <section className="p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                  Payment Details
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                  Send your payment
                </h2>
              </div>

              <div className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-100">
                ₱{amountDisplay}
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <div className="mt-5 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
                <InfoRow label="Package" value={planName} />
                <InfoRow label="Account Name" value={PAYMENT_DETAILS.accountName} />
                <InfoRow label="Mobile Number" value={PAYMENT_DETAILS.mobileNumber} />
                <InfoRow label="Amount" value={`₱${amountDisplay}`} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Payment Method
                </label>

                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="GCash">GCash</option>
                  <option value="Maya">Maya</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Reference Number
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="Example: 123456789012"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {message && (
                <div
                  className={`rounded-2xl p-4 text-sm font-medium leading-6 ${
                    isSuccess
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || loadingPayment || !payment}
                className="group w-full rounded-2xl bg-blue-700 px-5 py-3 text-base font-black text-white shadow-xl shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 active:translate-y-0 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:shadow-none"
              >
                {isSubmitting ? "Submitting..." : "I’ve Paid — Submit Reference"}
                {!isSubmitting && (
                  <span className="ml-1 inline-block transition group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs leading-5 text-slate-500">
              Having trouble? Contact support with your payment ID and receipt
              screenshot.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

function FeatureCheck({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-xs font-black text-emerald-950">
        ✓
      </span>
      <span>{text}</span>
    </div>
  );
}

function CheckoutStep({
  number,
  title,
  description,
  active = false,
}: {
  number: string;
  title: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 ring-1 ${
        active ? "bg-white/10 ring-white/15" : "bg-white/5 ring-white/10"
      }`}
    >
      <div className="flex gap-3">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${
            active ? "bg-white text-blue-800" : "bg-white/15 text-blue-100"
          }`}
        >
          {number}
        </span>

        <div>
          <p className="font-bold text-white">{title}</p>
          <p className="mt-1 text-sm leading-5 text-blue-100">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 px-4 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className="text-base font-black text-slate-950">{value}</span>
    </div>
  );
}