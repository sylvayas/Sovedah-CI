import * as React from "react"
import PartenairesCarousel from "./partenaires-carousel"

export default function Partenaires() {
    return (
        <section id="showcase" className="container px-2 md:px-8 py-14">
            <h2 className="text-novis_yellow mb-2 text-center font-medium text-2xl md:text-4xl tracking-tight font-saudagar">
                Nos Partenaires
            </h2>
            <h3 className="mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
            Ensemble, nous sommes plus forts. Découvrez les entreprises qui partagent notre engagement pour l'innovation et l'excellence.
            </h3>

            <PartenairesCarousel />
        </section>

    )
}
