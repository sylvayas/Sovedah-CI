import HeaderPage from "@/components/offers/header-page";
import SubSection from "@/components/offers/sub-section";
import DescriptionAllSpaces from "@/components/offers/DescriptionAllSpaces";
import { offres } from "@/config/data";

export default async function OfferPage({ params: { offer_id } }: { params: { offer_id: string } }) {
  const offre = offres.find((offre) => offre.id == offer_id);
  return (
    <div>
      <HeaderPage offre={offre} />
      <SubSection offre={offre} />
      <DescriptionAllSpaces offre={offre} />
    </div>
  );
}
