import TitleSection from '@/components/title-section';
import React from 'react';
import { BorderBeam } from "@/components/magicui/border-beam";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from 'next/image'; // Import Image from next/image

export default function DescriptionAllSpaces() {
    return (
        <section className="container min-h-[300px] py-14 relative">
            <TitleSection title={"Nos différents espaces situés à Cocody"} />

            <div className="relative gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <Image
                    className="w-full"
                    src="/images/coworking/Bureaux privés/Bureau confiance/img (1).jpg"
                    alt="Bureau confiance"
                    width={800} // Specify the width
                    height={500} // Specify the height
                />
                <div className="mt-4 md:mt-0">
                    <h2 className="mb-4 text-2xl md:text-4xl tracking-tight font-saudagar">Bureaux privés</h2>
                    <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                        Installez-vous et faites comme chez vous. La connexion internet est disponible et profitez de tout ce dont nous vous mettrons à disposition dans votre bureau. <br />
                        En fonction de la forme de votre installation vous bénéficierez de différents services.
                    </p>
                    <Link
                        className={cn(
                            buttonVariants({ size: "sm" }),
                            "max-w-52 gap-2 overflow-hidden whitespace-pre",
                            "group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
                        )}
                        href={`/our_spaces/private_offices`}
                    >
                        <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
                        <div className="flex items-center">
                            <span className="ml-1 text-sm sm:text-md">Savoir plus</span>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="relative flex flex-col-reverse md:gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <div className="mt-4 md:mt-0">
                    <h2 className="mb-4 text-2xl md:text-4xl tracking-tight font-saudagar">Open space</h2>
                    <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                        Retrouvez Novis à Villeneuve d&apos;Ascq, à proximité immédiate du Parc de la Haute Borne. <br />
                        Novis Lille Villeneuve d&apos;Ascq prend place dans un complexe prime écoresponsable, labellisé WELL niveau Silver, à deux pas du Stade Pierre Mauroy, du centre commercial Héron Parc et des nombreuses boutiques du centre commercial V2.
                    </p>
                    <Link
                        className={cn(
                            buttonVariants({ size: "sm" }),
                            "max-w-52 gap-2 overflow-hidden whitespace-pre",
                            "group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
                        )}
                        href={`/our_spaces/open_space`}
                    >
                        <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
                        <div className="flex items-center">
                            <span className="ml-1 text-sm sm:text-md">Savoir plus</span>
                        </div>
                    </Link>
                </div>
                <Image
                    className="w-full"
                    src="/images/coworking/Espace Bulle Open space/img (1).jpg"
                    alt="Open space"
                    width={800}
                    height={500}
                />
            </div>

            <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <Image
                    className="w-full"
                    src="/images/coworking/Salle de réunion/img (1).jpg"
                    alt="Salle de réunion"
                    width={800}
                    height={500}
                />
                <div className="mt-4 md:mt-0">
                    <h2 className="mb-4 text-2xl md:text-4xl tracking-tight font-saudagar">Salle de réunion</h2>
                    <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                        Vous souhaitez pouvoir recevoir du monde afin d&apos;y organiser des réunions ? NOVIS coworking vous donne la possibilité de pouvoir louer cette salle de réunion moderne dans Abidjan <br />
                        Que cela se fasse avec vos collaborateurs, vos prestataires et/ou vos clients, vous disposez de cet espace de <span className="font-bold">20 m2</span>. Ce lieu de réflexion peut accueillir <span className="font-bold">10 voir 14 personnes</span> si nécessité de rallonge.
                    </p>
                    <Link
                        className={cn(
                            buttonVariants({ size: "sm" }),
                            "max-w-52 gap-2 overflow-hidden whitespace-pre",
                            "group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
                        )}
                        href={`/our_spaces/meeting_room`}
                    >
                        <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
                        <div className="flex items-center">
                            <span className="ml-1 text-sm sm:text-md">Savoir plus</span>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="relative flex flex-col-reverse md:gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <div className="mt-4 md:mt-0">
                    <h2 className="mb-4 text-2xl md:text-4xl tracking-tight font-saudagar">Espace commun</h2>
                    <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                        Les espaces commun ou espaces de vie, sont des espaces de grandes convivialités pouvant servir également à différents types d&apos;évènements comme <span className="font-bold">soirée networking, apéro business, expositions, ventes, talks-show, tournages poadcast, interviews etc…</span> <br />
                        Ce lieu se prête à la réalisation de tous vos projets commerciaux, artistiques et de communication.
                    </p>
                    <Link
                        className={cn(
                            buttonVariants({ size: "sm" }),
                            "max-w-52 gap-2 overflow-hidden whitespace-pre",
                            "group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
                        )}
                        href={`/our_spaces/common_space`}
                    >
                        <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
                        <div className="flex items-center">
                            <span className="ml-1 text-sm sm:text-md">Savoir plus</span>
                        </div>
                    </Link>
                </div>
                <Image
                    className="w-full"
                    src="/images/coworking/Espace commun/img (1).jpg"
                    alt="Espace commun"
                    width={800}
                    height={500}
                />
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