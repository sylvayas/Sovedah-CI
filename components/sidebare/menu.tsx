"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/config/menu-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "@/components/sidebare/collapse-menu-button";
import { Dispatch, SetStateAction } from "react";


export function Menu({ setOpen }: {
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <ScrollArea className="h-[calc(100vh-4rem)] pt-4 pb-10">
      <nav className="flex flex-col space-y-2">
        <div className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <div className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                {groupLabel}
              </p>
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <Button
                        variant={active ? "default" : "ghost"}
                        className="w-full justify-start h-10 mb-1"
                        asChild
                      >
                        <Link href={href}>
                          <span
                            className={cn("mr-4")}
                          >
                            <Icon size={18} />
                          </span>
                          <p
                            className={cn(
                              "max-w-[200px] truncate translate-x-0 opacity-100"
                            )}
                          >
                            {label}
                          </p>
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        setOpen={setOpen}
                      />
                    </div>
                  )
              )}
            </div>
          ))}
        </div>
      </nav>
    </ScrollArea>
  );
}
