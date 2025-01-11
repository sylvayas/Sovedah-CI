import { Suspense } from "react";
import Content from "./content";

export default function RecapPage() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
