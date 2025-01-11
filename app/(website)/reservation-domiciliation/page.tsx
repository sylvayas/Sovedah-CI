import HeaderPage from "./components/header-page";
import ListSpaceCard from "./components/list-space-card";
import { formulas } from "@/config/data"; // Adjust import path as needed

export default async function ListeEspaces() {
  return (
    <div>
      <HeaderPage />
      <ListSpaceCard formulas={formulas} />
    </div>
  );
}
