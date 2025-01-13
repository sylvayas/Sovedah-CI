import * as React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { partenaires } from "@/config/data";

export default function SolutionsCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-7xl mx-auto"
    >
      <CarouselContent>
        {partenaires.map((data, index) => (
          <CarouselItem
            key={index}
            className="sm:basis-1/2 relative lg:basis-1/4 sm:mx-2 lg:mx-1"
          >
            <div className="p-2"> {/* Augmenter le padding pour plus d'espace */}
              <Card className="group/solution_item">
                <CardContent className="flex relative w-full aspect-square items-center justify-center h-[250px] xl:h-[300px]"> {/* Réduire la hauteur */}
                  <CardHeader>
                    <div className="absolute bg-black/20 top-0 left-0 w-full h-full z-[1]"></div>
                    <Image
                      className="object-contain" // Changer de object-cover à object-contain pour mieux voir l'image
                      src={data.image || '/default-image.jpg'} // Image par défaut
                      alt={data.image || 'Image par défaut'} // Texte alternatif par défaut
                      fill
                      style={{ objectFit: 'contain' }} // Assurez-vous que l'image reste à l'intérieur du cadre
                    />
                  </CardHeader>
                  <div
                    className="absolute translate-y-1/2 bottom-0 w-full flex flex-col items-center justify-center
                                    gap-2 xl:gap-4 py-4 text-center z-10 group-hover/solution_item:translate-y-1 bg-transparent 
                                    group-hover/solution_item:bg-novis_green transition-all duration-500"
                  >
                    {/* Vous pouvez ajouter un contenu ici */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}