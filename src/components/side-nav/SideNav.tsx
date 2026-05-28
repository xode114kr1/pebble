"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: "home", label: "Home", href: "/" },
  { icon: "map", label: "Gym", href: "/gym" },
  { icon: "add_circle", label: "Record", href: "/record" },
  { icon: "group", label: "Community", href: "/community" },
];

type NavItemProps = {
  item: {
    icon: string;
    label: string;
    href: string;
  };
  isActive: boolean;
};

function NavItem({ item, isActive }: NavItemProps) {
  return (
    <Link
      href={item.href}
      className={
        isActive
          ? "flex items-center gap-3 border-l-4 border-primary bg-surface-container-low px-4 py-3 text-primary transition-transform active:scale-95"
          : "flex items-center gap-3 px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container active:scale-95"
      }
    >
      <span className="label-md">{item.label}</span>
    </Link>
  );
}

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-surface-container-lowest border-r border-outline-variant p-md space-y-md shrink-0">
      <div className="flex items-center gap-3 px-sm mb-xl">
        <div className="flex flex-col">
          <span className="font-headline-md font-bold text-on-surface">
            Pebble
          </span>
        </div>
      </div>
      <nav className="grow space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            isActive={pathname === item.href}
          />
        ))}
      </nav>
    </aside>
  );
}
