// components/DescriptionAllSpaces.jsx
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const AVANTAGES = [
 
  {
    title: "Masque de sommeil",
    description: "Masque de sommeil pour un voyage confortable.",
    image: "/images/accessoire_voyage/Masque de sommeil occultant 2.avif",
  },
  {
    title: "Valise cabine",
    description: "Valise cabine pour voyages légers.",
    image: "/images/accessoire_voyage/Valises cabine 2.jpg",
  },
  {
    title: "Sac à dos",
    description: "Sac à dos de voyage robuste.",
    image: "/images/accessoire_voyage/Sacs à dos de voyage 3.webp",
  },
  {
    title: "Coussin de voyage",
    description: "Coussin de voyage ergonomique.",
    image: "/images/accessoire_voyage/Coussin de voyage ergonomique 2.jpg",
  },
  {
    title: "Casque musique",
    description: "Casque musique pour avion",
    image: "/images/accessoire_voyage/casque_musique 2.jpg",
  },
  {
    title: "chaussette voyage",
    description: "chaussette voyage pour avion",
    image: "/images/accessoire_voyage/chaussette voyage 2.jpg",
  },
  {
    title: "Un cadenas TSA",
    description: "Un cadenas TSA pour valise",
    image: "/images/accessoire_voyage/Un cadenas TSA.jpg",
  },
  {
    title: "trousse toillette",
    description: "trousse toillette pour le voyage",
    image: "/images/accessoire_voyage/trousse toillette.jpg",
  },
  
];

export default function DescriptionAllSpacesprod() {
  return (
    <section className="container min-h-[100px] py-14 relative -mt-6">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-xl md:text-4xl font-saudagar tracking-tight">
            Nos différents accèssoires
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
                      pathname: "/reservationproduct/list-space-card-prod",
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