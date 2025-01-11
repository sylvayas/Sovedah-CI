import { Icons } from "@/components/icons";
import GridPattern from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";

export default function SubSection() {
  return (
    <section className="relative">
      <div className="py-8 px-4 md:px-16 mx-auto max-w-screen-xl container lg:py-16">
        <div className="max-w-screen-lg text-gray-700 sm:text-lg">
          <h2 className="mb-4 text-4xl tracking-tight font-bold font-saudagar">
            Novis coworking vous propose de découvrir ses espaces de travail
            flexibles et économiques à Abidjan.
          </h2>
          <p className="text-custom-justify">
            <p className="mb-4 font-light text-sm">
              Près du rond-point de la Y4 dans le quartier de st Viateur à
              Cocody,{" "}
              <b className="font-medium">
                Novis coworking met à votre disposition des bureaux en location
                pour la domiciliation physique de votre entreprise.
              </b>{" "}
              Vous y trouverez dans cet espace fonctionnel une salle de réunion
              de 10 voir 14 personnes. <br /> <br />
              La Côte-d&apos;Ivoire étant un pays très attractif pour faire du
              business , vous pourrez également venir y passer vos moments de
              travail et y organiser tous vos rendez-vous.
            </p>
            <p className="mb-4 text-sm  font-light ">
              De la domiciliation virtuelle à la domiciliation physique des
              entreprises, il s&apos;agit d&apos;un tiers lieu qui favorise la
              rencontre entre entrepreneurs de différents secteurs
              d&apos;activités.
              <br /> Les associations y trouvent également un siège social et
              des espaces meublés, équipés pour accueillir des activités et
              programmes.
            </p>
            <p className="mb-4 font-light text-sm">
              Sachez que vous pourrez également profiter d&apos;espaces
              événementiels privatisables en fonction de vos envies et projets.{" "}
              <br />
              Une connexion internet, une papeterie, une imprimante, un
              distributeur de boisson froide, un coin café etc … vous mettrons
              dans des conditions optimales pour travailler et développer votre
              entreprise.
            </p>
          </p>
          {/* <a href="#" className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
                        Learn more
                        <svg className="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    </a> */}
        </div>
      </div>

      {/* <div className="container grid grid-cols-2 gap-4 md:grid-cols-4 py-8 md:py-4 bg-black text-white">
                <p className="font-medium text-xs md:text-sm"><Icons.laptop className="size-4 md:size-6 mb-2" />Postes équipés</p>
                <p className="font-medium text-xs md:text-sm"><Icons.key className="size-4 md:size-6 mb-2" />Salles de réunion privées</p>
                <p className="font-medium text-xs md:text-sm"><Icons.space className="size-4 md:size-6 mb-2" />Espaces de Coworking</p>
                <p className="font-medium text-xs md:text-sm"><Icons.building className="size-4 md:size-6 mb-2" />Domiciliation et services dédiés</p>
            </div> */}
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
