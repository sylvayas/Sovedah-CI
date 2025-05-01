import { Icons } from "@/components/icons";
import GridPattern from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import Services from "./services"

export default function About() {
  return (
    <section className="container min-h-96 py-14 relative">
      <div className="grid xl:grid-cols-2 gap-8 text-sm px-8">
        <div className="grid grid-rows-2 gap-8 items-start w-full xl:w-3/4">
          <div className="flex gap-2 items-center">
            <Icons.logo className="size-24" />
            <p className="md:text-xl"> <span className="font-saudagar">SOVEDAH CI</span> votre partenaire vers l’Excellence.</p>
          </div>
          <div>Voyagez en toute sérénité avec notre service de réservation de billets d’avion, facilitez vos déplacements grâce à la location de voiture, optimisez vos affaires avec notre commerce général, et libérez-vous du stress grâce à notre conciergerie sur mesure.</div>
        </div>
        <div className="grid grid-rows-2 ">
          <p><span className="font-semibold text-3xl ">SOVEDAH CI</span> vous propose une gamme complète de services adaptés à vos besoins, incluant la réservation de billets d&apos;avion, 
          Que vous recherchiez un espace de travail partagé ou privé, modulable et entièrement personnalisable, nous vous offrons une solution clé en main en Côte d&apos;Ivoire, idéale pour les porteurs de projets avant ou après leur immatriculation au CEPICI.
          </p>
          <p>
          le commerce général, la location de voitures, la conciergerie et désormais la location de bureaux flexibles.
          Que vous recherchiez un espace de travail partagé ou privé, modulable et entièrement personnalisable, nous vous offrons une solution clé en main en Côte d&apos;Ivoire, idéale pour les porteurs de projets avant ou après leur immatriculation au CEPICI.

          </p>
        </div>
      </div>
      <GridPattern
        squares={[
          [2, 2],
          [3, 1],
          [4, 1],
          [2, 1],
          [3, 3],
          [5, 5],
          [6, 8],
          [8, 5],
          [5, 4],
          [4, 5],
          [5, 4],
          [4, 5],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-full skew-y-12",
        )}
      />
      <Services />
    </section>
  );
}
