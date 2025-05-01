import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Image from "next/image"
import {
  LucideIcon
} from "lucide-react";

import GridPattern from "@/components/magicui/grid-pattern";

const datas: ({
  image?: string;
  icon?: LucideIcon;
  type: string;
  title?: string;
  description?: string;
})[] = [
  {
    image: "/images/carrousel_images/general_trade (2).jpg",
    type: "image"
  },
  {
    title: "Commerce Général",
    description: "Accédez à une large gamme de produits et services grâce à notre réseau de partenaires fiables. Réduisez vos coûts et développez votre activité avec des solutions commerciales sur mesure.",
    icon: Icons.network,
    type: "text"
  },
  {
    image: "/images/carrousel_images/booking_ticket (2).jpg",
    type: "image"
  },
  {
    title: "Réservation de Billets",
    description: "Voyagez sans stress grâce à notre service de réservation rapide et sécurisé pour vos vols nationaux et internationaux. Gagnez du temps et partez en toute tranquillité.",
    icon: Icons.plane,
    type: "text"
  },
  {
    image: "/images/carrousel_images/cars_key.jpg",
    type: "image"
  },
  {
    title: "Location de Voiture",
    description: "Profitez d'une flotte de véhicules confortables et adaptés à vos besoins, avec des options flexibles pour tous vos déplacements professionnels ou personnels.",
    icon: Icons.car,
    type: "text"
  },
  {
    image: "/images/carrousel_images/un_concierge.jpg",
    type: "image"
  },
  {
    title: "Conciergerie Professionnelle",
    description: "Déléguez vos tâches logistiques et administratives à notre équipe de concierges. Concentrez-vous sur l’essentiel pendant que nous nous occupons du reste.",
    icon: Icons.laptop,
    type: "text"
  },
  {
    image: "/images/carrousel_images/influencer_happy.jpg",
    type: "image"
  }
  
  ]



export default function Services() {
  return (
    <div className="grid w-full md:grid-cols-3 md:grid-rows-3 gap-0">
      {datas.map((item) => {
        return item.type == "image" ? <div className="flex relative w-full aspect-square items-center justify-center h-[250px] sm:h-[350px] xl:h-[400px]">
          <Image className="object-cover" src={item.image!} alt={item.image!} fill />
        </div> :
          <div className="flex flex-col px-4 bg-novis_green text-white gap-2 relative w-full items-center justify-center py-4 min-h-[250px] xl:h-[400px]">
            {item.icon && <item.icon className="text-[#1A557A] size-12 md:size-20 mb-4" />}
            <h3 className="font-bold font-saudagar text-xl md:text-2xl">{item.title}</h3>
            <p className="text-center text-xs md:text-sm xl:w-3/4">{item.description}</p>
            <GridPattern
              squares={[
                [4, 4],
                [5, 1],
                [8, 2],
                [5, 3],
                [5, 5],
                [10, 10],
                [12, 15],
                [15, 10],
                [10, 15],
                [15, 10],
                [10, 15],
                [15, 10],
              ]}
              className={cn(
                "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
              )}
            />
          </div>
      })}
    </div>
  );
}
