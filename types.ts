interface NavItem {
    title: string;
    href: string;
    items?: NavItem[];
    label?: string;
    event?: string;
    external?: boolean;
    paid?: boolean;
    disabled?: boolean;
}

interface MainNav {
    title: string;
    href: string;
    external?: boolean;
    event?: string;
}

interface SidebarNavItem extends NavItem {
    title: string;
    items: NavItem[];
}

interface SidebarNavSection {
    title: string;
    href?: string;
    items: SidebarNavItem[];
}

interface SidebarNav {
    sidebarNav: SidebarNavSection[];
}

interface NavigationData {
    mainNav: MainNav[];
    sidebarNav: SidebarNavSection[];
}

interface I_SpaceCard {
    id: string,
    title: string;
    imagePath: string;
}
interface List_SpaceCard {
    title: string;
    id: string,
    items: I_SpaceCard[];
}

export interface FormulaEmailData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAdresse: string;
  date: string;
  category: string;
  quantity:string;
  productTitle:string;
  productDescription:string;

}

export interface AccessoiresData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAdresse: string;
  date: string;
  quantity:string;
  productTitle:string;
  productDescription:string;

}

export interface BilletData {
  clientName: string;
  clientLastname:string,
  clientEmail: string;
  clientPhone: string;
  dateNaissance: string;
  nationality: string;
  sexe:string;
  typePiece:string;
  numeroPiece:string;
  date: string;
  travelOption:string;
  passengerCount:string;
  departureCountry:string;
  arrivalCountry:string;
}

export interface VoiturelocationEmailData {
  clientName: string;
  clientLastname:string;
  clientEmail: string;
  clientPhone: string;
  drivingLicense: string;
  address: string;
  vehicleModel: string;
  reservationDate:string;
  vehicleCategory:string;

}