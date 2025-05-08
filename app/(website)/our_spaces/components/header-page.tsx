import { Icons } from "@/components/icons";
import NumberTicker from "@/components/magicui/number-ticker";
import Image from "next/image";


export default function HeaderPage() {

    return (
        <>
            <section className="relative p-9">
                <div className="container px-0 relative max-w-[1400px] h-[430px]">
                    <div className="relative z-[2] flex flex-col md:flex-row md:gap-x-8 justify-between h-[430px] bg-black/30 py-8 px-4 sm:py-16 lg:px-8">
                        <div className="max-w-screen-sm mt-10 text-white text-center md:text-left">
                            <h2 className="mb-4 mt-5 text-xl sm:text-2xl font-saudagar md:text-3xl lg:text-4xl tracking-tight font-semibold">
                            Vous cherchez des produits du quotidien, des articles pour la maison ou des essentiels pour bébé en un seul endroit ?   </h2>
                            <p className="mb-8 font-light text-xs sm:text-sm">Bienvenue chez Sovedah-CI</p>
                        </div>
                        
                    </div>
                    {/* image background */}
                    <Image
                        
                        src="/images/carrousel_images/commerce_general (2).jpg"
                        alt="vue"
                        layout="fill"  // Pour remplir la section
                        objectFit="cover"
                        quality={100} 
                        priority 
                        className="absolute inset-0 "
                    />
                </div>
            </section >
            
        </>
    );
}
