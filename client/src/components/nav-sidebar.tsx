import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Receipt,
  DollarSign,
  ShoppingBag,
  LogOut,
  Menu
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard
  },
  {
    title: "Mall Management",
    href: "/mall",
    icon: ShoppingBag
  },
  {
    title: "Expense Tracking",
    href: "/expenses",
    icon: DollarSign
  },
  {
    title: "Sales Records",
    href: "/sales",
    icon: Receipt
  },
  {
    title: "Companies",
    href: "/companies",
    icon: Building2
  }
];

export function NavSidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-sidebar border-b border-sidebar-border px-4 flex items-center justify-between z-50">
        <h1 className="text-base font-semibold text-sidebar-foreground truncate max-w-[200px]">
          Dilpasand Garments
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed md:static inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        "md:flex md:h-screen md:flex-col"
      )}>
        <div className="flex-1 flex flex-col p-4">
          <div className="hidden md:block mb-8">
            <h1 className="text-xl font-bold text-sidebar-foreground">
              Dilpasand Garments
            </h1>
          </div>

          {/* Add padding-top for mobile to account for header */}
          <nav className="flex-1 mt-16 md:mt-0">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <a
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-3 text-sidebar-foreground transition-colors hover:bg-sidebar-accent",
                          location === item.href && "bg-sidebar-accent"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="h-5 w-5" />
                        {item.title}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Button
            variant="ghost"
            className="mt-auto w-full justify-start py-3"
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Content Padding for Mobile Header */}
      <div className="md:hidden h-16" />
    </>
  );
}