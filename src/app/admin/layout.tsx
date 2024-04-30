"use client"

import { Button } from "@/components/ui/button";
import NavBar, { NavBarLink } from "./_components/NavBar";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme-provider";
import { logout } from "@/Repository/functionalities";
export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    return (
      <>
        <NavBar>
          <NavBarLink href="/admin">Dashboard</NavBarLink>
          <NavBarLink href="/admin/profile">Profile</NavBarLink>
          <NavBarLink href="/admin/users">Users</NavBarLink>
          <NavBarLink href="/admin/religions">Religions</NavBarLink>
          <NavBarLink href="/">Home</NavBarLink>
          <Button onClick={async () => {
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