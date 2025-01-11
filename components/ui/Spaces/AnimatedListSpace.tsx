"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";
import Image from "next/image";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let notifications = [
  {
    name: "Payment received",
    description: "Magic UI",
    time: "15m ago",

    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "User signed up",
    description: "Magic UI",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "New message",
    description: "Magic UI",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "New event",
    description: "Magic UI",
    time: "2m ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Item = ({ image }: { image: string }) => {
  return (
    <div
      className={cn(
        "relative mx-auto h-36 w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
      )}
    >
      <Image src={image} alt={image} fill className="bg-center bg-cover object-cover w-full h-full" />

    </div>
  );
};

export function AnimatedListSpace({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg border",
        className,
      )}
    >
      <AnimatedList>
        {images.map((img, idx) => (
          <Item image={img} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
