"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";

export default function DescriptionAllSpaces({ galerie }: { galerie: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImageIndex(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    } else if (event.key === "ArrowRight") {
      setSelectedImageIndex((prev) => (prev !== null && prev < galerie.images.length - 1 ? prev + 1 : prev));
    } else if (event.key === "ArrowLeft") {
      setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    }
  };

  return (
    <section className="container mx-auto p-8">
      <div className="relative gap-8 items-center md:items-stretch py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 sm:py-16 lg:px-6">
        
        {/* Informations sur la galerie */}
        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-2xl md:text-4xl tracking-tight font-saudagar">
            {galerie.title}
          </h2>
          {galerie.description &&
            galerie.description.map((des: string, key: number) => (
              <p key={key} className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                {des}
              </p>
            ))}
        </div>

        {/* Tableau d'images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galerie.images && galerie.images.map((image: { src: string; width: number; height: number; }, index: number) => (
            <Card key={index} className="group/solution_item cursor-pointer" onClick={() => handleImageClick(index)}>
              <CardContent className="flex relative w-full h-64">
                <CardHeader className="w-full h-full overflow-hidden">
                  <Image
                    className="object-cover w-full h-full"
                    src={image.src}
                    alt={`Image de ${galerie.title} ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw"
                  />
                </CardHeader>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal d'image agrandie */}
      {isOpen && selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" 
          onClick={closeModal} 
          onKeyDown={handleKeyDown} 
          tabIndex={0}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-0 right-0 p-4 text-white" onClick={closeModal}>
              &times;
            </button>
            <Image
              className="object-contain"
              src={galerie.images[selectedImageIndex].src}
              alt="Image agrandie"
              width={800} // Ajuste la largeur selon tes besoins
              height={600} // Ajuste la hauteur selon tes besoins
            />
            {/* Navigation */}
            {selectedImageIndex > 0 && (
              <div 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4 text-white cursor-pointer" 
                onClick={() => setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
              >
                &#9664; {/* Flèche gauche */}
              </div>
            )}
            {selectedImageIndex < galerie.images.length - 1 && (
              <div 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4 text-white cursor-pointer" 
                onClick={() => setSelectedImageIndex((prev) => (prev !== null && prev < galerie.images.length - 1 ? prev + 1 : prev))}
              >
                &#9654; {/* Flèche droite */}
              </div>
            )}
          </div>
        </div>
      )}

      <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.1}
        duration={2}
        repeatDelay={1}
        className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] inset-x-0 w-full h-[100%]"
      />
    </section>
  );
}