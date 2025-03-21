import React from 'react'
import Hero from "@/components/space/Hero";
import Description from "@/components/space/Description";
import { espaces } from '@/config/data';
import { group } from 'console';
import SpaceStates from '../components/space-states';

export default async function ItemSpace({
  params,
}: {
  params: { id: string };
}) {
  const group = espaces.find((espace) => {
    if (espace.items) {
      return espace.items.find((espac) => espac.id == params.id);
    }
    return espace.id == params.id;
  });

  const item = group
    ? group.items
      ? group.items.find((espac) => espac.id == params.id)
      : group
    : null;

    return (
        <div>
            <Hero/>
            <Description group={group} space={item}/>
            <SpaceStates/>
        </div>
    );
}
