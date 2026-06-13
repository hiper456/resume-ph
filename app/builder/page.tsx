import { Suspense } from "react";
import BuilderClient from "./BuilderClient";

export default function BuilderPage() {
  return (
    <Suspense fallback={<BuilderLoading />}>
      <BuilderClient />
    </Suspense>
  );
}

function BuilderLoading() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
        Loading builder...
      </div>
    </main>
  );
}