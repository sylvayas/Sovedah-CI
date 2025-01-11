import { Icons } from "@/components/icons";
import NumberTicker from "@/components/magicui/number-ticker";
import Image from "next/image";
import imgback from "@/public/images/coworking/coworking (1).jpg";

export default function HeaderPage({
  group,
  space,
}: {
  group: any | undefined;
  space: any;
}) {
  return (
    <>
      <section className="relative ">
        <div className="container px-0 relative max-w-[1400px]">
          <div className="relative z-[2] flex flex-col gap-4 text-white  bg-black/30 py-8 px-4 sm:py-16 lg:px-8">
            <h2 className="mx-auto text-xl sm:text-2xl md:text-3xl lg:text-4xl text-cente tracking-tight font-semibold">
              {space?.title}
            </h2>
            <p className="mb-8 font-light text-xs sm:text-sm text-center">
              {" "}
              Catégorie : {group?.title}
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
      <section className="relative">
        <div className="container grid grid-cols-2 gap-4 md:grid-cols-4 py-2 md:py-4 bg-gray-200">
          <p className="font-medium text-xs md:text-sm">
            Domiciliation d&apos;entreprises{" "}
          </p>
          <p className="font-medium text-xs md:text-sm">Location de bureaux </p>
          <p className="font-medium text-xs md:text-sm">
            Location de salle de réunion
          </p>
          <p className="font-medium text-xs md:text-sm">
            Location de salle de conférence
          </p>
        </div>
      </section>
    </>
  );
}
