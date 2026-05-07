import { Link, useRouterState } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { User } from "lucide-react";

type NavItem = {
  to: "/" | "/second" | "/third" | "/profile";
  label: string;

  matchPrefix?: string;
  icon?: React.ReactNode;
};

const navItems: NavItem[] = [
  { to: "/", label: "Main" },
  { to: "/second", label: "Second", matchPrefix: "/second" },
  { to: "/third", label: "Journal", matchPrefix: "/third" },
  {
    to: "/profile",
    label: "Profile",
    matchPrefix: "/profile",
    icon: (
      <User className="size-5 {isActive ? 'text-black' : 'text-muted-foreground'}" />
    ),
  },
];

const isActivePath = (pathname: string, item: NavItem): boolean => {
  if (item.matchPrefix) return pathname.startsWith(item.matchPrefix);
  return pathname === item.to;
};

const BottomNav = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <footer className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <nav
        aria-label="Primary"
        className="mx-auto grid h-16 w-full max-w-sm grid-cols-4 gap-3 px-4 py-3"
      >
        {navItems.map((item) => {
          const isActive = isActivePath(pathname, item);
          const { label, to } = item;
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex h-11 items-center justify-center rounded-lg text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-white text-black"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
              )}
            >
              <span className="uppercase tracking-wide">
                {item.icon ?? label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
};

export default BottomNav;
