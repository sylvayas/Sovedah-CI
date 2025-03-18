import * as React from "react"
import SolutionsCarousel from "./solutions-carousel"

export default function Solutions() {
    return (
        <section id="showcase" className="container px-2 md:px-8 py-14">
            <h2 className="text-[ #1A557A] mb-2 text-center font-medium text-2xl md:text-4xl tracking-tight font-saudagar">
                Nos Services
            </h2>
            <h3 className="mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
                Nos services s&apos;adaptent à vos besoins et à votre budget !
            </h3>

            <SolutionsCarousel />
        </section>

    )
}
