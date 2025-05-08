"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

interface Product {
  id: string;
  title: string;
  date?: string;
  description: string | { intro: string; whyChoose: string[]; pricing: string[]; callToAction: string };
  src: string;
}

// Données
const hygieneProducts: Product[] = [
  {
    id: "1",
    title: "Conforta Lingettes Bébé – Ultra Doux",
    date: "29 Mars 2025",
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
    id: "3",
    title: "Likas protect",
    date: "06 février 2025",
    description: {
      intro: "Découvrez les couches Likas Protect, conçues pour un confort optimal et une protection longue durée.",
      whyChoose: ["Absorption supérieure pour une protection longue durée", "Matériaux doux pour la peau", "Confort garanti toute la journée"],
      pricing: ["PU : 5000 FCFA", "Prix revendeur à partir de 10 paquets : 4500 FCFA"],
      callToAction: "Commandez maintenant et profitez d'une livraison rapide à Abidjan !",
    },
    src: "/images/produits&details/conf.jpeg",
  },
  {
    id: "4",
    title: "Likas protect",
    date: "12 janvier 2025",
    description: {
      intro: "Découvrez les couches Likas Protect, conçues pour un confort optimal et une protection longue durée.",
      whyChoose: ["Absorption supérieure pour une protection longue durée", "Matériaux doux pour la peau", "Confort garanti toute la journée"],
      pricing: ["PU : 5000 FCFA", "Prix revendeur à partir de 10 paquets : 4500 FCFA"],
      callToAction: "Commandez maintenant et profitez d'une livraison rapide à Abidjan !",
    },
    src: "/images/produits&details/hygienique.jpeg",
  },
];

const babyProducts: Product[] = [
  {
    id: "1",
    title: "Sac à dos",
    date: "12 mars 2024",
    description: {
      intro: "Sac à dos de voyage robuste.",
      whyChoose: ["Grande capacité", "Confortable à porter", "Résistant"],
      pricing: ["PU : 15000 FCFA"],
      callToAction: "Idéal pour les aventuriers !",
    },
    src: "/images/accessoire_voyage/Sacsàdosdevoyage.jpg",
  },
  {
    id: "2",
    title: "Coussin de voyage",
    date: "4 avril 2025",
    description: {
      intro: "Coussin de voyage ergonomique pour un confort optimal pendant vos déplacements.",
      whyChoose: ["Design ergonomique", "Léger et portable", "Tissu doux et lavable"],
      pricing: ["PU : 5000 FCFA"],
      callToAction: "Commandez maintenant pour voyager confortablement !",
    },
    src: "/images/accessoire_voyage/Coussin de voyage ergonomique 2.jpg",
  },
  {
    id: "3",
    title: "Casque musique",
    date: "1 mai 2025",
    description: {
      intro: "Coussin de voyage ergonomique pour un confort optimal pendant vos déplacements.",
      whyChoose: ["Design ergonomique", "Léger et portable", "Tissu doux et lavable"],
      pricing: ["PU : 5000 FCFA"],
      callToAction: "Commandez maintenant pour voyager confortablement !",
    },
    src: "/images/accessoire_voyage/casque_musique 2.jpg",
  },
  {
    id: "4",
    title: "un cadenas TSA ",
    date: "16 mars 2025",
    description: {
      intro: "Coussin de voyage ergonomique pour un confort optimal pendant vos déplacements.",
      whyChoose: ["Design ergonomique", "Léger et portable", "Tissu doux et lavable"],
      pricing: ["PU : 5000 FCFA"],
      callToAction: "Commandez maintenant pour voyager confortablement !",
    },
    src: "/images/accessoire_voyage/Un cadenas TSA.jpg",
  },
];

export default function DescriptionAllSpaces() {
  const [selectedImage, setSelectedImage] = useState<Product | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

  const openLightbox = (image: Product, index: number, products: Product[]): void => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setCurrentProducts(products);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentProducts([]);
  };

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + currentProducts.length) % currentProducts.length;
    setSelectedImage(currentProducts[newIndex]);
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % currentProducts.length;
    setSelectedImage(currentProducts[newIndex]);
    setCurrentIndex(newIndex);
  };

  const featuredProducts = hygieneProducts.filter(
    (product) => product.title === "Likas protect" || product.title === "Conforta Lingettes Bébé – Ultra Doux"
  );

  const getProductLink = (product: Product) => {
    if (hygieneProducts.includes(product)) {
      return "/our_offers/description";
    }
    return "/our_product/descriptionallspaceprod";
  };

  const renderDescription = (description: Product["description"]): string => {
    if (!description) {
      return "Aucune description disponible.";
    }
    if (typeof description === "string") {
      return description || "Aucune description disponible.";
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
            Découvrez notre gamme de produits d&apos;hygiène et accessoires à travers notre galerie de photos.
          </p>
        </div>

        <Tabs defaultValue="all" className="mt-8">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="all">Quelques produits</TabsTrigger>
            <TabsTrigger value="baby">Accessoires</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => openLightbox(product, index, featuredProducts)}
                  onKeyDown={(e) => e.key === "Enter" && openLightbox(product, index, featuredProducts)}
                  className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
                  aria-label={`Ouvrir les détails de ${product.title}`}
                >
                  <div className="relative aspect-square min-h-[200px]">
                    <Image
                      src={product.src || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={product.title === "Conforta Lingettes Bébé – Ultra Doux"}
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
                  role="button"
                  tabIndex={0}
                  onClick={() => openLightbox(product, index, babyProducts)}
                  onKeyDown={(e) => e.key === "Enter" && openLightbox(product, index, babyProducts)}
                  className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
                  aria-label={`Ouvrir les détails de ${product.title}`}
                >
                  <div className="relative aspect-square min-h-[200px]">
                    <Image
                      src={product.src || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
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

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
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
          <div className="relative w-full max-w-4xl h-[80vh] flex flex-col md:flex-row gap-4">
            <div className="relative w-full md:w-1/2 h-[40vh] md:h-full">
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 bg-black/70 p-6 text-white overflow-y-auto">
              <h3 className="font-bold text-xl mb-2">{selectedImage.title}</h3>
              {selectedImage.date && <p className="text-sm text-white/80 mb-4">{selectedImage.date}</p>}
              <div className="text-sm space-y-4">
                {typeof selectedImage.description === "string" ? (
                  <p>{selectedImage.description}</p>
                ) : (
                  <>
                    <p>{selectedImage.description.intro}</p>
                    <div>
                      <h4 className="font-semibold">Pourquoi choisir ce produit ?</h4>
                      <ul className="list-disc pl-5">
                        {selectedImage.description.whyChoose.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">Tarification</h4>
                      <ul className="list-disc pl-5">
                        {selectedImage.description.pricing.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <p>{selectedImage.description.callToAction}</p>
                  </>
                )}
              </div>
              <Link
                className={cn(
                  buttonVariants(),
                  "mt-4 inline-flex items-center gap-2",
                  "group relative justify-center rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
                )}
                href={getProductLink(selectedImage)}
              >
                <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
                <Icons.calendar className="size-4" />
                <span>Allez à la boutique</span>
              </Link>
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