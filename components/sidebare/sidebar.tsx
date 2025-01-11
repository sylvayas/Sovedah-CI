"use client"

import { useState } from "react";
import { useStore } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { Menu } from "./menu";
import { Sheet, SheetHeader, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";

import { MenuIcon } from "lucide-react";



export default function Sidebar() {

  const [open, setOpen] = useState(false);

  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 xl:hidden"
        >
          <MenuIcon className="size-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <div className="md:hidden">
        <Icons.logo_rogner className="mr-2 w-20" />
      </div>
      <SheetContent side="left" className="px-2">
        <SheetHeader>
          <div className="md:hidden">
            <Icons.logo_rogner className="mx-2 w-20" />
          </div>
        </SheetHeader>
        <Menu setOpen={setOpen} />
      </SheetContent>
    </Sheet>

  );
}
