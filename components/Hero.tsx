"use client";

const benefits = [
  "ATS-Friendly Resume",
  "AI-Assisted Writing",
  "Multiple Work Experiences",
  "Professional PDF Export",
  "Auto-Saves Progress",
  "Mobile Friendly",
];

const steps = [
  {
    icon: "📝",
    title: "1. Fill in your details",
    description: "Enter your experience, education, and skills.",
  },
  {
    icon: "👀",
    title: "2. Preview instantly",
    description: "Watch your resume update live as you type.",
  },
  {
    icon: "📄",
    title: "3. Download PDF",
    description: "Pay only when you're ready to export.",
  },
];

const experiences = [
  {
    title: "Third Engineer",
    company: "The Best Shipping Co.",
    date: "2018 - Present",
  },
  {
    title: "Marine Engineer",
    company: "ABC Shipping Co.",
    date: "2015 - 2018",
  },
  {
    title: "Cadet Engineer",
    company: "AAA Manning Inc.",
    date: "2011 - 2015",
  },
];

const skills = [
  "Leadership",
  "Communication",
  "LNG Operations",
  "Engine Maintenance",
  "Safety Management",
  "Problem Solving",
];

const ctaButtonClass =
  "group inline-flex cursor-pointer items-center justify-center rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-blue-50 hover:shadow-2xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300";

const handleStart = () => {
  document.getElementById("resume-builder")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const handlePrice = () => {
  document.getElementById("pricing")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-indigo-900 text-white">
      <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur">
            🇵🇭 Built for Filipino Professionals
          </div>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            Build your professional resume in minutes.
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-9 text-blue-100">
            Get hired faster with an ATS-friendly resume built in under 5
            minutes. Preview instantly, auto-save your progress, and pay only
            when you're ready to download.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <button onClick={handleStart} className={ctaButtonClass}>
              🚀 Build My Resume Free
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            <button onClick={handlePrice} className={ctaButtonClass}>
              View Pricing
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          <p className="mt-4 text-sm text-blue-200">
            No account required • Unlimited preview • Pay only to download
          </p>

          <div className="mt-10 grid gap-3 text-base text-blue-100 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit}>✅ {benefit}</div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-white/10 p-6 backdrop-blur">
            <h3 className="mb-5 text-lg font-bold">
              Build your resume in 3 simple steps
            </h3>

            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <div key={step.title}>
                  <div className="mb-2 text-3xl">{step.icon}</div>
                  <p className="font-semibold">{step.title}</p>
                  <p className="mt-1 text-sm text-blue-100">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur">
            <div className="rounded-2xl bg-white p-8 text-gray-900 shadow-2xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-3xl font-bold sm:text-4xl">
                    Juan Dela Cruz
                  </h2>

                  <p className="mt-2 font-medium text-blue-700">
                    Third Engineer at The Best Shipping Co.
                  </p>

                  <p className="mt-3 text-sm text-gray-500">
                    juan@email.com · +63 912 345 6789 · Cebu City
                  </p>
                </div>

                <div className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                  ✓ ATS Ready
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                  Work Experience
                </h3>

                <div className="mt-4 space-y-4">
                  {experiences.map((experience) => (
                    <div
                      key={`${experience.title}-${experience.company}`}
                      className="rounded-lg border border-gray-100 bg-gray-50 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <p className="text-lg font-bold text-gray-900">
                        {experience.title}
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        {experience.company} · {experience.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                  Skills
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl bg-white px-6 py-4 text-center shadow-2xl sm:w-auto">
            <p className="text-2xl font-bold text-gray-900">⚡ 5 Minutes</p>
            <p className="text-sm text-gray-500">
              From blank page to professional resume
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}