import { Suspense } from "react";
import Content from "./content";
import ContentBillet from "./content";


export default function BilletPage() {
  return (
    <Suspense>
      <ContentBillet/>
    </Suspense>
  );
}
