import React from "react";
import HeroCarousel from "../ui/hero-carousel/hero-carousel";
import { cn } from "@/lib/utils";
import Link from "next/link"; // Assurez-vous d'importer Link
import { CalendarIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const images = [
  "/images/carrousel_images/reservation_billet.jpg",
  "/images/carrousel_images/commerce_general (2).jpg",
  "/images/carrousel_images/location_voiture (2).jpg",
  "/images/carrousel_images/conciergerie (2).jpg",
];

export default function Hero() {
  const item_bar = (
    <div className="w-full h-[2px] scale-x-0 bg-novis_green group-hover/service_item:scale-x-100 group-hover/service_item:bg-white transition-all duration-300"></div>
  );

  const item = (name: string, url: string) => {
    return (
      <Link href={url} className="relative group/service_item">
        <span className="font-merriweather text-xs sm:text-sm">{name}</span>
        {item_bar}
      </Link>
    );
  };

  return (
    <section className="relative p-2">
      <div className={cn("h-[60vh] md:h-[400px] xl:h-[500px] relative container px-0 max-w-[1400px]")}>
        <div className="absolute z-[3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center flex-col gap-8 max-w-5xl w-full">
          <h1 className="text-lg sm:text-xl md:text-4xl text-white text-center font-lora uppercase">
            Espaces de travail flexibles et économiques
          </h1>

          <div className="flex items-center justify-center text-white flex-wrap gap-2">
            {item("RESERVATION DE BILLET D'AVION", "/our_spaces/private_offices")}
            <span className="h-4 w-[2px] bg-white"></span>
            {item("COMMERCE GENERALE", "/our_spaces")}
            <span className="h-4 w-[2px] bg-white"></span>
            {item("LOCATION DE VOITURE", "/private_offices")}
            <span className="h-4 w-[2px] bg-white"></span>
            {item("CONCIERGERIE", "/contact_us")}
          </div>

          
        </div>
        <HeroCarousel images={images} />
      </div>
    </section>
  );
}