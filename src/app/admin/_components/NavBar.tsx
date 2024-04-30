"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export default function NavBar({children}: {children: ReactNode}) {
  return (
    <nav className="bg-primary text-primary-foreground flex justify-evenly px-4 h-[60px]">
       {children}
    </nav>
  );
}

export function NavBarLink(
  props: Omit<ComponentProps<typeof Link>, "className">
) {
  const pathName = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground py-4 text-xl px-4",
        pathName === props.href && "bg-background text-foreground"
      )}
    ></Link>
  );
}
