import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ClipboardCheck,
  Copy,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  User,
  X,
  Phone,
  Home,
  LampDesk,
  Calendar,
  Network,
  LandPlot,
  SquareParking,
  Building2,
  Contact,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  UserRound,
  SwatchBook,
  Megaphone,
  Bookmark,
  KeyRound,
  Stars,
  Cloud,
  DollarSign,
  PartyPopperIcon,
} from "lucide-react";
import Galerie from "./Galerie";

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons: any = {
  logo: ({ className, ...props }: { className: string }) => (
    <img
      src="/images/logo_sovedah_white.jpg"
      alt="NOVIS CO-WORKING"
      className={className}
      {...props}
    />
  ),
  logo_rogner: ({ className, ...props }: { className: string }) => (
    <img
      src="/images/logo_sovedah_original.png"
      alt="NOVIS CO-WORKING"
      className={className}
      {...props}
    />
  ),
  logo_black: ({ className, ...props }: { className: string }) => (
    <img
      src="/images/logo_sovedah_original.png"
      alt="NOVIS CO-WORKING"
      className={className}
      {...props}
      
    />
  ),
  logo_black_rogner: ({ className, ...props }: { className: string }) => (
    <img
      src="/images/logo-1_1.png"
      alt="NOVIS CO-WORKING"
      className={className}
      {...props}
    />
  ),
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: (props: IconProps) => (
    <svg
      fill="none"
      stroke="currentColor"
      width="11"
      height="11"
      viewBox="0 0 10 10"
      aria-hidden="true"
      strokeWidth="1.5"
      className="-mr-0.5"
      strokeLinecap="round"
      {...props}
    >
      <path
        className="opacity-0 transition group-hover:opacity-100"
        d="M0 5h7"
        strokeLinecap="round"
      ></path>
      <path
        className="transition group-hover:translate-x-[3px]"
        d="M1 1l4 4-4 4"
        strokeLinecap="round"
      ></path>
    </svg>
  ),
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  check: Check,
  copy: Copy,
  copyDone: ClipboardCheck,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  phone: Phone,
  home: Home,
  space: LampDesk,
  calendar: Calendar,
  network: Network,
  landPlot: LandPlot,
  parking: SquareParking,
  building: Building2,
  contact: Contact,
  linkedIn: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  group: UserRound,
  library: SwatchBook,
  marketing: Megaphone,
  about: Bookmark,
  galerie :PartyPopperIcon,
  key: KeyRound,
  stars: Stars,
  cloud: Cloud,
  flex: PartyPopperIcon,
  eco: DollarSign,
};
