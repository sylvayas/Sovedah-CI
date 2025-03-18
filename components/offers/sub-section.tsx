import { Icons } from "@/components/icons";
import GridPattern from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";

export default function SubSection({ offre }: { offre: any }) {
  return (
    <section className="relative mb-14">
    
      {offre.solutions && (
        <div className="container flex flex-wrap justify-around py-8 md:py-4 bg-black text-white">
          {offre.solutions.map((solution: any, key: number) => {
            const Icon = Icons[solution.icon];
            return (
              <p key={key} className="font-medium text-xs md:text-sm">
                <Icon className="size-4 md:size-6 mb-2" />
                {solution.title}
              </p>
            );
          })}
        </div>
      )}

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
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </section>
  );
}
