import { LucideIcon } from "lucide-react";
import { Icons } from "@/components/icons";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

// Fonction pour créer un menu
function createMenu(href: string, label: string, icon: LucideIcon, submenus: Submenu[], pathname: string): Menu {
  return {
    href,
    label,
    active: pathname.includes(href),
    icon,
    submenus
  };
}

// Fonction principale pour obtenir la liste des menus
export function getMenuList(pathname: string): Group[] {
  const menus = [
    {
      groupLabel: "",
      href: "/",
      label: "Accueil",
      icon: Icons.home,
      submenus: []
    },


    {
      groupLabel: "",
      href: "/our_services",
      label: "Nos services",
      icon: Icons.space,
      submenus: [
        { href: "/our_spaces", label: "Tous nos espaces", active: pathname === "/our_spaces" },
        { href: "/our_spaces/private_offices", label: "Réservation de billet d'avion", active: pathname === "/our_spaces/private_offices" },
        { href: "/our_spaces", label: "Commerce générale", active: pathname === "/our_spaces" },
        { href: "/private_offices", label: "Location de voiture", active: pathname === "/private_offices" },
        { href: "/contact_us", label: "Conciergérie", active: pathname === "/contact_us" },
      ]
    },

    {
      groupLabel: "",
      href: "/boutique",
      label: "boutique",
      icon: Icons.library,
      submenus: [
        { href: "/our_offers/description", label: "produits hygiénique", active: pathname === "/our_offers/description" },
        { href: "/our_product/descriptionallspaceprod", label: "Accessoires de voyage", active: pathname === "/our_product/description" },
      ]
    },


    {
      groupLabel: "",
      href: "/about",
      label: "Qui sommes-nous ?",
      icon: Icons.about,
      submenus: []
    },
    {
      groupLabel: "",
      href: "/contact_us",
      label: "Contactez-nous",
      icon: Icons.phone,
      submenus: []
    },
  ];

  return menus.map(({ groupLabel, href, label, icon, submenus }) => ({
    groupLabel,
    menus: [createMenu(href, label, icon, submenus, pathname)]
  }));
}