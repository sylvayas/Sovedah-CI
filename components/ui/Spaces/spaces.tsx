import Link from 'next/link'
import { cn } from "@/lib/utils";
import MapSpaces from "./mapSpaces"
import { buttonVariants } from "@/components/ui/button";


export default function Spaces() {
  return (
    <section className="container py-14 relative">
      <MapSpaces />
      <Link
          className={cn(
            buttonVariants(),
            "mx-auto block max-w-fit px-2 sm:max-w-80 gap-2 overflow-hidden whitespace-pre",
            "group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
          )}
          
          href={""}
        >
          <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
          <div className="flex items-center">
            <span className="ml-1 text-xs sm:text-sm">Je découvre les espaces NOIVS CO-WORKING</span>{" "}
          </div>
        </Link>
    </section>
  );
}
