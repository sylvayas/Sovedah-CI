"use client"

import { Icons } from "@/components/icons";
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { useEffect, useState } from 'react';
import { AnimatedListSpace } from "./AnimatedListSpace";


const features = [
  {
    Icon: FileTextIcon,
    name: "Bureaux privés",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Réserver l'espace",
    className: "col-span-3 lg:col-span-1",
    imagePath: "coworking/Bureaux privés/Bureau détermination",
  },
  {
    Icon: BellIcon,
    name: "Open space",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Réserver l'espace",
    className: "col-span-3 lg:col-span-2",
    imagePath: "coworking/Espace Bulle Open space",
  },
  {
    Icon: Share2Icon,
    name: "Salle de réunion",
    description: "Supports 100+ integrations and counting.",
    href: "#",
    cta: "Réserver l'espace",
    className: "col-span-3 lg:col-span-2",
    imagePath: "coworking/Salle de réunion",
  },
  {
    Icon: CalendarIcon,
    name: "Espace commun",
    description: "Use the calendar to filter your files by date.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Réserver l'espace",
    imagePath: "coworking/Espace commun",
  },
];

export default function MapSpaces() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <Item key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}

const Item = ({ Icon, name, description, href, cta, className, imagePath }: {
  Icon: any;
  name: string;
  description: string;
  href: string;
  cta: string;
  className: string;
  imagePath: string;
}) => {


  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (imagePath) {
      fetch(`/api/images?subfolder=${imagePath}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            console.error(data.error);
          } else {
            setImages(data);
          }
        });
    }
  }, [imagePath]);

  const feature = {
    Icon,
    name,
    description,
    href,
    cta,
    className,
    background: <AnimatedListSpace images={images} className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_70%)] group-hover:scale-105" />
    ,
  }

  return <BentoCard {...feature} />
}