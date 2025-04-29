import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image"
import Marquee from "@/components/magicui/marquee";


export interface ShowcaseCardProps {
  title: string;
  image: string;
  href: string;
  affiliation?: string;
}

const datas: {
  image: string;
  title: string;
  href: string;
}[] = [
    {
      image: "/images/accessoire_voyage/Un cadenas TSA.jpg",
      title: "Cadenas TSA ",
      href: "/our_spaces/private_offices",
    },
    {
      image: "/images/accessoire_voyage/chaussette voyage 2.jpg",
      title: "Chaussette voyage",
      href: "/our_spaces/open_space",
    },
    {
      image: "/images/produits&details/ultra_doux.png",
      title: "Conforta Ultra doux",
      href: "/our_spaces/meeting_room",
    },
    {
      image: "/images/produits&details/serviettes-hygiéniques.jpg",
      title: "Lilas maternité super",
      href: "/our_spaces/common_space",
    },
  ]


export function ShowcaseCard({
  title,
  image,
  href,
  affiliation,
}: ShowcaseCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-2 group  w-[300px] xl:w-[250px] relative overflow-hidden cursor-pointer"
    >
      <Image
        src={image}
        alt={title}
        height={200}
        width={200}
        className="size-full object-cover max-h-[260px] xl:max-h-[300px] rounded-xl"
      />

      <div className="flex flex-col">
        <div className="group font-saudagar inline-flex cursor-pointer items-center justify-start gap-1 duration-200 hover:text-neutral-700 dark:hover:text-neutral-200 text-xl font-semibold text-neutral-700 dark:text-neutral-300">
          {title}
          <ChevronRightIcon className="size-4 translate-x-0 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
        </div>
        <p className="text-neutral-400 text-sm">{affiliation}</p>
      </div>
    </Link>
  );
}

export default function Showcase() {
  return (
    <section id="showcase" className="container py-14">
      <h2 className="text-[#1A557A] mb-2 text-center font-medium text-2xl md:text-4xl tracking-tight font-saudagar">
        Nos Espaces
      </h2>
      <h3 className="mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
        Des espaces de coworking en Côte-d&apos;Ivoire
      </h3>
      <div className="relative flex flex-col text-center">
        <Marquee pauseOnHover className="max-w-screen [--duration:40s]">
          {datas.map((data, index) => (
            <ShowcaseCard key={index} title={data.title}
              image={data.image}
              href={data.href}
              
            />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/12 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 h-full  w-1/12 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
}
