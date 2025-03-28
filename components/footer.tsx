"use client";

import { Icons } from "@/components/icons";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMenuList } from "@/config/menu-list";

export default function Footer() {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <section className="container px-0 xl:px-8 bg-novis_green min-h-[50vh] h-fit xl:h-[500px] relative">
      <div className="flex flex-col xl:flex-row xl:h-full relative w-full xl:items-stretch gap-8">
        <div className="py-14 w-full xl:w-[350px] bg-[#1A557A] flex flex-col gap-4 px-4 sm:px-8 md:px-10 md:gap-6 items-center xl:items-start justify-center">
          <Icons.logo_black className="size-25" />
          <p className="text-white text-sm w-4/5 sm:w-3/4 md:w-1/2 text-center xl:text-left xl:w-full">
            Des aménagements attractifs, conçus pour la collaboration et le développement des réseaux professionnels.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com//profile.php?id=61553900900562" target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-novis_green ring-1 ring-novis_yellow bg-white flex justify-center items-center">
              <Icons.facebook className="size-6" />
            </a>
            <a href="https://www.linkedin.com/company/novis-co-working" target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-novis_green ring-1 ring-novis_yellow bg-white flex justify-center items-center">
              <Icons.linkedIn className="size-6" />
            </a>
            <a href="https://www.instagram.com/noviscoworking" target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-novis_green ring-1 ring-novis_yellow bg-white flex justify-center items-center">
              <Icons.instagram className="size-6" />
            </a>
            <a href="https://twitter.com/noviscoworking" target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-novis_green ring-1 ring-novis_yellow bg-white flex justify-center items-center">
              <Icons.twitter className="size-6" />
            </a>
            <a href="https://www.youtube.com/@NovisCoworking" target="_blank" rel="noopener noreferrer" className="p-1 rounded-full text-novis_green ring-1 ring-novis_yellow bg-white flex justify-center items-center">
              <Icons.youtube className="size-6" />
            </a>
          </div>
        </div>

        <div className="pb-14 px-4 flex-1 grid md:grid-cols-3 gap-8 xl:place-content-center">
          <div className="text-white">
            <h3 className="text-lg font-semibold uppercase">{menuList[1].menus[0].label}</h3>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-1">
              {menuList[1].menus[0].submenus.slice(1).map((item) => (
                <Link key={item.label} href={item.href || '#'} className="hover:font-semibold transition-all duration-200">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-white">
            <h3 className="text-lg font-semibold uppercase">{menuList[2].menus[0].label}</h3>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-1">
              {menuList[2].menus[0].submenus.map((item) => (
                <Link key={item.label} href={item.href || '#'} className="hover:font-semibold transition-all duration-200">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-white">
            <h3 className="text-lg font-semibold">SOVEDAH CI</h3>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-1">
              {menuList[3].menus[0].href && (
                <Link href={menuList[3].menus[0].href} className="hover:font-semibold transition-all duration-200">
                  {menuList[3].menus[0].label}
                </Link>
              )}
              {menuList[4].menus[0].href && (
                <Link href={menuList[4].menus[0].href} className="hover:font-semibold transition-all duration-200">
                  {menuList[4].menus[0].label}
                </Link>
              )}
            </div>
          </div>

          {/* Section Adresse et RCC */}
          <div className="text-white">
            <h3 className="text-lg font-semibold">INFORMATIONS</h3>
            <div className="mt-2">
              <p className="whitespace-nowrap">
                Adresse :171 KSSI ZOE-BRUNO BS 22 IIOT 16, ABIDJAN, CÔTE D'IVOIRE
              </p>
              <p className="whitespace-nowrap">
                RCCM :CI-ABJ-03-2024-B13-02727 / N° CC : 2400985R
              </p>
            </div>
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
          "inset-x-0 w-full h-[100%]",
        )}
      />
    </section>
  );
}