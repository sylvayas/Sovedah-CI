
import NumberTicker from "@/components/magicui/number-ticker";
import { Icons } from "@/components/icons";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";


export default function Statistiques() {
  return (
    <section className="container min-h-[300px] py-14 relative">
      <div className=" flex flex-col gap-8 md:gap-12">
        <h3 className="text-center text-2xl font-saudagar font-semibold md:text-3xl text-black/70">
          NOVIS CO-WORKING en quelques chiffres
        </h3>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-12">
          <div className="flex flex-col gap-2 md:gap-4 items-center">
            <div className="bg-novis_green ring-novis_yellow ring-1 aspect-square h-10 md:h-12 flex justify-center items-center">
              <Icons.building className="text-white size-8 md:size-10" />
            </div>
            <p className="font-medium text-3xl md:text-4xl font-mono whitespace-pre-wrap tracking-tighter "><NumberTicker value={13} /></p>
            <p className="font-medium">Espaces de travail</p>
          </div>

          <div className=" flex flex-col gap-2 md:gap-4 items-center">
            <div className="bg-novis_green ring-novis_yellow ring-1 aspect-square h-10 md:h-12 flex justify-center items-center">
              <Icons.space className="text-white size-8 md:size-10" />
            </div>
            <p className="font-medium text-3xl md:text-4xl font-mono whitespace-pre-wrap tracking-tighter "><NumberTicker value={230} /> m²</p>
            <p className="font-medium">De bureaux</p>
          </div>

          <div className=" flex flex-col gap-2 md:gap-4 items-center">
            <div className="bg-novis_green ring-novis_yellow ring-1 aspect-square h-10 md:h-12 flex justify-center items-center">
              <Icons.contact className="text-white size-8 md:size-10" />
            </div>
            <p className="font-medium text-3xl md:text-4xl font-mono whitespace-pre-wrap tracking-tighter "><NumberTicker value={150} /></p>
            <p className="font-medium">Clients</p>
          </div>

          <div className=" flex flex-col gap-2 md:gap-4 items-center">
            <div className="bg-novis_green ring-novis_yellow ring-1 aspect-square h-10 md:h-12 flex justify-center items-center">
              <Icons.user className="text-white size-8 md:size-10" />
            </div>
            <p className="font-medium text-3xl md:text-4xl font-mono whitespace-pre-wrap tracking-tighter "><NumberTicker value={350} /></p>
            <p className="font-medium">Utilisateurs</p>
          </div>


        </div>
      </div>
      <AnimatedGridPattern
        numSquares={100}
        maxOpacity={0.1}
        duration={2}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[150%]",
        )}
      />
    </section>
  );
}
