import { LucideIcon } from "lucide-react";
import { Icons } from "@/components/icons";

type Submenu = {
    href?: string; // Make href optional
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
            href: "/our_spaces",
            label: "Nos espaces",
            icon: Icons.space,
            submenus: [
                { href: "/our_spaces", label: "Tous nos espaces", active: pathname === "/our_spaces" },
                { href: "/our_spaces/private_offices", label: "Bureaux privés", active: pathname === "/our_spaces/private_offices" },
                { href: "/our_spaces/open_space", label: "Open-space", active: pathname === "/our_spaces/open_space" },
                { href: "/our_spaces/meeting_room", label: "Salle de réunion", active: pathname === "/our_spaces/meeting_room" },
                { href: "/our_spaces/common_space", label: "Espaces Commun", active: pathname === "/our_spaces/common_space" },
            ]
        },
        {
            groupLabel: "",
            href: "/our_offers",
            label: "Nos offres",
            icon: Icons.library,
            submenus: [
                { href: "/our_offers/domiciliation_virtuelle_entreprise", label: "Domiciliation virtuelle d'entreprise", active: pathname === "/our_offers/domiciliation_virtuelle_entreprise" },
                { href: "/our_offers/domiciliation_physique_entreprise", label: "Domiciliation physique d'entreprise", active: pathname === "/our_offers/domiciliation_physique_entreprise" },
                { href: "/our_offers/location_occasionnelle_de_bureaux_meubles", label: "Location occasionnelle de bureaux meublés", active: pathname === "/our_offers/location_occasionnelle_de_bureaux_meubles" },
                { href: "/our_offers/location_salle_de_reunion", label: "Location salle de réunion", active: pathname === "/our_offers/location_salle_de_reunion" },
                { href: "/our_offers/location_espace_evenementiel", label: "Location espace évènementiel", active: pathname === "/our_offers/location_espace_evenementiel" },
                { href: "/our_offers/location_espace_tournage", label: "Location espace tournage", active: pathname === "/our_offers/location_espace_tournage" },
            ]
        },
        {
            groupLabel: "",
            href: "/our_galeries",
            label: "Galerie",
            icon: Icons.galerie,
            submenus: [
                { href: "/our_galeries/evenements_collaboratifs", label: "Événements Collaboratifs", active: pathname === "/our_galeries/evenements_collaboratifs" },
                { href: "/our_galeries/article_de_presse", label: "Article de Presse", active: pathname === "/our_galeries/article_de_presse" },
                // Plain text entry
                { label: "Événement à venir", active: false }, // No href, active is set to false
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