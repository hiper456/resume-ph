"use client";

import { useState } from "react";

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <section id="builder" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold">
          Build Your Resume
        </h2>

        <p className="mt-3 text-center text-gray-600">
          Fill in your details and preview your resume instantly.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="space-y-5">
              <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full rounded-xl border p-4" />
              <input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full rounded-xl border p-4" />
              <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full rounded-xl border p-4" />
              <input name="location" placeholder="City / Province" value={formData.location} onChange={handleChange} className="w-full rounded-xl border p-4" />
              <input name="jobTitle" placeholder="Target Job Title" value={formData.jobTitle} onChange={handleChange} className="w-full rounded-xl border p-4" />

              <textarea name="summary" placeholder="Professional Summary" rows={4} value={formData.summary} onChange={handleChange} className="w-full rounded-xl border p-4" />
              <textarea name="experience" placeholder="Work Experience" rows={5} value={formData.experience} onChange={handleChange} className="w-full rounded-xl border p-4" />
              <textarea name="education" placeholder="Education" rows={3} value={formData.education} onChange={handleChange} className="w-full rounded-xl border p-4" />
              <textarea name="skills" placeholder="Skills" rows={3} value={formData.skills} onChange={handleChange} className="w-full rounded-xl border p-4" />

              <a
                href="#pricing"
                className="block w-full rounded-xl bg-blue-700 py-4 text-center font-bold text-white hover:bg-blue-800"
              >
                Continue to Pricing
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="rounded-xl border bg-white p-8">
              <h1 className="text-3xl font-bold">
                {formData.fullName || "Juan Dela Cruz"}
              </h1>

              <p className="mt-1 text-blue-700">
                {formData.jobTitle || "Customer Service Representative"}
              </p>

              <p className="mt-3 text-sm text-gray-600">
                {formData.email || "juan@email.com"} · {formData.phone || "+63 912 345 6789"} · {formData.location || "Cebu City"}
              </p>

              <Section title="Professional Summary" content={formData.summary || "Motivated professional with strong communication, organization, and problem-solving skills."} />

              <Section title="Work Experience" content={formData.experience || "Add your previous roles, responsibilities, and achievements here."} />

              <Section title="Education" content={formData.education || "Add your school, degree, and graduation year here."} />

              <Section title="Skills" content={formData.skills || "Customer service, Microsoft Office, Communication, Teamwork"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div className="mt-6">
      <h2 className="border-b pb-1 text-sm font-bold uppercase text-gray-700">
        {title}
      </h2>
      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-700">
        {content}
      </p>
    </div>
  );
}