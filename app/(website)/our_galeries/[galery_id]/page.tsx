import HeaderPage from "@/components/galeries/header-page";
import DescriptionAllSpaces from "@/components/galeries/DescriptionAllSpaces";
import { galeries } from "@/config/data";

export default async function GalerePage({ params: { galery_id } }: { params: { galery_id: string } }) {
  const galerie = galeries.find((galerie) => galerie.id == galery_id);
  return (
    <div>
      <HeaderPage galerie={galerie} />
      <DescriptionAllSpaces galerie={galerie} />
    </div>
  );
}

