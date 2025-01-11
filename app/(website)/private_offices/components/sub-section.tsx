import { Icons } from "@/components/icons";
import GridPattern from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";

export default function SubSection() {

    return (
        <section className="relative">
            <div className="container grid grid-cols-2 gap-4 md:grid-cols-4 py-8 md:py-4 bg-black text-white">
                <p className="font-medium text-xs md:text-sm"><Icons.laptop className="size-4 md:size-6 mb-2" />Postes équipés</p>
                <p className="font-medium text-xs md:text-sm"><Icons.key className="size-4 md:size-6 mb-2" />Salles de réunion privées</p>
                <p className="font-medium text-xs md:text-sm"><Icons.space className="size-4 md:size-6 mb-2" />Espaces de Coworking</p>
                <p className="font-medium text-xs md:text-sm"><Icons.building className="size-4 md:size-6 mb-2" />Domiciliation et services dédiés</p>
            </div>
            <GridPattern
                squares={[
                    [4, 4],
                    [5, 1],
                    [8, 2],
                    [5, 3],
                    [5, 5],
                    [10, 10],
                    [12, 15],
                    [15, 10],
                    [10, 15],
                    [15, 10],
                    [10, 15],
                    [15, 10],
                ]}
                className={cn(
                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                    "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                )}
            />
        </section>
    );
}
