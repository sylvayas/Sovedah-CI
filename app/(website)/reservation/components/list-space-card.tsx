import SpaceCard from "@/components/ui/SpaceCard/space-card";
import { espaces } from "@/config/data";

export default function ListSpaceCard() {
  return (
    <div className="container grid sm:grid-cols-2 py-8 xl:grid-cols-3 justify-center gap-8">
      {espaces.map((espace, k: number) => {
        if (espace.items) {
          return espace.items.map((espac, key) => {
            return <SpaceCard key={key} group={espace} card={espac} />;
          });
        }
        return <SpaceCard key={k} group={espace} card={espace} />;
      })}
    </div>
  );
}
