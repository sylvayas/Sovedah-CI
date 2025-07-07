import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const AVANTAGES = [
  {
    title: "Conforta Lingettes Bébé – Ultra Doux",
    description: {
      intro: "Offrez à votre bébé une douceur inégalée avec les lingettes Conforta Ultra Doux. Spécialement conçues pour respecter la peau délicate des tout-petits, elles sont sans alcool, enrichies d'une texture spéciale nettoyante, et parfaitement adaptées pour une utilisation quotidienne, à la maison comme en déplacement.",
      whyChoose: [
        "Douceur extrême pour la peau sensible des bébés",
        "Sans alcool : zéro irritation, zéro risque",
        "54 lingettes par paquet : économique et durable",
        "Parfum léger et agréable",
        "Pratique pour le change, les mains, le visage ou les petites salissures",
      ],
      pricing: [
        "PU : 750 FCFA",
        "En gros à partir de 16 parquets : 650 FCFA",
      ],
      callToAction: "Commandez maintenant pour une douceur au quotidien !",
    },
    image: "/images/produits&details/papier hygienique pour enfant.jpg",
  },

  {
    title: "Lilas protect",
    description: {
      intro: "Découvrez les couches adultes Conforta Protect – Taille Large, conçues pour offrir confort, sécurité et discrétion à ceux qui en ont le plus besoin",
      whyChoose: [
        "Haute absorption : restez au sec plus longtemps grâce à une technologie antifuite efficace.",
        "Taille Large : convient parfaitement aux adultes ayant un tour de taille de 115 cm à 140 cm.",
        "Confort optimal : une coupe anatomique et des matériaux doux pour la peau.",
        "Praticité : paquet de 15 couches, idéal pour une utilisation quotidienne.",
        "Conforta, c&apos;est la confiance retrouvée, de jour comme de nuit."
      ],
      pricing: [
        "PU : 6000 FCFA",
        "En gors à partir de 4 parquets : 5500 FCFA",
      ],
      callToAction: "Commandez maintenant pour une douceur au quotidien !",
    },
    image: "/images/produits&details/lilas-couches-adultes-large-15-pieces.webp",
  },



  // Add other products with similar structured descriptions
  {
    title: "Conforta protect large",
    description: {
      intro: "Découvrez les couches adultes Conforta Protect – Taille Large, conçues pour offrir confort, sécurité et discrétion à ceux qui en ont le plus besoin",
      whyChoose: [
        "Haute absorption : restez au sec plus longtemps grâce à une technologie antifuite efficace.",
        "Taille Large : convient parfaitement aux adultes ayant un tour de taille de 115 cm à 140 cm.",
        "Confort optimal : une coupe anatomique et des matériaux doux pour la peau.",
        "Praticité : paquet de 10 couches, idéal pour une utilisation quotidienne.",
        "Conforta, c&apos;est la confiance retrouvée, de jour comme de nuit."
      ],
      pricing: [
        "PU : 6000 FCFA",
        "En gros à partir de 4 parquets : 5500 FCFA",
      ],
      callToAction: "Commandez maintenant pour une douceur au quotidien !",
    },
    image: "/images/produits&details/conf_vert.jpeg",
  },

  {
    title: "Clean Pro by Conforta",
    description: {
        intro: "  Découvrez Clean Pro by Conforta, votre rouleau professionnel 2 plis, fabriqué en Côte d'Ivoire pour répondre aux exigences du quotidien.",
        whyChoose: [
          "Ultra-absorbant : parfait pour toutes vos tâches ménagères, en cuisine ou en entreprise.",
          "Résistant à l'humidité : ne se déchire pas facilement même mouillé.",
          "Format économique : Une utilisation prolongée.",
          "Qualité professionnelle : idéal pour les restaurants, hôtels, bureaux et foyers exigeants.",
          "Propre, pratique, professionnel – Clean Pro, c&apos;est votre allié propreté au quotidien.",
        ],
        pricing: [
          "PU : 3000 FCFA seulement.",
          "En gros à partir de 6 rouleaux : 2 800 FCFA",
        ],
        callToAction: "Commandez maintenant pour une douceur au quotidien !",
      },
    image: "/images/produits&details/essuie-tout.jpg",
  },
 

  {
    title: "Conforta ultra doux texture spéciale",
    description: {
        intro: "Offrez à votre bébé une douceur inégalée avec les lingettes Conforta Ultra Doux. Spécialement conçues pour respecter la peau délicate des tout-petits, elles sont sans alcool, enrichies d'une texture spéciale nettoyante, et parfaitement adaptées pour une utilisation quotidienne, à la maison comme en déplacement.",
        whyChoose: [
          "Douceur extrême pour la peau sensible des bébés",
          "Sans alcool : zéro irritation, zéro risque",
          "54 lingettes par paquet : économique et durable",
          "Parfum léger et agréable",
          "Pratique pour le change, les mains, le visage ou les petites salissures",
        ],
        pricing: [
          "PU : 750 FCFA",
          "En gros à partir de 16 parquets : 650 FCFA",
        ],
        callToAction: "Commandez maintenant pour une douceur au quotidien !",
      },
    image: "/images/produits&details/ultra_doux.png",
  },
  {
    title: "Papier Hygiénique Conforta Fleuri",
    description: {
        intro: " Faites le choix de la douceur, de la résistance et de l&apos;élégance avec le papier hygiénique Conforta Fleuri. Sa texture délicatement parfumée apporte un confort unique à chaque utilisation, tout en étant résistante et super absorbante.",
        whyChoose: [
          "Ce que vous gagnez :",
          "12 rouleaux au prix de 10 (2 rouleaux gratuits)",
          "Papier doux, résistant et parfumé",
          "Idéal pour toute la famille",
          "Emballage économique et pratique",
        ],
        pricing: [
          "PU : 1.500 FCFA seulement !",
          "En gros à partir de 4 parquets : 1450 FCFA",
        ],
        callToAction: "Commandez maintenant pour une douceur au quotidien !",
      },
    image: "/images/produits&details/hygienique.jpeg",
  },
  {
    title: "Lilas clip nuit",
    description: {
        intro: "Découvrez les serviettes Conforta Micro-aérée, conçues pour répondre à tous vos besoins avec 3 niveaux de protection adaptés à chaque moment du cycle :",
        whyChoose: [
          "Clip Nuit (8 pièces) : Pour les nuits ou les journées très intenses. Dormez ou bougez en toute sérénité",
          "Points forts :",
          "Technologie Zone Bleue pour une absorption ciblée",
          "Texture micro-aérée pour une meilleure respirabilité",
          "Confort garanti sans sensation d&apos;humidité",
          "Emballage pratique et hygiénique",
        ],
        pricing: [
          "PU : 650 FCFA",
          "En gros à partir 24 parquets : 550 FCFA",
        ],
        callToAction: "Commandez maintenant pour une douceur au quotidien !",
      },
    image: "/images/produits&details/serviettes-hygiéniques (2).jpg",
  },
  {
    title: "Conforta maternité super",
    description: {
      intro: "Parce que le confort d'une maman après l'accouchement est une priorité, Conforta Maternité Super vous accompagne dans cette période délicate avec douceur et efficacité.Avec sa forme anatomique et son absorption renforcée, cette serviette hygiénique a été spécialement conçue pour les flux abondants. D'une épaisseur de 7 mm seulement, elle assure une protection optimale tout en restant discrète et confortable.",
      whyChoose: [
       
        "Forme anatomique qui épouse parfaitement les courbes",
        "Absorption renforcée pour une sécurité maximale",
        "Conçue pour les flux abondants après accouchement",
        "Paquet de 15 serviettes",
        "Adoptez Conforta Maternité Super, l&apos;alliée incontournable pour vivre votre post-partum en toute sérénité !"
      ],
      pricing: [
        "PU : 1700 FCFA",
        "En gros à partir de 12 parquets : 1250 FCFA",
      ],
      callToAction: "Commandez maintenant pour une douceur au quotidien !",
    },
    image: "/images/produits&details/conf_mat.jpeg",
  },
  {
    title: "Conforta clean pro",
    description: {
      intro: "Offrez à votre bébé tout le confort qu&apos;il mérite avec les couches Clean Soft taille 2 (3-5 kg) ! Douces, absorbantes et testées dermatologiquement, elles assurent une protection optimale jour et nuit.",
      whyChoose: [
        "Contenu du pack :",
        "6 paquets de 50 couches = 300 couches au total",
        "Taille 2 – Small (3 à 5 kg)",
        "Idéales pour les nouveau-nés et jeunes nourrissons",
        "Avantages :", 
        "Douceur exceptionnelle pour la peau sensible de bébé",
        "Barrières anti-fuiteS pour plus de sécurité",
        "Faciles à mettre grâce aux attaches solides",
        "Rapport qualité-prix imbattable !",
      ],
      pricing: [
        "PU : 3000 FCA",
        "En gros à partir de 6 parquets : 2800 FCFA",
      ],
      callToAction: "Commandez maintenant pour une douceur au quotidien !",
    },
    image: "/images/produits&details/images (5).jpeg",
  },
  {
    title: "Lilas clip super",
    description: {
      intro: "Découvrez les serviettes Conforta Micro-aérée, conçues pour répondre à tous vos besoins avec 3 niveaux de protection adaptés à chaque moment du cycle :",
      whyChoose: [
        "Clip Super (9 pièces) : Pour les jours de flux abondant. Absorption renforcée et sécurité maximale.",
        "Points forts :",
        "Technologie Zone Bleue pour une absorption ciblée",
        "Texture micro-aérée pour une meilleure respirabilité",
        "Confort garanti sans sensation d&apos;humidité",
        "Emballage pratique et hygiénique",
      ],
      pricing: [
        "PU : 650 FCFA",
        "En gros à partir 24 parquets : 550 FCFA",
      ],
      callToAction: "Commandez maintenant pour une douceur au quotidien !",
    },
    image: "/images/produits&details/serviettes-hygiéniques (1).jpg",
  },
  
  {
    title: "Lilas clip normal",
    description: {
      intro: "Découvrez les serviettes Conforta Micro-aérée, conçues pour répondre à tous vos besoins avec 3 niveaux de protection adaptés à chaque moment du cycle :",
      whyChoose: [
        "Clip Normal (10 pièces) : Pour les jours de flux léger à moyen. Discrétion et confort optimal.",
        "Points forts :",
        "Technologie Zone Bleue pour une absorption ciblée",
        "Texture micro-aérée pour une meilleure respirabilité",
        "Confort garanti sans sensation d&apos;humidité",
        "Emballage pratique et hygiénique",
      ],
      pricing: [
        "PU : 650 FCFA",
        "En gros à partir 24 parquets : 550 FCFA",
      ],
      callToAction: "Commandez maintenant pour une douceur au quotidien !",
    },
    image: "/images/produits&details/images.jpeg",
  },
  {
    title: "Lilas maternité super",
    description: {
        intro: "Parce que le confort d'une maman après l'accouchement est une priorité, Conforta Maternité Super vous accompagne dans cette période délicate avec douceur et efficacité.Avec sa forme anatomique et son absorption renforcée, cette serviette hygiénique a été spécialement conçue pour les flux abondants. D'une épaisseur de 7 mm seulement, elle assure une protection optimale tout en restant discrète et confortable.",
        whyChoose: [
         
          "Forme anatomique qui épouse parfaitement les courbes",
          "Absorption renforcée pour une sécurité maximale",
          "Conçue pour les flux abondants après accouchement",
          "Paquet de 15 serviettes",
          "Adoptez Conforta Maternité Super, l&apos;alliée incontournable pour vivre votre post-partum en toute sérénité !"
        ],
        pricing: [
          "PU : 1700 FCFA",
          "En gros à partir de 12 parquets : 1250 FCFA",
        ],
        callToAction: "Commandez maintenant pour une douceur au quotidien !",
      },
    image: "/images/produits&details/serviettes-hygiéniques.jpg",
  },
  {
    title: "Clean soft 4",
    description: {
        intro: "Offrez à votre bébé tout le confort qu&apos;il mérite avec les couches Clean Soft taille 2 (3-5 kg) ! Douces, absorbantes et testées dermatologiquement, elles assurent une protection optimale jour et nuit.",
        whyChoose: [
          "Contenu du pack :",
          "6 paquets de 50 couches = 300 couches au total",
          "Taille 2 – Small (3 à 5 kg)",
          "Idéales pour les nouveau-nés et jeunes nourrissons",
          "Avantages :", 
          "Douceur exceptionnelle pour la peau sensible de bébé",
          "Barrières anti-fuiteS pour plus de sécurité",
          "Faciles à mettre grâce aux attaches solides",
          "Rapport qualité-prix imbattable !",
        ],
        pricing: [
          "PU : 3500 FCA",
          "En gros à partir de 6 parquets : 3200 FCFA",
        ],
        callToAction: "Commandez maintenant pour une douceur au quotidien !",
      },
    image: "/images/produits&details/clean2.jpeg",
  },

    {
    title: "Clean soft 2",
    description: {
        intro: "Offrez à votre bébé tout le confort qu&apos;il mérite avec les couches Clean Soft taille 2 (3-5 kg) ! Douces, absorbantes et testées dermatologiquement, elles assurent une protection optimale jour et nuit.",
        whyChoose: [
          "Contenu du pack :",
          "6 paquets de 50 couches = 300 couches au total",
          "Taille 2 – Small (3 à 5 kg)",
          "Idéales pour les nouveau-nés et jeunes nourrissons",
          "Avantages :", 
          "Douceur exceptionnelle pour la peau sensible de bébé",
          "Barrières anti-fuiteS pour plus de sécurité",
          "Faciles à mettre grâce aux attaches solides",
          "Rapport qualité-prix imbattable !",
        ],
        pricing: [
          "PU : 3000 FCA",
          "En gros à partir de 6 parquets : 2800 FCFA",
        ],
        callToAction: "Commandez maintenant pour une douceur au quotidien !",
      },
    image: "/images/couche_bébé_clean_soft/clean_soft2.jpeg",
  },

    {
    title: "Clean soft 3",
    description: {
        intro: "Offrez à votre bébé tout le confort qu&apos;il mérite avec les couches Clean Soft taille 2 (3-5 kg) ! Douces, absorbantes et testées dermatologiquement, elles assurent une protection optimale jour et nuit.",
        whyChoose: [
          "Contenu du pack :",
          "6 paquets de 50 couches = 300 couches au total",
          "Taille 2 – Small (3 à 5 kg)",
          "Idéales pour les nouveau-nés et jeunes nourrissons",
          "Avantages :", 
          "Douceur exceptionnelle pour la peau sensible de bébé",
          "Barrières anti-fuiteS pour plus de sécurité",
          "Faciles à mettre grâce aux attaches solides",
          "Rapport qualité-prix imbattable !",
        ],
        pricing: [
          "PU : 3000 FCA",
          "En gros à partir de 6 parquets : 2800 FCFA",
        ],
        callToAction: "Commandez maintenant pour une douceur au quotidien !",
      },
    image: "/images/couche_bébé _clean_soft_3/clean_soft_3.jpeg",
  },
];


