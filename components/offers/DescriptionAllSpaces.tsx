import React from 'react'
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils"

export default function DescriptionAllSpaces() {
    return (
        <section className="container min-h-[100px] py-14 relative mt-0">          
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center mt-5 mb-8 lg:mb-16">
                <h2 className="mb-4 text-xl md:text-4xl font-saudagar tracking-tight">
                  Tout les articles en vente
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-6 lg:mb-8 h-full">
                {avantages.map((avantage,index) => (
                <div key={index} className="items-center flex flex-col bg-gray-50 rounded-lg shadow ">
                    <Image
                    className="w-full h-50 object-cover rounded-lg sm:rounded-none sm:rounded-l-lg"
                    src={avantage.image}
                    alt={avantage.image}
                    width={800} 
                    height={600} 
                    />
                    <div className="p-5">
                    <h3 className="text-xl font-bold tracking-tight mb-5 text-gray-900 dark:text-white">
                        {avantage.title}
                    </h3>
                 
                    <Link
                            className={cn(
                                buttonVariants(),
                                "max-w-52 gap-2 overflow-hidden whitespace-pre",
                                "group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
                            )}
                            
                            href={`/reservation/list-space`}
                            >
                            <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
                            
                            <div className="flex items-center">
                                <span className="ml-1">Commander</span>
                              
                            </div>
                    </Link>
                    </div>
                </div>
                ))}
            </div>
          
            </div>
       
                                               
           
        </section>



    )
}


const avantages = [
    {
      title: "Lingette",
      image: "/images/produits/lingette.jpg",
    },

    {
      title: "Clean",
      image: "/images/produit/clean.jpg",
    },

    {
      title: "Conforta",
      image:
        "/images/produit/conforta.jpg"
    },

    {
        title: "Papier hygiénique",
        image:
          "/images/produit/papier_hygiénique.jpg ",
    },

    {
        title: "Conforta protect",
        image: "/images/produit/conforta_protect.jpg",
    },

    {
        title: "Clean pro",
        image: "/images/produit/clean_pro.jpg",
    },

    {
        title: "Lilas protect",
        image:
          "/images/produit/lilas.jpg"
    },
    {
          title: "Conforta premium ",
          image:
            "/images/produit/conforta_premium.jpg ",
    },

    {
            title: "Couche Bébé chou",
            image: "/images/produit/couche_bebe.jpg",
    },
    {
            title: "Savon ou gel lavant",
            image: "/images/produit/savon.jpg",
    },
    {
            title: "Serviettes humides réutilisables",
            image:
              "/images/produit/serviette.jpg"
    },
    {
              title: "Lingettes pour bébé",
              image:
                "/images/produit/lingette_bebe.jpg ",
    },

    {
      title: "Couche Bébé chou",
      image: "/images/produit/couche_bebe.jpg",
},
{
      title: "Savon ou gel lavant",
      image: "/images/produit/savon.jpg",
},
{
      title: "Serviettes humides réutilisables",
      image:
        "/images/produit/serviette.jpg"
},
{
        title: "Lingettes pour bébé",
        image:
          "/images/produit/lingette_bebe.jpg ",
},

{
  title: "Couche Bébé chou",
  image: "/images/produit/couche_bebe.jpg",
},
{
  title: "Savon ou gel lavant",
  image: "/images/produit/savon.jpg",
},
{
  title: "Serviettes humides réutilisables",
  image:
    "/images/produit/serviette.jpg"
},
{
    title: "Lingettes pour bébé",
    image:
      "/images/produit/lingette_bebe.jpg ",
},

{
  title: "Couche Bébé chou",
  image: "/images/produit/couche_bebe.jpg",
},
{
  title: "Savon ou gel lavant",
  image: "/images/produit/savon.jpg",
},
{
  title: "Serviettes humides réutilisables",
  image:
    "/images/produit/serviette.jpg"
},
{
    title: "Lingettes pour bébé",
    image:
      "/images/produit/lingette_bebe.jpg ",
},

  ]
