import React from 'react'
import Hero from "@/components/space/Hero";
import Description from "@/components/space/Description";
import { espaces } from '@/config/data';

export default function SpacePage({params: { space_id } }: { params: { space_id: string } }) {
    const space = espaces.find((espace) => espace.id == space_id);
    return (
        <div>
            <Hero space={space} />
            <Description space={space} />
        </div>
    )
}
