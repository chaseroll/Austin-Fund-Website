import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Mission from "@/components/sections/Mission";
import Thesis from "@/components/sections/Thesis";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="bg-background">
      <Navigation />
      <Hero />
      <Mission />
      <Thesis />
      <Contact />
    </main>
  );
}
