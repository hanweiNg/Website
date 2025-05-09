import type { PropsWithChildren } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Header } from "./Header";
import { SidebarNav } from "./SidebarNav";
import { Logo } from "@/components/icons/Logo";
import Link from "next/link";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Sidebar variant="sidebar" collapsible="icon" side="left">
        <SidebarHeader className="p-4 border-b border-sidebar-border">
           <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-sidebar-primary">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              <path d="M16 12l-4-4-4 4M12 16V8"/>
            </svg>
            <span className="text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">VR Dashboard</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-4 mt-auto border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
            © {new Date().getFullYear()} VR Performance Inc.
          </p>
           <p className="text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:block hidden text-center">
            VR
          </p>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-secondary/50">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}
