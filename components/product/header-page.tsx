import { Icons } from "@/components/icons";
import NumberTicker from "@/components/magicui/number-ticker";
import Image from "next/image";
import imgback from "@/public/images/coworking/coworking (1).jpg"
import { cn } from "@/lib/utils";

export default function HeaderPage() {

    return (
        <>
            <section className="relative p-8">
                <div className={cn("h-[80vh] md:h-[600px] xl:h-[450px] relative container px-0 max-w-[1400px]")}>
                    <div className="absolute z-[3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center flex-col gap-8 max-w-5xl w-full">
                        <div className="max-w-screen-sm text-white text-center md:text-left">
                            <h2 className="mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight font-semibold">
                                Besoin d&apos;un produit ? Commandez en ligne et recevez-le sans bouger de chez vous !
                            </h2>
                            <p className="mb-8 font-light text-xs sm:text-sm">Bienvenue </p>
                        </div>
                     
                    </div>
                    {/* image background */}
                   <Image
                                         
                      src="/images/boutique/boutique general.jpg"
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
