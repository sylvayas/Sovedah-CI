export default function TitleSection({ title, description }: { title: string, description?: string }) {

    return (
        <section className="relative flex flex-col gap-8">
            <h3 className="text-center md:text-left max-w-screen-md text-2xl md:text-4xl tracking-tight font-saudagar">
                {title}
            </h3>
            {description && <p className="mt-4 text-xs md:text-sm">{description}</p>}
            <div className="w-[125px] md:w-[150px] h-[2px] bg-novis_green mx-auto lg:mx-0"></div>
        </section>
    );
}
