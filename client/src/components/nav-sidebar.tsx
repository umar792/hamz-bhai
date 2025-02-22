import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Receipt,
  DollarSign,
  ShoppingBag,
  LogOut
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-sidebar-foreground">
          Dilpasand Garments
        </h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <a
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent",
                      location === item.href && "bg-sidebar-accent"
                    )}
                  >
                    <Icon className="h-4 w-4" />
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
        className="mt-auto w-full justify-start"
        onClick={() => logout()}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}
