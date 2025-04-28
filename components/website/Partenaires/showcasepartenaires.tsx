import { ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Marquee from "@/components/magicui/marquee";

export interface ShowcaseCardProps {
  image: string;
}

const datas: ShowcaseCardProps[] = [
  {
    image: "/images/Partenaires/Kkiapay-logo.jpg",
  },
  {
    image: "/images/Partenaires/Logo Original.png",
  },
  {
    image: "/images/Partenaires/Amadeus-Logo-2.jpg",
  },
  
];

export function ShowcaseCard({
  image,
}: ShowcaseCardProps) {
  return (
    <div
      className="flex flex-col gap-2 group w-[200px] relative overflow-hidden cursor-pointer" // Ajuster la largeur
    >
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm h-[200px] w-[200px]"> {/* Cadre carré */}
        <Image
          src={image}
          alt="Partenaire"
          height={200} // Hauteur fixe de l'image
          width={200} // Largeur fixe de l'image
          className="object-cover h-full w-full" // Remplissage complet du cadre
        />
      </div>
    </div>
  );
}

export default function Showcase() {
  return (
    <section id="showcase" className="container py-14">
      <h2 className="text-[ #1A557A] mb-2 text-center font-medium text-2xl md:text-4xl tracking-tight font-saudagar">
        Nos Partenaires
      </h2>
      <h3 className="mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
        Ensemble, nous sommes plus forts. Découvrez les entreprises qui partagent notre engagement pour l&apos;innovation et l&apos;excellence.
      </h3>
      <div className="relative flex flex-col">
        <Marquee pauseOnHover className="max-w-screen [--duration:40s]">
          {datas.map((data, index) => (
            <ShowcaseCard 
              key={index}
              image={data.image}
            />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/12 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/12 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
}