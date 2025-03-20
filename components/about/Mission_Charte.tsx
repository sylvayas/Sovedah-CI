import TitleSection from '@/components/title-section'
import React from 'react'
import { BorderBeam } from "@/components/magicui/border-beam";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils"


export default function Missiion_Charte() {
    return (
        <section className="container min-h-[300px] py-14 relative">
            {/* <TitleSection title={"Nos différents espaces situés à Cocody"} /> */}
            <div className="bg-black">
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="mt-4 md:mt-0 text-white">
                        <h2 className="text-novis_yellow mb-4  text-2xl md:text-4xl tracking-tight font-saudagar">NOTRE MISSION</h2>
                        <p className='font-light text-sm text-gray-100 mb-4'><span className='font-semibold'>Offrir des espaces flexibles et inspirants : </span>Mettre à disposition des espaces de travail ergonomiques, inspirants et adaptés aux besoins des professionnels, des startups et des entreprises.</p>
                        <p className='font-light text-sm text-gray-100 mb-4'><span className='font-semibold'>Fournir un environnement de travail collaboratif : </span>Encourager la collaboration, l&apos;échange d&apos;idées et la création d&apos;une communauté professionnelle dynamique au sein de l&apos;espace de coworking. </p>
                        <p className='font-light text-sm text-gray-100 mb-4'><span className='font-semibold'>Faciliter la croissance des entreprises et des entrepreneurs : </span>Fournir un écosystème qui favorise le développement des entreprises, en offrant des ressources, un réseau et un soutien pour favoriser la croissance économique. </p>
                        <p className='font-light text-sm text-gray-100 mb-4'><span className='font-semibold'>Promouvoir l&apos;innovation et l&apos;entrepreneuriat : </span>Encourager l&apos;innovation, la créativité et l&apos;entrepreneuriat en offrant un environnement propice à la transformation des idées en projets concrets.</p>
                    </div>
                 
                </div>
            </div>
            <div className="relative gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <img className="w-full" src="/images/coworking/Bureaux privés/Bureau confiance/img (2).jpg" alt="dashboard image" />
                <div className="mt-4 md:mt-0">
                    <h2 className="mb-4  text-2xl md:text-4xl tracking-tight font-saudagar">NOTRE CHARTE QUALITE</h2>
                    <p className="mb-6 font-light text-novis_orange text-lg">« A VOTRE SERVICE » </p>
                    <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Toute l&apos;équipe est formée et à votre entière disposition pour vous permettre de vivre une belle expérience.</p>
                </div>
            </div>
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h2 className="mb-4 text-4xl tracking-tight leading-tight text-novis_orange font-saudagar">NOTRE PROMESSE</h2>
                    <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">Des solutions de bureaux sur mesure <span className='font-semibold'>(court, moyen, long terme)</span> afin que vous puissiez réellement adapter votre espace de travail <span className='font-semibold'>en fonction de votre activité.</span></p>
                </div>
            </div>

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
