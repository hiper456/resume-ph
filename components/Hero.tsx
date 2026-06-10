
export default function Hero() {
  return (

        <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white">
        <div className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-28">
          <div className="max-w-3xl">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              🇵🇭 Built for Filipino Professionals
            </span>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
              Create a Professional Resume in Minutes
            </h1>

            <p className="mt-6 text-xl leading-8 text-blue-100">
              Build an ATS-friendly resume with AI assistance. Preview for free
              and only pay when you're ready to download.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#builder"
                className="rounded-xl bg-white px-8 py-4 font-bold text-blue-700 transition hover:scale-105"
              >
                Build My Resume
              </a>

              <a
                href="#pricing"
                className="rounded-xl border border-white px-8 py-4 font-bold transition hover:bg-white hover:text-blue-700"
              >
                View Pricing
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 text-sm text-blue-100">
              <div>✅ ATS Friendly</div>
              <div>✅ AI Powered</div>
              <div>✅ Instant PDF</div>
              <div>✅ GCash Ready</div>
            </div>
          </div>
        </div>
      </section>
  
  );
}
