import React from 'react'
import HeroCarousel from '../ui/hero-carousel/hero-carousel'
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export default function Hero(
    { space }: { space: any }
) {

    return (
        <section className="relative max-w-[1400px] mx-auto">
            <div className={cn("h-[60vh]  md:h-[500px] relative container px-0")}>
                <HeroCarousel images={space.images.map((image: any) => image.src)} />
            </div>
            <Card className="w-full md:w-[300px] h-fit md:absolute z-10 top-auto left-auto right-16 bottom-3">
                <CardHeader>
                    <CardTitle>
                        <div className="relative mr-6 flex items-center space-x-2">
                            <Icons.logo_rogner className="w-24 lg:w-28" />
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className='grid grid-cols-1 gap-4 divide-y'>
                    <div>
                        <h2 className='text-xl font-saudagar'>{space.title}</h2>
                        <p className='tracking-wide mt-2 text-sm'>{space.adresse}</p>
                        <p className='tracking-wide mt-2 text-sm font-semibold'>{space.contact}</p>
                        <p className='tracking-wide mt-2 text-sm font-semibold'>{space.email}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className='w-full'>Réserver mon espace</Button>
                </CardFooter>
            </Card>
        </section>
    )
}