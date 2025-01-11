"use client";

import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "./style.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";

import { EffectFade, Navigation, Autoplay } from "swiper/modules";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function HeroCarousel({ images }: { images: string[] }) {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      centeredSlides={true}
      speed={600}
      grabCursor={true}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      navigation={{
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      }}
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
      }}
      modules={[EffectFade, Navigation, Autoplay]}
      className={"w-full h-full relative"}
    >
      {images?.map((img, key) => {
        return (
          <SwiperSlide
            key={key}
            className={cn("relative rounded-md overflow-hidden")}
          >
            <Image
              alt={img}
              className="bg-center bg-cover object-cover w-full h-full"
              src={img}
              fill
            />
            <div className="absolute z-[1] top-0 left-0 w-full h-full bg-gradient-to-b from-black to-novis_green opacity-50" />
          </SwiperSlide>
        );
      })}

      <>
        <ChevronLeftIcon className="swiper-button-prev rounded-full stroke-white" />
        <ChevronRightIcon className="swiper-button-next rounded-full stroke-white" />
      </>
    </Swiper>
  );
}
