import NumberTicker from "@/components/magicui/number-ticker";
import { Icons } from "@/components/icons";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import TitleSection from "@/components/title-section"


export default function SpaceStates() {
    return (
        <section className="container min-h-[300px] py-14 relative">
            <TitleSection title={"Abidjan la capitale en quelques chiffres "} />

            <div className="mt-8 px-8 grid md:grid-cols-3 gap-8 lg:gap-12 xl:place-content-center">
                <div className="">
                    <h3 className="text-lg font-semibold text-novis_green">Déplacements</h3>
                    <ul className="mt-2 grid grid-cols-1 list-disc">
                        <li>77 km de lignes de tramway</li>
                        <li>1 425 km d&apos;aménagements cyclables</li>
                        <li>26 510 km de voirie gérés et entretenus</li>
                        <li>1 aéroport international qui dessert 77 destinations dans 21 pays</li>
                        <li>1 gare avec 17 trains en partance pour Paris chaque jour</li>
                    </ul>
                </div>
                <div className="">
                    <h3 className="text-lg font-semibold text-novis_green">Économie et emploi</h3>
                    <ul className="mt-2 grid grid-cols-1 list-disc">
                        <li>4 pôles de compétitivité labellisés et 15 clusters</li>
                        <li>450 000 emplois</li>
                        <li>2 universités</li>
                        <li>16 grandes écoles</li>
                    </ul>
                </div>
                <div className="">
                    <h3 className="text-lg font-semibold text-novis_green">Cadre de vie</h3>
                    <ul className="mt-2 grid grid-cols-1 list-disc">
                        <li>140 km de balades balisés GR©</li>
                        <li>150 parcs et espaces naturels</li>
                        <li>551 espèces de faune et 1 285 espèces de flore répertoriées</li>
                        <li>17 œuvres du programme « L&apos;art dans la ville »</li>
                        <li>92% des déchets valorisés sous forme de matière biologique et énergétique</li>
                    </ul>
                </div>

            </div>
        </section>

    );
}
