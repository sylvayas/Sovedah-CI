import { Suspense } from "react";
import Content from "./content";
import ContentAccessoire from "./content";


export default function AccessoiresPage() {
  return (
    <Suspense>
      <ContentAccessoire/>
    </Suspense>
  );
}
