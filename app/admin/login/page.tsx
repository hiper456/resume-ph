"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    router.push("/admin/payments");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold">
          Admin Login
        </h1>

        <p className="mt-2 text-gray-500">
          Enter your administrator password.
        </p>

        <form onSubmit={login} className="mt-8 space-y-5">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
          />

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-red-600">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-blue-700 py-3 font-bold text-white hover:bg-blue-800"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}