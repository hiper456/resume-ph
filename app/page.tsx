import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ResumeBuilder from "../components/ResumeBuilder";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";



export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <Hero />

      <section id="resume-builder">
        <ResumeBuilder />
      </section>
      
      <HowItWorks />

      <section id="pricing">
        <Pricing />
      </section>

      <Footer />
    </main>
  );
}