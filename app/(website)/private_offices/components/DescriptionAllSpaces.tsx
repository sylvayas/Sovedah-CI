import React from 'react';
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import vehicule1 from "@/public/images/vehicules/Mitsubishi Mirage review.jpg";
import vehicule2 from "@/public/images/vehicules/Mazda Miata RF or similar.jpg";
import vehicule3 from "@/public/images/vehicules/Nissan Versa or similar.jpg";
import vehicule4 from "@/public/images/vehicules/Chevrolet Malibu.avif";
import vehicule5 from "@/public/images/vehicules/Toyota Corolla hybrid.avif";
import vehicule6 from "@/public/images/vehicules/Mini Cooper Convertible.jpg";

export default function DescriptionAllSpaces() {
  const vehicles = [
    {
      category: "Compact",
      model: "Nissan Versa or similar",
      image: vehicule3,
      people: 5,
      bags: 2,
    },
    {
      category: "Compact Convertible",
      model: "Mazda Miata MX-5 or similar",
      image: vehicule2,
      people: 2,
      bags: 1,
    },
    {
      category: "Economy",
      model: "Mitsubishi Mirage G4 or similar",
      image: vehicule1,
      people: 4,
      bags: 2,
    },
    {
      category: "Intermediate",
      model: "Chevrolet Malibu Specs or similar",
      image: vehicule4,
      people: 5,
      bags: 3,
    },
    {
      category: "Hybrid",
      model: "Toyota Corolla Hybrid Buyer's or similar",
      image: vehicule5,
      people: 5,
      bags: 2,
    },
    {
      category: "Convertible",
      model: "Mini Cooper Convertible Review",
      image: vehicule6,
      people: 4,
      bags: 2,
    },
  ];

  return (
    <section className="container min-h-[100px] py-14 relative -mt-6">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-xl md:text-4xl font-saudagar tracking-tight">
            Nos différents Véhicules
          </h2>
        </div>

        {/* Grid Layout: 2 rows, 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-12 flex flex-col items-center w-full"
            >
              <div className="w-full h-40 rounded-lg mb-4 relative">
                <Image
                  src={vehicle.image}
                  alt={vehicle.model}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-lg font-bold text-green-700">{vehicle.category}</h2>
              <p className="text-gray-600 mb-4">{vehicle.model}</p>
              <div className="flex gap-4 mb-4 w-full">
                <span className="flex items-center gap-1 text-gray-600">
                  <span>⚙️</span> Automatic
                </span>
                <span className="flex items-center gap-1 text-gray-600">
                  <span>👥</span> {vehicle.people} People
                </span>
                <span className="flex items-center gap-1 text-gray-600">
                  <span>🧳</span> {vehicle.bags} Bags
                </span>
              </div>
             
        <div className="card-actions flex justify-center items-center  rounded-lg flex-wrap gap-2">
              <Link
                href="/private_offices/list_space-vehicule"
                className={cn(
                  buttonVariants(),
                  "gap-2 mt-2 overflow-hidden whitespace-pre group relative justify-center rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
                )}
              >
                <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
                <div className="flex items-center">
                  <span className="ml-1">Réservez</span>
                </div>
              </Link>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
