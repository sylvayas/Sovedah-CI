"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function ContactSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const router = useRouter()
    return (
        <section
            id="hero"
            className="relative overflow-hidden isolate mt-20 py-4 mx-auto max-w-screen-2xl"
        >
            <div className="max-w-screen-xl px-4 mx-auto bg-color-one">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-16 p-4 mx-auto">
                    <div className="max-w-screen-sm">
                        <div className="flex items-center gap-4">
                            <div className="relative size-24">
                                <Image
                                    src="/images/logo.png"
                                    alt="Logo"
                                    fill
                                    className="w-full h-full rounded-[inherit] object-contain  animate-fade-in opacity-0  [--animation-delay:200ms]"
                                />
                            </div>
                            <p className="text-xl font-semibold text-white">TURBO DELIVERY</p>
                        </div>
                        <p className="text-white">Turbo Delivery, votre service de livraison express en Côte d&apos;Ivoire.</p>
                    </div>
                    <div>
                        <Button onClick={() => router.push("/contact_us")}>Contactez-nous</Button>
                    </div>
                </div>
            </div>
        </section >
    );
}