"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import { datas } from "@/config/data";
import TitleSection from "@/components/title-section"
import Marquee from "@/components/magicui/marquee";
import { Suspense } from 'react';


export default function SpaceImages() {

    const [privateOffices, setPrivateOffices] = useState<string[]>([]);
    const [openSpace, setOpenSpace] = useState<string[]>([]);
    const [meetingRoom, setMeetingRoom] = useState<string[]>([]);
    const [commonRoom, setCommonRoom] = useState<string[]>([]);

    useEffect(() => {

        datas[0].items.forEach((item) => {
            if (item.imagePath) {
                fetch(`/api/images?subfolder=${item.imagePath}`)
                    .then(res => res.json())
                    .then((data) => {
                        if (data.error) {
                            console.error(data.error);
                        } else {
                            setPrivateOffices(state => ([...state, ...data]))
                        }
                    });
            }
        })

        datas[1].items.forEach((item) => {
            if (item.imagePath) {
                fetch(`/api/images?subfolder=${item.imagePath}`)
                    .then(res => res.json())
                    .then((data) => {
                        if (data.error) {
                            console.error(data.error);
                        } else {
                            setOpenSpace(state => ([...state, ...data]))
                        }
                    });
            }
        })

        datas[2].items.forEach((item) => {
            if (item.imagePath) {
                fetch(`/api/images?subfolder=${item.imagePath}`)
                    .then(res => res.json())
                    .then((data) => {
                        if (data.error) {
                            console.error(data.error);
                        } else {
                            setMeetingRoom(state => ([...state, ...data]))
                        }
                    });
            }
        })

        datas[3].items.forEach((item) => {
            if (item.imagePath) {
                fetch(`/api/images?subfolder=${item.imagePath}`)
                    .then(res => res.json())
                    .then((data) => {
                        if (data.error) {
                            console.error(data.error);
                        } else {
                            setCommonRoom(state => ([...state, ...data]))
                        }
                    });
            }
        })

    }, []);

    return (
        <section className="bg-black text-white container h-fit py-14 relative">
            <TitleSection
                title={"Nos bureaux et espaces de coworking à Cocody"}
                description="Une équipe professionnelle est présente au quotidien pour vous assister dans vos activités :  de la gestion des équipements en passant par l'accueil, la réception de vos collaborateurs et visiteurs." />
            <div className="mt-8 md:mt-14 relative w-full h-full">
                <Marquee className="max-w-screen [--duration:40s]">
                    {privateOffices.slice(0, 15).map((url) => {
                        return <Suspense key={url}>
                            <ShowcaseCard image={url} />
                        </Suspense>
                    })}
                </Marquee>
                <Marquee reverse className="max-w-screen [--duration:60s]">
                    {privateOffices.slice(15, 32).map((url) => {
                        return <Suspense key={url}>
                            <ShowcaseCard image={url} />
                        </Suspense>
                    })}
                </Marquee>
                <Marquee className="max-w-screen [--duration:30s]">
                    {privateOffices.slice(32, 42).map((url) => {
                        return <Suspense key={url}>
                            <ShowcaseCard image={url} />
                        </Suspense>
                    })}
                </Marquee>
                <Marquee reverse className="max-w-screen [--duration:40s]">
                    {openSpace.map((url) => {
                        return <Suspense key={url}>
                            <ShowcaseCard image={url} />
                        </Suspense>
                    })}
                </Marquee>
                <Marquee className="max-w-screen [--duration:20s]">
                    {meetingRoom.map((url) => {
                        return <Suspense key={url}>
                            <ShowcaseCard image={url} />
                        </Suspense>
                    })}
                </Marquee>
                <Marquee reverse className="max-w-screen [--duration:30s]">
                    {commonRoom.map((url) => {
                        return <Suspense key={url}>
                            <ShowcaseCard image={url} />
                        </Suspense>
                    })}
                </Marquee>
            </div>
        </section>

    );
}

export function ShowcaseCard({
    image,
}: { image: string; }) {
    return (
        <div
            className="max-h-[100px] xl:max-h-[120px]  w-[150px] xl:w-[180px] relative overflow-hidden cursor-pointer"
        >
            <Image
                src={image}
                alt={image}
                height={150}
                width={180}
                className="size-full object-cover rounded-xl"
            />
        </div>
    );
}