"use client"
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const AVANTAGES = [
  {
    title: "Masque de sommeil",
    description: {
      intro: "Profitez d'un repos optimal pendant vos voyages avec notre masque de sommeil occultant.",
      whyChoose: [
        "Conçu avec un tissu doux et respirant pour un confort maximal.",
        "Bloque efficacement la lumière pour un sommeil profond, même en plein jour.",
        "Sangle réglable pour un ajustement parfait à toutes les tailles de tête."
      ],
      pricing: ["Contactez-nous pour connaître les tarifs compétitifs."],
      callToAction: "Commandez dès maintenant pour des nuits paisibles en voyage !"
    },
    image: "/images/accessoire_voyage/Masque de sommeil occultant 2.avif",
  },
  {
    title: "Valise cabine",
    description: {
      intro: "Voyagez léger et avec style grâce à notre valise cabine compacte et robuste.",
      whyChoose: [
        "Conforme aux normes des bagages cabine pour la plupart des compagnies aériennes.",
        "Coque rigide résistante aux chocs pour protéger vos affaires.",
        "Quatre roues pivotantes pour une maniabilité fluide."
      ],
      pricing: ["Prix abordables, contactez-nous pour plus de détails."],
      callToAction: "Préparez votre prochain voyage avec cette valise pratique !"
    },
    image: "/images/accessoire_voyage/Valises cabine 2.jpg",
  },
  {
    title: "Sac à dos",
    description: {
      intro: "Explorez le monde avec notre sac à dos de voyage robuste, conçu pour l'aventure.",
      whyChoose: [
        "Compartiments multiples pour une organisation facile de vos affaires.",
        "Matériaux imperméables pour protéger vos objets des intempéries.",
        "Design ergonomique avec rembourrage pour un confort longue durée."
      ],
      pricing: ["Consultez nos offres pour ce sac à dos durable."],
      callToAction: "Commandez votre compagnon de voyage idéal dès aujourd'hui !"
    },
    image: "/images/accessoire_voyage/Sacs à dos de voyage 3.webp",
  },
  {
    title: "Coussin de voyage",
    description: {
      intro: "Restez à l'aise pendant vos longs trajets avec notre coussin de voyage ergonomique.",
      whyChoose: [
        "Support optimal pour le cou et la tête, réduisant la fatigue.",
        "Mousse à mémoire de forme qui s'adapte à votre morphologie.",
        "Housse lavable pour une hygiène irréprochable."
      ],
      pricing: ["Tarifs attractifs, renseignez-vous dès maintenant."],
      callToAction: "Améliorez votre confort en voyage avec ce coussin !"
    },
    image: "/images/accessoire_voyage/Coussin de voyage ergonomique 2.jpg",
  },
  {
    title: "Casque musique",
    description: {
      intro: "Plongez dans votre musique préférée avec notre casque audio conçu pour les voyages en avion.",
      whyChoose: [
        "Réduction active du bruit pour une immersion totale.",
        "Léger et pliable pour un rangement facile dans votre bagage.",
        "Autonomie longue durée pour les vols longue distance."
      ],
      pricing: ["Demandez nos prix pour ce casque de qualité."],
      callToAction: "Commandez maintenant pour une expérience sonore exceptionnelle !"
    },
    image: "/images/accessoire_voyage/casque_musique 2.jpg",
  },
  {
    title: "Chaussette voyage",
    description: {
      intro: "Gardez vos pieds au chaud et confortables avec nos chaussettes de voyage pour avion.",
      whyChoose: [
        "Tissu respirant et anti-humidité pour un confort prolongé.",
        "Compression légère pour améliorer la circulation sanguine.",
        "Design élégant, parfait pour les longs vols."
      ],
      pricing: ["Prix compétitifs, contactez-nous pour plus d'infos."],
      callToAction: "Ajoutez ces chaussettes à votre kit de voyage dès maintenant !"
    },
    image: "/images/accessoire_voyage/chaussette voyage 2.jpg",
  },
  {
    title: "Un cadenas TSA",
    description: {
      intro: "Sécurisez vos bagages avec notre cadenas TSA, idéal pour les voyages internationaux.",
      whyChoose: [
        "Approuvé par la TSA pour des contrôles sans tracas aux aéroports.",
        "Construction robuste pour une sécurité accrue.",
        "Combinaison personnalisable pour une utilisation facile."
      ],
      pricing: ["Tarifs abordables, renseignez-vous pour commander."],
      callToAction: "Protégez vos affaires avec ce cadenas fiable !"
    },
    image: "/images/accessoire_voyage/Un cadenas TSA.jpg",
  },
  {
    title: "Trousse toilette",
    description: {
      intro: "Organisez vos essentiels de toilette avec notre trousse de voyage pratique et élégante.",
      whyChoose: [
        "Compartiments spacieux pour ranger tous vos produits de soin.",
        "Matériau imperméable et facile à nettoyer.",
        "Design compact, idéal pour les bagages à main."
      ],
      pricing: ["Découvrez nos offres pour cette trousse indispensable."],
      callToAction: "Commandez votre trousse de toilette pour voyager organisé !"
    },
    image: "/images/accessoire_voyage/trousse toillette.jpg",
  },
];

export default function DescriptionAllSpacesprod() {
  return (
    <section className="container min-h-[100px] py-14 relative -mt-6">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-xl md:text-4xl font-saudagar tracking-tight">
            Nos différents accessoires
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-6 lg:mb-8 h-full">
          {AVANTAGES.map((avantage, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md transition-transform transform hover:scale-[1.02] hover:shadow-md cursor-pointer w-full h-full"
            >
              <figure className="px-5 pt-5">
               

                 <Link 
                    href={{
                      pathname: "/reservationproduct/",
                      query: {
                        title: encodeURIComponent(avantage.title),
                        image: encodeURIComponent(avantage.image),
                      },
                    }}
                  >
                     <Image
                      src={avantage.image}
                      alt={avantage.title}
                      className="rounded-xl object-cover w-full h-56"
                      width={400}
                      height={400}
                    />
                  </Link>
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
                      pathname: "/reservationproduct/",
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