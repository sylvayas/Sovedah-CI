import { Icons } from "@/components/icons";
import NumberTicker from "@/components/magicui/number-ticker";
import Image from "next/image";
import imgback from "@/public/images/coworking/coworking (1).jpg"

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
                        <div className=" flex flex-col gap-2 md:gap-4">
                            <div className="flex min-w-64 gap-2 bg-novis_yellow rounded-sm p-2 text-white">
                                <Icons.building className="size-4 md:size-6" />
                                <p className="font-medium text-sm font-mono whitespace-pre-wrap tracking-tighter "><NumberTicker className="text-white mr-2" value={13} />Espaces de travail</p>
                            </div>
                            <div className="flex min-w-64 gap-2 bg-novis_yellow rounded-sm p-2 text-white">
                                <Icons.laptop className="size-4 md:size-6" />
                                <p className="font-medium text-sm font-mono whitespace-pre-wrap tracking-tighter "><NumberTicker className="text-white mr-2" value={200} />Postes équipés</p>
                            </div>
                            <div className="flex min-w-64 gap-2 bg-novis_yellow rounded-sm p-2 text-white">
                                <Icons.space className="size-4 md:size-6" />
                                <p className="font-medium text-sm font-mono whitespace-pre-wrap tracking-tighter "><NumberTicker className="text-white mr-2" value={40} />Salles de réunion</p>
                            </div>
                        </div>
                    </div>
                    {/* image background */}
                    <Image
                        fill
                        src={imgback}
                        alt="img back"
                        placeholder={"blurDataURL" in imgback ? "blur" : undefined}
                        className=" object-cover"
                    />
                </div>
            </section >
            <section className="relative">
                <div className="container grid grid-cols-2 gap-4 md:grid-cols-4 py-2 md:py-4 bg-gray-200">
                    <p className="font-medium text-xs md:text-sm">Domiciliation d&apos;entreprises </p>
                    <p className="font-medium text-xs md:text-sm">Location de bureaux </p>
                    <p className="font-medium text-xs md:text-sm">Location de salle de réunion</p>
                    <p className="font-medium text-xs md:text-sm">Location de salle de conférence</p>
                </div>
            </section>
        </>
    );
}
