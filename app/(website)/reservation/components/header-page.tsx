"use client";
import Image from "next/image";
import  { useState,useEffect } from "react";
import { cn } from "@/lib/utils";

const images = [
   
    "/images/carrousel_images/location_vehicule.jpg",
    "/images/carrousel_images/location_voiture (2).jpg",

  ];
  

export default function HeaderPage() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
      }, []);

    return (
        <>
                  <section className=" relative pt-2">
                    <div className={cn("h-[60vh] md:h-[400px] xl:h-[400px] relative container px-0 max-w-[1400px]")}>
                    <div className="absolute z-[3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center flex-col gap-8 max-w-5xl w-full">
                        <div className="max-w-screen-sm text-white text-center md:text-left">
                            <h2 className="mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight font-semibold">
                                Réservez maintenant vos véhicules</h2>
                            <p className="mb-8 font-light text-xs-center sm:text-sm">Bienvenue a Sovedah-CI</p>
                        </div>
                       
                    </div>
                    {/* image background */}
                {images.map((image, index) => (
                <Image
                    key={index}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    layout="fill"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 blur-sm bg-black/50 ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                    }`} 
                />
                ))}
                </div>
            </section >
         
        </>
    );
}
