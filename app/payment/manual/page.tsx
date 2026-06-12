import { Suspense } from "react";
import ManualPaymentClient from "./ManualPaymentClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading payment page...</div>}>
      <ManualPaymentClient />
    </Suspense>
  );
}