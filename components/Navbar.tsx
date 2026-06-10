export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-blue-950 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-bold">
          Resume PH
        </a>

        <div className="flex gap-6">
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
        </div>
      </nav>
    </header>
  );
}