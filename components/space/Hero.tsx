import React from 'react';

import Image from "next/image";
export default function Hero(

) {
    return (
        <section className="relative p-5">
        <div className="container h-[60vh] md:h-[400px] xl:h-[450px] px-0 relative max-w-[1400px]">
            <div className="relative z-[2] flex flex-col md:flex-row md:gap-x-8 justify-between h-[60vh] md:h-[400px] xl:h-[450px] bg-black/30 py-8 px-4 sm:py-16 lg:px-8">
                <div className="max-w-screen-sm text-white text-center mt-16 md:text-left">
                    <h2 className="mb-4 text-xl sm:text-2xl font-saudagar md:text-3xl lg:text-4xl tracking-tight font-semibold">
                    Prêt pour votre prochain voyage ? Réservez votre billet d&apos;avion dès maintenant a Sovedah! </h2>
                    <p className="mb-8 font-light text-xs sm:text-sm">Bienvenue au sein de Sovedah-CI</p>
                </div>
            </div>
            {/* image background */}
            <Image
                src="/images/avion/airbus.jpg"
                alt="vue"
                 layout="fill"  // Pour remplir la section
                 objectFit="cover"
                 quality={100} 
                 priority 
                className="absolute inset-0 "
            />
        </div>
    </section >
    
    );
}