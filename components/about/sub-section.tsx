"use client";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Services from "../website/About/services";

import dynamic from "next/dynamic";

const GridPattern = dynamic(() => import("@/components/magicui/grid-pattern"), {
  ssr: false,
});

export default function SubSection() {
  return (
   
    <>
      <section className="relative">
      <div className="py-8 px-4 md:px-16 mx-auto max-w-screen-xl container lg:py-16">
        <div className="max-w-screen-lg text-gray-700 sm:text-lg">
          <h2 className="mb-4 text-4xl tracking-tight font-bold font-saudagar">
         SOVEDAH CI vous propose de découvrir les différents servives qu&apos;elles offrent
          </h2>
       
          <p className="text-custom-justify">
            <p className="mb-4 font-light text-sm">
            SOVEDAH CI (Société de Vente Directe d&apos;Articles Hygiéniques) est une entreprise ivoirienne spécialisée dans la distribution de produits d&apos;hygiène et de bien-être à travers Innov&apos;A Market. 
            Nous proposons également des services de billetterie avec Innov&apos;A Voyage, facilitant ainsi l&apos;accès aux voyages grâce à des solutions adaptées aux besoins de notre clientèle.
            </p>
            <p className="mb-4 text-sm  font-light ">
            Notre mission est d&apos;apporter des solutions pratiques, accessibles et de qualité à nos clients, en alliant innovation et proximité. 
            Nous nous engageons à offrir une expérience d&apos;achat fluide et sécurisée, avec des produits sélectionnés pour leur fiabilité et un service client réactif.
            </p>
            <p className="mb-4 font-light text-sm">
            Chez SOVEDAH CI, nous croyons en un commerce responsable et durable, où chaque client bénéficie d&apos;un accompagnement personnalisé pour répondre à ses attentes.Faites-nous confiance pour vos besoins en produits d&apos;hygiène et en billetterie !
            </p>
          </p>
          {/* <a href="#" className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
                        Learn more
                        <svg className="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    </a> */}
        </div>
      </div>

      {/* <div className="container grid grid-cols-2 gap-4 md:grid-cols-4 py-8 md:py-4 bg-black text-white">
                <p className="font-medium text-xs md:text-sm"><Icons.laptop className="size-4 md:size-6 mb-2" />Postes équipés</p>
                <p className="font-medium text-xs md:text-sm"><Icons.key className="size-4 md:size-6 mb-2" />Salles de réunion privées</p>
                <p className="font-medium text-xs md:text-sm"><Icons.space className="size-4 md:size-6 mb-2" />Espaces de Coworking</p>
                <p className="font-medium text-xs md:text-sm"><Icons.building className="size-4 md:size-6 mb-2" />Domiciliation et services dédiés</p>
            </div> */}
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </section>
    
      <section className="container min-h-96 py-14 relative">
          
          <Services />
        </section>
    </>
  );
}
