"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import SpaceCarousel from "./space-carousel";

type ImageList = string[];

type CardProps = {
  card: any;
  group: any;
} & React.ComponentProps<typeof Card>;

export default function SpaceCard({
  group,
  card,
  className,
  ...props
}: CardProps) {
  const images = card.images ? card.images.map((img: any) => img.src) : [];

  return images.length == 0 ? (
    <SkeletonCard />
  ) : (
    <Card
      className={cn("w-full max-w-xs mx-4 sm:max-w-sm relative", className)}
      {...props}
    >
      <SpaceCarousel images={images} />
      <CardHeader>
        <CardTitle className="text-sm md:text-lg">{card.title}</CardTitle>
        <CardDescription>{group.title}</CardDescription>
      </CardHeader>
      {/* <CardContent>
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        {title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Send notifications to device.
                    </p>
                </div>
            </CardContent> */}
      <CardFooter>
        <Link
          className={cn(
            buttonVariants({ size: "sm" }),
            "gap-2 overflow-hidden whitespace-pre",
            "group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
          )}
          href={`/reservation/${card.id}`}
        >
          <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
          <div className="flex items-center">
            <Icons.calendar className="size-4" />
            <span className="ml-1 text-sm sm:text-md">Réservez</span>{" "}
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
}

export function SkeletonCard() {
  return (
    <div className="w-full max-w-sm flex flex-col space-y-3 py-2">
      <Skeleton className="h-44 md:h-52 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-10/12" />
      </div>
    </div>
  );
}
