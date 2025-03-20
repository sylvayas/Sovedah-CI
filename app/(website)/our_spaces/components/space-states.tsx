"use client";


import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import 'swiper/css/pagination';
import {
    EffectFade,
    Navigation,
    Autoplay,
    Pagination
} from "swiper/modules";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";


export default function SpaceStates({ images }: { images: string[] }) {

    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            centeredSlides={true}
            speed={400}
            grabCursor={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation={
                {
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                }
            }
            pagination={{
                clickable: true,
                dynamicBullets: true,
                
            }}
            modules={[
                EffectFade,
                Navigation,
                Autoplay,
                Pagination
            ]}
            className={"w-full h-44 md:h-52 relative"}
        >
           

            <>
                <ChevronLeftIcon className="swiper-button-prev rounded-full stroke-white" />
                <ChevronRightIcon className="swiper-button-next rounded-full stroke-white" />
            </>
        </Swiper>
    );
}