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
            <p className="md:text-xl"> <span className="font-saudagar">NOVIS COWORKING</span> se charge de positionner votre entreprise au niveau de l&apos;Excellence grâce à vos bureaux.</p>
          </div>
          <div>Dites au revoir aux espaces de travail traditionnels et vos tracas du quotidien pour votre immobilier d&apos;entreprise  !</div>
        </div>
        <div className="grid grid-rows-2 gap-8">
          <p><span className="font-saudagar">NOVIS COWORKING</span> c&apos;est la location de bureaux flexibles (partagés comme privés, modulables et personnalisables selon vos souhaits). Une solution clé en main pour les porteurs de projets en Côte-d&apos;Ivoire avant ou après leur immatriculation au CEPICI. NOVIS COWORKING vous offre pendant votre passage une connexion internet Premium, une propreté de vos locaux irréprochable ainsi qu&apos;une équipe dédiée à vos petits soins.
          </p>
          <p>Un tarif sans surprise, possibilité d&apos;obtenir des prestations à la carte. Optez maintenant et aujourd&apos;hui pour la sérénité en installant votre entreprise chez nous à Abidjan. AKWABA
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
