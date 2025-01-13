import Hero from "@/components/website/Hero";
import Solutions from "@/components/website/Solutions/solutions";
import Partenaires from "@/components/website/Partenaires/partenaires";
import Showcase from "@/components/website/Showcase/showcase";
import About from "@/components/website/About/about";
import Statistiques from "@/components/website/Statistiques/statistiques";

export default async function Home() {
  return (
    <div>
      <Hero />
      <Solutions />
      <Showcase />
      <About />
      <Partenaires />
      <Statistiques />
    </div>
  );
}
