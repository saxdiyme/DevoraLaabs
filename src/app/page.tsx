import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import TechStack from "@/components/sections/TechStack";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
