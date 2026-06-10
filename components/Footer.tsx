export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <div>
            <h3 className="text-xl font-bold">Resume PH</h3>
            <p className="mt-2 max-w-md text-sm text-blue-100">
              AI-powered resume builder for Filipino job seekers.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-blue-100">
            <a href="#how-it-works" className="hover:text-white">
              How It Works
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-blue-100">
          © 2026 Resume PH. All rights reserved.
        </div>
      </div>
    </footer>
  );
}