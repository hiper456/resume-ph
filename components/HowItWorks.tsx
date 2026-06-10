export default function HowItWorks() {
  const steps = [
    {
      title: "1. Fill the Form",
      description:
        "Enter your work experience, education, skills, and target job title.",
    },
    {
      title: "2. Preview Your Resume",
      description:
        "Instantly see a clean, professional, ATS-friendly resume preview.",
    },
    {
      title: "3. Pay and Download",
      description:
        "Choose a package, pay securely, and download your PDF resume.",
    },
  ];

  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center text-4xl font-bold">How It Works</h2>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.title} className="rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold">{step.title}</h3>
            <p className="mt-4 text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}