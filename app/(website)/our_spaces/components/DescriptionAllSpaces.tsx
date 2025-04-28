"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  title: string;
  date?: string; // Rendu optionnel pour cohérence
  description: string | { intro: string; whyChoose: string[]; pricing: string[]; callToAction: string };
  src: string;
}

export default function DescriptionAllSpaces() {
  const [selectedImage, setSelectedImage] = useState<Product | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image: Product, index: number): void => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + allProducts.length) % allProducts.length;
    setSelectedImage(allProducts[newIndex]);
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % allProducts.length;
    setSelectedImage(allProducts[newIndex]);
    setCurrentIndex(newIndex);
  };

  const allProducts = [...hygieneProducts, ...babyProducts];

  // Helper function to render description in lightbox
  const renderDescription = (description: Product["description"]): string => {
    if (typeof description === "string") {
      return description;
    }
    return `${description.intro}\n\nPourquoi choisir ce produit ?\n${description.whyChoose
      .map((item) => `- ${item}`)
      .join("\n")}\n\nTarification:\n${description.pricing
      .map((item) => `- ${item}`)
      .join("\n")}\n\n${description.callToAction}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 py-12 md:px-6 md:py-24 flex-grow">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Galerie des produits</h1>
          <p className="text-muted-foreground md:text-xl max-w-[800px]">
            Découvrez notre gamme de produits d'hygiène et accessoires à travers notre galerie de photos.
          </p>
        </div>

        <Tabs defaultValue="all" className="mt-8">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="all">Quelques produits</TabsTrigger>
            <TabsTrigger value="hygiene">Produits Hygiéniques</TabsTrigger>
            <TabsTrigger value="baby">Accessoires</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
                  onClick={() => openLightbox(product, index)}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={product.src || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-3 text-white">
                        <h3 className="font-medium text-sm">{product.title}</h3>
                        {product.date && <p className="text-xs text-white/80">{product.date}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="hygiene" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {hygieneProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
                  onClick={() => openLightbox(product, index)}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={product.src || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-3 text-white">
                        <h3 className="font-medium text-sm">{product.title}</h3>
                        {product.date && <p className="text-xs text-white/80">{product.date}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="baby" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {babyProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
                  onClick={() => openLightbox(product, index)}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={product.src || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-3 text-white">
                        <h3 className="font-medium text-sm">{product.title}</h3>
                        {product.date && <p className="text-xs text-white/80">{product.date}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
            onClick={closeLightbox}
            aria-label="Fermer le lightbox"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            className="absolute left-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
            onClick={goToPrevious}
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.title}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white">
              <h3 className="font-bold">{selectedImage.title}</h3>
              {selectedImage.date && <p className="text-sm text-white/80">{selectedImage.date}</p>}
              <p className="mt-2 whitespace-pre-line">{renderDescription(selectedImage.description)}</p>
            </div>
          </div>
          <button
            className="absolute right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
            onClick={goToNext}
            aria-label="Image suivante"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}

// Sample data, categorized and with normalized descriptions
const hygieneProducts = [
  {
    id: "1",
    title: "Conforta Lingettes Bébé – Ultra Doux",
    date: "1 avril 2025",
    description: {
      intro:
        "Offrez à votre bébé une douceur inégalée avec les lingettes Conforta Ultra Doux. Spécialement conçues pour respecter la peau délicate des tout-petits, elles sont sans alcool, enrichies d’une texture spéciale nettoyante, et parfaitement adaptées pour une utilisation quotidienne, à la maison comme en déplacement.",
      whyChoose: [
        "Douceur extrême pour la peau sensible des bébés",
        "Sans alcool : zéro irritation, zéro risque",
        "54 lingettes par paquet : économique et durable",
        "Parfum léger et agréable",
        "Pratique pour le change, les mains, le visage ou les petites salissures",
      ],
      pricing: ["PU : 750 FCFA", "Prix revendeur à partir de 16 parquets : 650 FCFA"],
      callToAction:
        "Livraison rapide disponible à Abidjan et environs. Commandez dès maintenant via WhatsApp ou notre boutique en ligne. Vos lingettes préférées livrées directement chez vous !",
    },
    src: "/images/produits&details/papier hygienique pour enfant.jpg",
  },
  {
    id: "2",
    title: "Likas protect",
    date: "1 avril 2025",
    description: {
      intro: "Découvrez les couches Likas Protect, conçues pour un confort optimal et une protection longue durée.",
      whyChoose: ["Absorption supérieure pour une protection longue durée", "Matériaux doux pour la peau", "Confort garanti toute la journée"],
      pricing: ["PU : 5000 FCFA", "Prix revendeur à partir de 10 paquets : 4500 FCFA"],
      callToAction: "Commandez maintenant et profitez d'une livraison rapide à Abidjan !",
    },
    src: "/images/produits&details/lilas-couches-adultes-large-15-pieces.webp",
  },
  {
    id: "baby1",
    title: "Couche Bébé chou",
    date: "1 avril 2025",
    description: {
      intro: "Couches ultra-absorbantes pour bébés, offrant confort et protection.",
      whyChoose: ["Haute absorption", "Confortable pour les bébés", "Facile à utiliser"],
      pricing: ["PU : 6000 FCFA"],
      callToAction: "Commandez maintenant pour un confort optimal !",
    },
    src: "/images/produits&details/essuie-tout.jpg",
  },
  {
    id: "baby2",
    title: "Lingettes pour bébé",
    date: "1 avril 2025",
    description: {
      intro: "Lingettes douces et hypoallergéniques pour la peau sensible des bébés.",
      whyChoose: ["Hypoallergéniques", "Douces pour la peau", "Pratiques pour le voyage"],
      pricing: ["PU : 1000 FCFA"],
      callToAction: "Ajoutez-les à votre panier dès aujourd'hui !",
    },
    src: "/images/produits&details/conf_mat.jpeg",
  },
];

const babyProducts = [
  {
    id: "prod1",
    title: "Masque de sommeil",
    date: "1 avril 2025",
    description: {
      intro: "Masque de sommeil pour un voyage confortable.",
      whyChoose: ["Confortable", "Bloque la lumière", "Léger et portable"],
      pricing: ["PU : 2000 FCFA"],
      callToAction: "Commandez pour des voyages reposants !",
    },
    src: "/images/accessoire_voyage/Masque de sommeil occultant 2.avif",
  },
  {
    id: "prod2",
    title: "Valise cabine",
    date: "1 avril 2025",
    description: {
      intro: "Valise cabine pour voyages légers.",
      whyChoose: ["Compacte", "Robuste", "Facile à transporter"],
      pricing: ["PU : 25000 FCFA"],
      callToAction: "Parfait pour vos déplacements !",
    },
    src: "/images/accessoire_voyage/Valises cabine 2.jpg",
  },
  {
    id: "prod3",
    title: "Sac à dos",
    date: "1 avril 2025",
    description: {
      intro: "Sac à dos de voyage robuste.",
      whyChoose: ["Grande capacité", "Confortable à porter", "Résistant"],
      pricing: ["PU : 15000 FCFA"],
      callToAction: "Idéal pour les aventuriers !",
    },
    src: "/images/accessoire_voyage/Sacs à dos de voyage 3.webp",
  },
  {
    id: "prod4",
    title: "Coussin de voyage",
    date: "1 avril 2025",
    description: {
      intro: "Coussin de voyage ergonomique.",
      whyChoose: ["Soutien du cou", "Confortable", "Facile à transporter"],
      pricing: ["PU : 5000 FCFA"],
      callToAction: "Voyagez avec confort !",
    },
    src: "/images/accessoire_voyage/Coussin de voyage ergonomique 2.jpg",
  },
];