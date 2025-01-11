import SubSection from "@/components/about/sub-section"
import Valeurs from "@/components/about/valeurs"
import Missiion_Charte from "@/components/about/Mission_Charte"
import ADM from "@/components/about/ADM"
import About from "@/components/website/About/about";

export default async function OurSpace() {
    return (
        <div>
            <SubSection />
            <Valeurs />
            <Missiion_Charte />
            <ADM />
            <About />
        </div>
    );
}
