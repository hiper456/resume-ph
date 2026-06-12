import { getPendingPayments } from "@/lib/payments/getPendingPayments";
import PaymentActions from "@/components/admin/PaymentActions";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default async function AdminPaymentsPage() {
  const payments = await getPendingPayments();

  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="mx-auto max-w-7xl">

  
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">Pending Payments</h1>
          </div>

          <AdminLogoutButton />
        </div>

        <p className="mt-2 text-gray-500">
          Review manual payment submissions.
        </p>

        <div className="mt-8 space-y-4">

          {payments.length === 0 && (

            <div className="rounded-xl bg-white p-10 text-center shadow">

              No pending payments.

            </div>

          )}

 {payments.map((payment: any) => (
  <div
    key={payment.id}
    className="rounded-xl bg-white p-6 shadow"
  >
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="font-bold">
          {payment.email}
        </h2>

        <p className="text-sm text-gray-500">
          {payment.payment_method}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Reference:
        </p>

        <p className="font-mono text-lg font-bold">
          {payment.reference_number}
        </p>
      </div>

      <div className="sm:text-right">
        <p className="text-3xl font-bold">
          ₱{payment.amount}
        </p>

        <p className="text-sm text-gray-500">
          {new Date(payment.created_at).toLocaleString()}
        </p>
      </div>
    </div>

    <PaymentActions
  paymentId={payment.id}
/>
  </div>
))}

        </div>

      </div>
    </main>
  );
}