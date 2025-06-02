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
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-novis_green min-h-[30vh] h-fit">
      <div className="container px-4 sm:px-6 lg:px-8 py-12 mx-auto max-w-screen-2xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Logo and Social Media Section */}
          <div className="py-8 w-full lg:w-80 bg-[#1A557A] flex flex-col gap-6 px-4 sm:px-6 lg:px-8 items-center lg:items-start justify-center rounded-lg">
            <Icons.logo_black className="w-32 h-auto" />
            <p className="text-white text-sm text-center lg:text-left">
              Des Solutions de Voyage et Services sur Mesure
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/share/12Mev9bjWhg/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitez notre page Facebook"
                className="p-2 rounded-full text-novis_green ring-1 ring-novis_yellow bg-white flex justify-center items-center hover:bg-novis_yellow transition-colors"
              >
                <Icons.facebook className="size-5" />
              </a>
              <a
                href="https://www.youtube.com/@sovedahci" // Replace with actual YouTube URL
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitez notre chaîne YouTube"
                className="p-2 rounded-full text-novis_green ring-1 ring-novis_yellow bg-white flex justify-center items-center hover:bg-novis_yellow transition-colors"
              >
                <Icons.youtube className="size-5" />
              </a>
            </div>
          </div>

          {/* Menu and Information Sections */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
            {/* Menu Section 1 */}
            <div className="text-white">
              <h3 className="text-lg font-semibold uppercase">{menuList[1]?.menus[0]?.label || "Services"}</h3>
              <div className="mt-4 space-y-2">
                {menuList[1]?.menus[0]?.submenus?.slice(1).map((item) => (
                  <Link
                    key={item.label}
                    href={item.href || "#"}
                    className="block text-sm hover:text-novis_yellow transition-colors"
                    aria-label={`Naviguer vers ${item.label}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Menu Section 2 */}
            <div className="text-white">
              <h3 className="text-lg font-semibold uppercase">{menuList[2]?.menus[0]?.label || "À Propos"}</h3>
              <div className="mt-4 space-y-2">
                {menuList[2]?.menus[0]?.submenus?.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href || "#"}
                    className="block text-sm hover:text-novis_yellow transition-colors"
                    aria-label={`Naviguer vers ${item.label}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Menu Section 3 */}
            <div className="text-white">
              <h3 className="text-lg font-semibold uppercase">SOVEDAH CI</h3>
              <div className="mt-4 space-y-2">
                {menuList[3]?.menus[0]?.href && (
                  <Link
                    href={menuList[3].menus[0].href}
                    className="block text-sm hover:text-novis_yellow transition-colors"
                    aria-label={`Naviguer vers ${menuList[3].menus[0].label}`}
                  >
                    {menuList[3].menus[0].label}
                  </Link>
                )}
                {menuList[4]?.menus[0]?.href && (
                  <Link
                    href={menuList[4].menus[0].href}
                    className="block text-sm hover:text-novis_yellow transition-colors"
                    aria-label={`Naviguer vers ${menuList[4].menus[0].label}`}
                  >
                    {menuList[4].menus[0].label}
                  </Link>
                )}
              </div>
            </div>

            {/* Informations Section */}
            <div className="text-white">
              <h3 className="text-lg font-semibold uppercase">INFORMATIONS</h3>
              <div className="mt-4 space-y-2">
                <p className="text-sm">
                  Adresse : 171 KSSI ZOE-BRUNO BS 22 IIOT 16, Abidjan, Côte d&apos;Ivoire
                </p>
                <p className="text-sm">
                  RCCM : CI-ABJ-03-2024-B13-02727
                </p>
                <p className="text-sm">
                  N° CC : 2400985R
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-6 text-center text-xs text-gray-300">
          © {year} Sovedah-CI. Tous droits réservés.{" "}
          <Link
            href="https://www.aitech-ci.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-gray-200 underline hover:text-novis_yellow"
            aria-label="Visiter le site d'AITECH-CI"
          >
           <span> By AITECH-CI</span>
          </Link>
        </div>
      </div>

      <AnimatedGridPattern
        numSquares={100}
        maxOpacity={0.1}
        duration={2}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "absolute inset-x-0 top-0 w-full h-full",
        )}
      />
    </footer>
  );
}