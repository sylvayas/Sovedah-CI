"use client";

import React, { forwardRef, useRef } from "react";
import TitleSection from '@/components/title-section'
import { Icons } from "@/components/icons";
import { BorderBeam } from "@/components/magicui/border-beam";
import GridPattern from "@/components/magicui/grid-pattern";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 font-extrabold flex size-12 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
                className,
            )}
        >
            {children}
        </div>
    );
});

Circle.displayName = "Circle";

export function AnimatedBeamMultipleOutputDemo({
    className,
}: {
    className?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const div1Ref = useRef<HTMLDivElement>(null);
    const div2Ref = useRef<HTMLDivElement>(null);
    const div3Ref = useRef<HTMLDivElement>(null);
    const div4Ref = useRef<HTMLDivElement>(null);
    const div5Ref = useRef<HTMLDivElement>(null);
    const div6Ref = useRef<HTMLDivElement>(null);

    return (
        <div
            className={cn(
                "relative hidden sm:flex w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl",
                className,
            )}
            ref={containerRef}
        >
            <div className="flex size-full flex-row items-stretch justify-between gap-10 max-w-lg">
                <div className="flex flex-col justify-center">
                    <div ref={div6Ref}>
                        <Icons.logo className="size-20" />
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-2">
                    <div ref={div1Ref} className="flex items-center bg-white p-[1px]">
                        <Circle>
                            N
                        </Circle>
                        <span className="font-medium">ous</span>
                    </div>
                    <div ref={div2Ref} className="flex items-center bg-white p-[1px]">
                        <Circle>
                            O
                        </Circle>
                        <span className="font-medium">ptimiste</span>
                    </div>
                    <div ref={div3Ref} className="flex items-center bg-white p-[1px]">
                        <Circle>
                            V
                        </Circle>
                        <span className="font-medium">ision</span>
                    </div>
                    <div ref={div4Ref} className="flex items-center bg-white p-[1px]">
                        <Circle>
                            I
                        </Circle>
                        <span className="font-medium">ntégrité</span>
                    </div>
                    <div ref={div5Ref} className="flex items-center bg-white p-[1px]">
                        <Circle>
                            S
                        </Circle>
                        <span className="font-medium">érénité</span>
                    </div>
                </div>
            </div>
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div5Ref}
                toRef={div6Ref}
                gradientStartColor={'#ce6109'}
                gradientStopColor={'#046167'}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div6Ref}
                gradientStartColor={'#ce6109'}
                gradientStopColor={'#046167'}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div6Ref}
                gradientStartColor={'#ce6109'}
                gradientStopColor={'#046167'}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div6Ref}
                gradientStartColor={'#ce6109'}
                gradientStopColor={'#046167'}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div4Ref}
                toRef={div6Ref}
                gradientStartColor={'#ce6109'}
                gradientStopColor={'#046167'}
            />
            <BorderBeam borderWidth={2.5} colorFrom='#ce6109' colorTo='#046167' size={250} duration={12} delay={9} />

        </div>
    );
}



export default function Valeurs() {

    return (
        // <section className="container min-h-[300px] py-14 relative">
        //     <div className="relative md:gap-8 items-center px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 lg:px-6">
        //         <div className="mb-4 md:mt-0">
        //             <h2 className="mb-4  text-2xl md:text-4xl tracking-tight font-saudagar">Nos valeurs</h2>
        //             <ul className="list-disc">
        //                 <li className="mb-2 text-sm"><span className="font-semibold">Nous : </span> dans le sens (communauté, famille, esprit d&apos;équipe, d&apos;empathie, ensemble)</li>
        //                 <li className="mb-2 text-sm"><span className="font-semibold">Optimiste : </span></li>
        //                 <li className="mb-2 text-sm"><span className="font-semibold">Vision : </span></li>
        //                 <li className="mb-2 text-sm"><span className="font-semibold">Intégrité : </span></li>
        //                 <li className="mb-2 text-sm"><span className="font-semibold">Sérénité : </span></li>
        //             </ul>
        //         </div>
        //         <AnimatedBeamMultipleOutputDemo />
        //     </div>
        // </section>
        <></>
    );
}