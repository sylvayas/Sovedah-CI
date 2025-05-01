
import NumberTicker from "@/components/magicui/number-ticker";
import { Icons } from "@/components/icons";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button";


export default function Faqs() {
  return (
    <section className="container min-h-[200px] py-14 relative">
      <div className="flex flex-col gap-4  md:gap-6">
        <h3 className="text-center font-saudagar text-2xl md:text-3xl text-novis_green">
          Envie d&apos;e voyagez ou de disposer d&apos;un quelquonce services ? Nous sommes là pour vous !
        </h3>
        <p className="text-sm text-novis_green text-center">Un billet d&apos;avion ? des produits de qualités ? Un beau vehicule de location <br />
          Parlons-en et trouvons ensemble ce qui vous conviennent !</p>
      </div>
      <div className="mt-12 flex flex-col items-center md:flex-row gap-4 md:gap-6 md:justify-evenly">
        <Link
          className={cn(
            buttonVariants(),
            "max-w-52 gap-2 overflow-hidden whitespace-pre",
            "group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
          )}
          
          href={"/contact_us"}
        >
          <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
          <div className="flex items-center">
            <span className="ml-1">Prendre rendez-vous</span>
          </div>
        </Link>
        <div className=""><Icons.logo className="size-24 mb-4" /></div>
        <Link
          className={cn(
            buttonVariants(),
            "max-w-52 gap-2 overflow-hidden whitespace-pre",
            "group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
          )}
          
          href={"/contact_us"}
        >
          <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
          <div className="flex items-center">
            <span className="ml-1">Souscrire</span>
          </div>
        </Link>
      </div>
    </section>
  );
}