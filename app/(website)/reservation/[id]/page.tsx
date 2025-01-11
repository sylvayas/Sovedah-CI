import HeaderPage from "./components/header-page";
import Content from "./components/Content";
import { datas, espaces } from "@/config/data";

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
      <HeaderPage group={group} space={item} />
      <Content group={group} space={item} />
    </div>
  );
}
