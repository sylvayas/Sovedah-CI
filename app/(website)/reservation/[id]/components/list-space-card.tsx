import SpaceCard from "@/components/ui/SpaceCard/space-card";
import { datas } from "@/config/data";

export default function ListSpaceCard() {

    return (
        <div className="container grid sm:grid-cols-2 md:grid-cols-3 py-8 xl:grid-cols-4 justify-center gap-8">
            {datas.map((group) => {
                return group.items.map((item, key) => {
                    return <SpaceCard key={key} group={group} card={{ id: item.id, title: item.title, imagePath: item.imagePath }} />
                })
            })}
        </div>
    );
}
