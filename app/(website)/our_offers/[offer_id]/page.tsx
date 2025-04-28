import HeaderPage from "@/components/offers/header-page";
import SubSection from "@/components/offers/sub-section";
import DescriptionAllSpaces from "@/components/offers/DescriptionAllSpaces";
import DescriptionProduct from "@/components/offers/components/DescriptionProduct";




export default async function OfferPage() {
  
  return (
    <div>
      <HeaderPage/>
      <DescriptionAllSpaces />
      <SubSection/>
      <DescriptionProduct/>
      
    </div>
  );
}
