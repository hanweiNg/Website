"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import type { TooltipContent } from "@/components/ui/tooltip";
// Removed React import as it's not explicitly used for React.useMemo here

type NavItem = {
  href: string;
  icon: React.ElementType;
  label: string;
  tooltip: ComponentProps<typeof TooltipContent>;
};

// Define NAV_ITEMS outside the component scope for stable references.
const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    icon: LayoutDashboard,
    label: "Dashboard",
    tooltip: { children: "Dashboard" },
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Settings",
    tooltip: { children: "Application Settings" },
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {NAV_ITEMS.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              variant="default"
              size="default"
              className={cn(
                "justify-start",
                 pathname === item.href ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              isActive={pathname === item.href}
              tooltip={item.tooltip} 
            >
              <a>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
