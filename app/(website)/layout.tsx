import { SiteBanner } from "@/components/site-banner";
import SiteHeader from "@/components/navigation/site-header";
import Footer from "@/components/footer";
import Faqs from "@/components/Faqs/faqs";

interface WebSiteLayoutProps {
  children: React.ReactNode;
}

export default async function WebSiteLayout({ children }: WebSiteLayoutProps) {
  return (
    <>
      <SiteBanner />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <Faqs />
      <Footer />
    </>
  );
}
