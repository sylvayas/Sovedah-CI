import { Icons } from "@/components/icons";
import NumberTicker from "@/components/magicui/number-ticker";
import Image from "next/image";


export default function HeaderPage() {

    return (
        <>
            <section className="relative ">
                <div className="container px-0 relative max-w-[1400px]">
                    <div className="relative z-[2] flex flex-col md:flex-row md:gap-x-8 justify-between bg-black/30 py-8 px-4 sm:py-16 lg:px-8">
                        <div className="max-w-screen-sm text-white text-center md:text-left">
                            <h2 className="mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight font-semibold">
                                Réservez maintenant votre espace co-working en toute simplicité</h2>
                            <p className="mb-8 font-light text-xs sm:text-sm">Bienvenue au sein des espaces de Novis coworking à Cocody : coworking, location de bureaux privés dans des bâtiments neufs, propre et moderne.</p>
                        </div>
                       
                    </div>
                    {/* image background */}
                 
                </div>
            </section >
         
        </>
    );
}
