import { Link, useRouterState } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

type NavItem = {
  to: "/" | "/second" | "/third";
  label: string;

  matchPrefix?: string;
};

const navItems: NavItem[] = [
  { to: "/", label: "Main" },
  { to: "/second", label: "Second", matchPrefix: "/second" },
  { to: "/third", label: "Journal", matchPrefix: "/third" },
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
        className="mx-auto grid h-16 w-full max-w-sm grid-cols-3 gap-3 px-4 py-3"
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
                  ? "bg-orange-500"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
              )}
            >
              <span className="uppercase tracking-wide">{label}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
};

export default BottomNav;
