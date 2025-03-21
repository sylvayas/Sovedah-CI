import { Icons } from "@/components/icons";
import NumberTicker from "@/components/magicui/number-ticker";
import Image from "next/image";
import imgback from "@/public/images/coworking/coworking (1).jpg";

export default function HeaderPage() {
  return (
    <>
      <section className="relative ">
        <div className="container px-0 relative max-w-[1400px]">
          <div className="relative z-[2] flex flex-col gap-4 text-white  bg-black/30 py-8 px-4 sm:py-16 lg:px-8">
            <p className="mb-8 font-light text-xs sm:text-sm text-center">
             Veuillez réserver vos produits
            </p>
          </div>
          {/* image background */}
          <Image
            fill
            src={imgback}
            alt="img back"
            placeholder={"blurDataURL" in imgback ? "blur" : undefined}
            className=" object-cover"
          />
        </div>
      </section>
    
    </>
  );
}
