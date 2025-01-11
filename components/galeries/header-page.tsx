import { Icons } from "@/components/icons";
import Image from "next/image";

export default function HeaderPage({ galerie }: { galerie: any }) {
  // Vérifiez si 'galerie' est défini
  if (!galerie) {
    return <div>Chargement...</div>; // ou un message d'erreur
  }

  return (
    <>
      <section className="relative">
        <div className="container px-0 relative max-w-[1400px]">
          <div className="relative z-[2] flex flex-col md:flex-row md:gap-x-8 justify-between bg-black/30 py-8 px-4 sm:py-16 lg:px-8">
            <div className="max-w-screen-sm text-white text-center md:text-left">
              <h2 className="font-saudagar mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight font-semibold">
                {galerie.title || "Titre non disponible"}
              </h2>
              <div className="relative text-sm md:text-lg w-fit mx-auto md:mx-0 mb-8 font-semibold italic">
                <p>{galerie.subdescription || "Description non disponible"}</p>
                <div className="h-1 w-full md:w-9/12 bg-novis_yellow"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:gap-4">
              {galerie.options && galerie.options.length > 0 ? (
                galerie.options.map((option: string, key: number) => (
                  <div
                    key={key}
                    className="flex min-w-64 gap-2 bg-novis_yellow rounded-sm p-2 text-white"
                  >
                    <Icons.stars className="size-4 md:size-6" />
                    <p className="font-medium text-sm font-mono whitespace-pre-wrap tracking-tighter">
                      {option}
                    </p>
                  </div>
                ))
              ) : (
                <p></p>
              )}
            </div>
          </div>
          {/* Image de fond */}
          {galerie.image ? (
            <Image
              fill
              src={galerie.image}
              alt="Image de fond"
              className="object-cover"
            />
          ) : (
            <div className="h-64 bg-gray-300">Image non disponible</div>
          )}
        </div>
      </section>
    </>
  );
}