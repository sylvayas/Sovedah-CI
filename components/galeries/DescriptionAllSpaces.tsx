import React from "react";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function DescriptionAllSpaces({ galerie }: { galerie: any }) {
  return (
    <section className="container min-h-[300px] mb-14 relative">
      <div className="relative gap-8 items-center md:items-stretch py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <Image src="/images/coworking/Espace Bulle Open space/img (1).jpg" alt="description" width={500} height={300} />
        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-2xl md:text-4xl tracking-tight font-saudagar">
            {galerie.title}
          </h2>
          {galerie.description &&
            galerie.description.map((des: any, key: number) => (
              <p
                key={key}
                className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400"
              >
                {des}
              </p>
            ))}

          <Link
            className={cn(
              buttonVariants({ size: "sm" }),
              "inline-flex", // Utiliser inline-flex pour que le bouton s'ajuste à son contenu
              "gap-2 overflow-hidden whitespace-pre",
              "group relative justify-center rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
            )}
            href={galerie.bookingLink}
          >
            <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
            <div className="flex items-center">
              <span className="ml-1 text-sm sm:text-md">{galerie.titles}</span> {/* Utilisation de {galerie.title} ici */}
            </div>
          </Link>
        </div>
      </div>

      <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.1}
        duration={2}
        repeatDelay={1}
        className={
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] inset-x-0 w-full h-[100%]"
        }
      />
    </section>
  );
}