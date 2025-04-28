// components/DescriptionAllSpaces.jsx
"use client"
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const AVANTAGES = [
  {
    title: "Conforta Lingettes Bébé – Ultra Doux",
    description: {
      intro: "Offrez à votre bébé une douceur inégalée avec les lingettes Conforta Ultra Doux. Spécialement conçues pour respecter la peau délicate des tout-petits, elles sont sans alcool, enrichies d’une texture spéciale nettoyante, et parfaitement adaptées pour une utilisation quotidienne, à la maison comme en déplacement.",
      whyChoose: [
        "Douceur extrême pour la peau sensible des bébés",
        "Sans alcool : zéro irritation, zéro risque",
        "54 lingettes par paquet : économique et durable",
        "Parfum léger et agréable",
        "Pratique pour le change, les mains, le visage ou les petites salissures",
      ],
      pricing: [
        "PU : 750 FCFA",
        "Prix revendeur à partir de 16 parquets : 650 FCFA",
      ],
      callToAction: "Livraison rapide disponible à Abidjan et environs. Commandez dès maintenant via WhatsApp ou notre boutique en ligne. Vos lingettes préférées livrées directement chez vous !",
    },
    image: "/images/produits&details/papier hygienique pour enfant.jpg",
  },

  {
    title: "Likas protect",
    description: {
      intro: "Découvrez les couches Likas Protect, conçues pour un confort optimal et une protection longue durée.",
      whyChoose: [
        "Absorption supérieure pour une protection longue durée",
        "Matériaux doux pour la peau",
        "Confort garanti toute la journée",
      ],
      pricing: [
        "PU : 5000 FCFA",
        "Prix revendeur à partir de 10 paquets : 4500 FCFA",
      ],
      callToAction: "Commandez maintenant et profitez d'une livraison rapide à Abidjan !",
    },
    image: "/images/produits&details/lilas-couches-adultes-large-15-pieces.webp",
  },

  {
    title: "Conforta protect",
    description: {
      intro: "Un produit de nettoyage polyvalent pour toutes les surfaces, avec une formule efficace et sûre.",
      whyChoose: [
        "Nettoyage puissant sans résidus",
        "Formule écologique",
        "Facile à utiliser",
      ],
      pricing: [
        "PU : 2000 FCFA",
        "Prix revendeur à partir de 20 unités : 1800 FCFA",
      ],
      callToAction: "Commandez dès aujourd'hui pour un nettoyage impeccable !",
    },
    image: "/images/produits&details/conforta.jpg",
  },

  // Add other products with similar structured descriptions
  {
    title: "Conforta ultra doux",
    description: {
      intro: "Papier hygiénique doux, idéal pour les enfants et les peaux sensibles.",
      whyChoose: [
        "Ultra doux pour un confort maximal",
        "Résistant et économique",
        "Adapté aux peaux sensibles",
      ],
      pricing: [
        "PU : 1000 FCFA",
        "Prix revendeur à partir de 50 rouleaux : 900 FCFA",
      ],
      callToAction: "Commandez maintenant pour une douceur au quotidien !",
    },
    image: "/images/produits&details/conf_vert.jpeg",
  },

  {
    title: "Clean Pro by Conforta",
    description: {
        intro: "  Résistant et absorbant, le rouleau qui fait la différence ! Vous cherchez un essuie-tout puissant, durable et économique ? Découvrez Clean Pro by Conforta, votre rouleau professionnel 2 plis, fabriqué en Côte d'Ivoire pour répondre aux exigences du quotidien.",
        whyChoose: [
          "Ultra-absorbant : parfait pour toutes vos tâches ménagères, en cuisine ou en entreprise.",
          "Résistant à l'humidité : ne se déchire pas facilement même mouillé.",
          "Format économique : Une utilisation prolongée.",
          "Qualité professionnelle : idéal pour les restaurants, hôtels, bureaux et foyers exigeants.",
          "Propre, pratique, professionnel – Clean Pro, c’est votre allié propreté au quotidien.",
        ],
        pricing: [
          "PU : 3000 FCFA seulement.",
          "A partir de 6 rouleaux : 2 800 FCFA",
        ],
        callToAction: "Commandez maintenant pour une douceur au quotidien !",
      },
    image: "/images/produits&details/essuie-tout.jpg",
  },
  {
    title: "Conforta clip super",
    description: {
        intro: "Papier hygiénique doux, idéal pour les enfants et les peaux sensibles.",
        whyChoose: [
          "Ultra doux pour un confort maximal",
          "Résistant et économique",
          "Adapté aux peaux sensibles",
        ],
        pricing: [
          "PU : 1000 FCFA",
          "Prix revendeur à partir de 50 rouleaux : 900 FCFA",
        ],
        callToAction: "Commandez maintenant pour une douceur au quotidien !",
      },
    image: "/images/produits&details/conf.jpeg",
  },

  {
    title: "Conforta ultra doux texture spéciale",
    description: {
        intro: "Papier hygiénique doux, idéal pour les enfants et les peaux sensibles.",
        whyChoose: [
          "Ultra doux pour un confort maximal",
          "Résistant et économique",
          "Adapté aux peaux sensibles",
        ],
        pricing: [
          "PU : 1000 FCFA",
          "Prix revendeur à partir de 50 rouleaux : 900 FCFA",
        ],
        callToAction: "Commandez maintenant pour une douceur au quotidien !",
      },
    image: "/images/produits&details/ultra_doux.png",
  },
  {
    title: "Papier Hygiénique Conforta Fleuri",
    description: {
        intro: "  12 Rouleaux (10 + 2 gratuits) Faites le choix de la douceur, de la résistance et de l’élégance avec le papier hygiénique Conforta Fleuri. Sa texture délicatement parfumée apporte un confort unique à chaque utilisation, tout en étant résistante et super absorbante.",
        whyChoose: [
          "Ce que vous gagnez :",
          "12 rouleaux au prix de 10 (2 rouleaux gratuits)",
          "Papier doux, résistant et parfumé",
          "Idéal pour toute la famille",
          "Emballage économique et pratique",
        ],
        pricing: [
          "PU : 1.500 FCFA seulement !",
          "A partir de 4 parquets : 1450 FCFA",
        ],
        callToAction: "Commandez maintenant pour une douceur au quotidien !",
      },
    image: "/images/produits&details/hygienique.jpeg",
  },
  {
    title: "Lilas clip nuit",
    description: {
        intro: "Papier hygiénique doux, idéal pour les enfants et les peaux sensibles.",
        whyChoose: [
          "Ultra doux pour un confort maximal",
          "Résistant et économique",
          "Adapté aux peaux sensibles",
        ],
        pricing: [
          "PU : 1000 FCFA",
          "Prix revendeur à partir de 50 rouleaux : 900 FCFA",
        ],
        callToAction: "Commandez maintenant pour une douceur au quotidien !",
      },
    image: "/images/produits&details/serviettes-hygiéniques (2).jpg",
  },
  {
    title: "Conforta maternité super",
    description: {
        intro: "Papier hygiénique doux, idéal pour les enfants et les peaux sensibles.",
        whyChoose: [
          "Ultra doux pour un confort maximal",
          "Résistant et économique",
          "Adapté aux peaux sensibles",
        ],
        pricing: [
          "PU : 1000 FCFA",
          "Prix revendeur à partir de 50 rouleaux : 900 FCFA",
        ],
        callToAction: "Commandez maintenant pour une douceur au quotidien !",
      },
    image: "/images/produits&details/conf_mat.jpeg",
  },
  {
    title: "Conforta absorbant et resistant",
    description: {
        intro: "Papier hygiénique doux, idéal pour les enfants et les peaux sensibles.",
        whyChoose: [
          "Ultra doux pour un confort maximal",
          "Résistant et économique",
          "Adapté aux peaux sensibles",
        ],
        pricing: [
          "PU : 1000 FCFA",
          "Prix revendeur à partir de 50 rouleaux : 900 FCFA",
        ],
        callToAction: "Commandez maintenant pour une douceur au quotidien !",
      },
    image: "/images/produits&details/images (5).jpeg",
  },
  {
    title: "Lilas clip super",
    description: {
        intro: "Papier hygiénique doux, idéal pour les enfants et les peaux sensibles.",
        whyChoose: [
          "Ultra doux pour un confort maximal",
          "Résistant et économique",
          "Adapté aux peaux sensibles",
        ],
        pricing: [
          "PU : 1000 FCFA",
          "Prix revendeur à partir de 50 rouleaux : 900 FCFA",
        ],
        callToAction: "Commandez maintenant pour une douceur au quotidien !",
      },
    image: "/images/produits&details/serviettes-hygiéniques (1).jpg",
  },
  
  
//   {
//     title: "Masque de sommeil",
//     description: "Masque de sommeil pour un voyage confortable.",
//     image: "/images/accessoire_voyage/Masque de sommeil occultant 2.avif",
//   },
//   {
//     title: "Valise cabine",
//     description: "Valise cabine pour voyages légers.",
//     image: "/images/accessoire_voyage/Valises cabine 2.jpg",
//   },
//   {
//     title: "Sac à dos",
//     description: "Sac à dos de voyage robuste.",
//     image: "/images/accessoire_voyage/Sacs à dos de voyage 3.webp",
//   },
//   {
//     title: "Coussin de voyage",
//     description: "Coussin de voyage ergonomique.",
//     image: "/images/accessoire_voyage/Coussin de voyage ergonomique 2.jpg",
//   },

  
];

export default function DescriptionAllSpaces() {
  return (
    <section className="container min-h-[100px] py-14 relative -mt-6">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-xl md:text-4xl font-saudagar tracking-tight">
          
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-8 mb-6 lg:mb-8 h-full">
          {AVANTAGES.map((avantage, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md transition-transform transform hover:scale-[1.02] hover:shadow-md cursor-pointer w-full h-full"
            >
              <figure className="px-5 pt-5">
                <Image
                  src={avantage.image}
                  alt={avantage.title}
                  className="rounded-xl object-cover w-full h-56"
                  width={500}
                  height={500}
                />
              </figure>
              <div className="card-body items-center mt-5 text-center">
                <h2 className="card-title mb-5">{avantage.title}</h2>
                <div className="card-actions mb-4">
                  <Link
                    className={cn(
                      buttonVariants(),
                      "max-w-52 gap-2 overflow-hidden whitespace-pre",
                      "group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
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
                    <div className="flex items-center">
                      <span className="ml-1">Commander</span>
                    </div>
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