export default function DescriptionAllSpaces() {
  return (
    <section className="container min-h-[100px] py-12 relative -mt-6">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-xl md:text-4xl font-saudagar tracking-tight">
            Nos différents articles
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-6 lg:mb-8 h-full">
          {AVANTAGES.map((avantage, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer w-full h-full flex flex-col overflow-hidden"
            >
              <Link
                href={{
                  pathname: "/reservation/list-space-card",
                  query: {
                    title: encodeURIComponent(avantage.title),
                    image: encodeURIComponent(avantage.image),
                  },
                }}
                className="block"
              >
                <div className="overflow-hidden">
                  <Image
                    src={avantage.image}
                    alt={avantage.title}
                    className="w-full h-44 sm:h-48 md:h-56 object-cover transition-all duration-300 group-hover:scale-105 rounded-t-2xl"
                    width={500}
                    height={500}
                  />
                </div>
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <div className="px-4 pt-3 text-center">
                  <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2 truncate">{avantage.title}</h2>
                </div>
                <div className="px-4 pb-3 flex flex-col gap-1 items-center">
                  {avantage.description.pricing.map((price, idx) => (
                    <p key={idx} className="text-xs text-gray-600">
                      {price}
                    </p>
                  ))}
                </div>
                <div className="flex items-center justify-center px-4 pb-4 mt-auto">
                  <Link
                    className={cn(
                      buttonVariants(),
                      "gap-2 overflow-hidden whitespace-pre",
                      "group relative justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
                    )}
                    href={{
                      pathname: "/reservation/list-space-card",
                      query: {
                        title: encodeURIComponent(avantage.title),
                        image: encodeURIComponent(avantage.image),
                      },
                    }}
                  >
                    <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
                    <span className="ml-1">Commander</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}