"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme-provider";
import NavBar, { NavBarLink } from "../admin/_components/NavBar";
import { logout } from "@/Repository/functionalities";
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar>
        <NavBarLink href="/user">Dashboard</NavBarLink>
        <NavBarLink href="/user/profile">Profile</NavBarLink>
        <NavBarLink href="/user/religion">Religion</NavBarLink>
        <NavBarLink href="/">Home</NavBarLink>

        <Button
          onClick={async () => {
            await logout();
          }}
          className={cn(
            "hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground mt-2 text-lg px-4"
          )}
        >
          logout
        </Button>
        <ModeToggle></ModeToggle>
      </NavBar>
      {children}
    </>
  );
}
