import React from 'react'
import Galerie from '../Galerie';
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";

import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import SpaceCarousel from '../ui/SpaceCard/space-carousel';


const breakpoints = [3840, 1920, 1080, 640, 384, 256, 128];

export default function Description(
    { space }: { space: any }
) {

    return (
        <section className="relative max-w-[1400px] mx-auto bg-gray-900 container px-2 md:px-8 py-20 lg:py-32">

            <div className="relative gap-8 items-stretch py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <div className="mt-4 md:mt-0">
                    <h2 className="mb-6 text-white text-2xl md:text-4xl tracking-tight font-saudagar">{space.title}</h2>
                    <div className="mb-6 font-light text-gray-300 text-custom-justify ">
                        {space.description}
                        {space.options
                            && <div className="py-6">
                                <h3 className="text-xl md:text-2xl tracking-tight font-saudagar mb-4">{space.options.title}</h3>
                                <div className="text-gray-200 grid items-start lg:grid-cols-2 gap-4">
                                    {space.options.items.map((option: any, key: number) => {
                                        return <table key={key} className="w-full text-sm text-left rtl:text-right text-gray-200">
                                            <thead className="text-xs text-gray-50 uppercase bg-novis_orange">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        {option.title}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {option.items.map((item: any, k: number) => {
                                                    return <tr key={k} className="border-b list-disc  odd:bg-gray-900 even:bg-gray-800">
                                                        <td className="py-1">
                                                            <li>{item}</li>
                                                        </td>
                                                    </tr>
                                                })}

                                            </tbody>
                                        </table>
                                    })}
                                </div>
                            </div>
                        }
                        {space.tarifs
                            && <div className="py-6">
                                <h3 className="text-xl md:text-2xl tracking-tight font-saudagar mb-4">Nos Tarifs</h3>
                                <ul className="space-y-4 text-gray-200  list-decimal list-inside">
                                    {space.tarifs.map((tarif: any, key: number) => {
                                        return <li key={key} className="text-sm md:text-md">
                                            {tarif.name}
                                            <ol className="ps-5 mt-2 space-y-1 list-disc list-inside">
                                                {tarif.items && tarif.items.map((item: any, k: number) => {
                                                    return <div key={k}>
                                                        <li>{item.title} <span className='ml-2'>{"=>"}</span> <span className='ml-2'>{item.price}</span></li>
                                                        <p className="text-gray-300 text-xs md:text-sm">{item.description} </p>
                                                    </div>
                                                })}
                                            </ol>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                </div>
                <img className="w-full hidden md:block object-cover" src={space.images.map((image: any) => image.src)[0]} alt="dashboard image" />
            </div>
            {space.items && space.items.length > 0 ? (
                <>
                    <h2 className="mb-6 text-center text-white text-xl md:text-2xl tracking-tight font-saudagar">Nos différents espaces</h2>
                    <div className="relative grid py-8 lg:grid-cols-2 justify-center gap-8 mb-8 lg:mb-16">
                        {space.items.map((subSpace: any, key: number) => {
                            return <Card key={key} className={cn("w-full mx-4 relative max-w-[320px] sm:max-w-lg md:max-w-2xl",)}>
                                <SpaceCarousel images={subSpace.images.map((image: any) => image.src)} />
                                <CardHeader className='bg-gray-900'>
                                    <CardTitle className="text-sm md:text-lg text-novis_orange">{subSpace.title}</CardTitle>
                                    <CardDescription className='text-white text-sm '>{subSpace.description}</CardDescription>
                                </CardHeader>
                                <CardContent className='bg-gray-900'>
                                    <div className="font-light text-gray-300 grid md:grid-cols-2">
                                        {subSpace.options
                                            && <div>
                                                <h3 className="md:text-lg tracking-tight font-semibold mb-4">Options</h3>
                                                <ul className="space-y-1 text-gray-200 list-disc list-inside">
                                                    {subSpace.options.map((option: any, key: number) => {
                                                        return <li key={key} className="text-sm md:text-md">
                                                            {option}
                                                        </li>
                                                    })}
                                                </ul>
                                            </div>
                                        }
                                        {subSpace.tarifs
                                            && <div className='mt-4'>
                                                <h3 className="md:text-lg tracking-tight font-semibold mb-4">Nos Tarifs</h3>
                                                <ul className="space-y-4 text-gray-200  list-decimal list-inside">
                                                    {subSpace.tarifs.map((tarif: any, key: number) => {
                                                        return <li key={key} className="text-sm md:text-md">
                                                            {tarif.name}
                                                            <ol className="ps-5 mt-2 space-y-1 list-disc list-inside">
                                                                {tarif.items && tarif.items.map((item: any, k: number) => {
                                                                    return <div key={k}>
                                                                        <li>{item.title} <span className='ml-2'>{"=>"}</span> <span className='ml-2'>{item.price}</span></li>
                                                                        <p className="text-gray-300 text-xs md:text-sm">{item.description} </p>
                                                                    </div>
                                                                })}
                                                            </ol>
                                                        </li>
                                                    })}
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                        })}
                    </div>
                </>

            ) : <></>}

            <AnimatedGridPattern
                numSquares={100}
                maxOpacity={0.1}
                duration={2}
                repeatDelay={1}
                className={
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] inset-x-0 w-full  h-[150%]"
                } />

            <Galerie slides={space.images.map((item: any) => ({
                src: item.src,
                width: item.width,
                height: item.height,
                srcSet: breakpoints.map((breakpoint) => ({
                    src: item.src,
                    width: breakpoint,
                    height: Math.round((item.height / item.width) * breakpoint),
                })),
            }))} />
        </section>
    )
}