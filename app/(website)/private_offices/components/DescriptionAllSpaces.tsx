import React from 'react'
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils"

export default function DescriptionAllSpaces() {
    return (
        <section className="container min-h-[300px] py-14 relative">
            <div className="relative gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <Image src="/images/coworking/Bureaux privés/Bureau confiance/Bureau Confiance 1.jpg" alt="description" width={500} height={300} />
                <div className="mt-4 md:mt-0">
                    <h2 className="mb-4  text-2xl md:text-4xl tracking-tight font-saudagar">Bureaux privés</h2>
                    <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius omnis iure eligendi placeat, quae dolorum pariatur doloribus odit repudiandae delectus praesentium, labore officiis consequuntur laboriosam a? Architecto ullam debitis commodi.</p>
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
                            <span className="ml-1 text-sm sm:text-md">Réservez</span>{" "}
                        </div>
                    </Link>
                </div>
            </div>
            {/* <div className="bg-black">
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="mt-4 md:mt-0 text-white">
                        <h2 className="text-novis_yellow mb-4  text-2xl md:text-4xl tracking-tight font-saudagar">We didn't reinvent the wheel</h2>
                        <p className="mb-4">We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.</p>
                        <p>We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <img className="w-full rounded-lg row-span-2" src="/images/coworking/Bureaux privés/Bureau prospérité/Bureau Prospérité 2.jpg" alt="office content 1" />
                        <img className="mt-4 w-full lg:mt-10 rounded-lg" src="/images/coworking/Bureaux privés/Bureau détermination/IMG_5236[1].jpg" alt="office content 2" />
                        <img className="mt-4 w-full lg:mt-10 rounded-lg" src="/images/coworking/Bureaux privés/Bureau détermination/IMG_5236[1].jpg" alt="office content 2" />
                    </div>
                </div>
            </div> */}
            <AnimatedGridPattern
                numSquares={50}
                maxOpacity={0.1}
                duration={2}
                repeatDelay={1}
                className={
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] inset-x-0 w-full  h-[100%]"
                } />
        </section>

    )
}
