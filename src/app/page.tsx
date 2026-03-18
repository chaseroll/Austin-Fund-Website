import Navigation from "@/components/Navigation";
import GrainOverlay from "@/components/GrainOverlay";
import Hero from "@/components/sections/Hero";
import Mission from "@/components/sections/Mission";
import Thesis from "@/components/sections/Thesis";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <GrainOverlay />
      <Navigation />
      <Hero />
      <div
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/mesh-gradient.png')" }}
      >
        <Mission />
        <Thesis />
        <Contact />
      </div>
    </main>
  );
}
