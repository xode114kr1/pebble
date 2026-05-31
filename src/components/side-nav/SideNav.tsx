"use client";

import {
  CirclePlus,
  LayoutDashboard,
  LucideIcon,
  Map,
  Mountain,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: LayoutDashboard, label: "Home", href: "/" },
  { icon: Map, label: "Gym", href: "/gym" },
  { icon: CirclePlus, label: "Record", href: "/record" },
  { icon: Users, label: "Community", href: "/community" },
  {
    icon: ShieldCheck,
    label: "Admin",
    href: "/admin",
    adminOnly: true,
  },
];

type NavItemProps = {
  item: {
    icon: LucideIcon;
    label: string;
    href: string;
  };
  isActive: boolean;
};

function NavItem({ item, isActive }: NavItemProps) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={
        isActive
          ? "flex items-center gap-3 border-l-4 border-primary bg-surface-container-low px-4 py-3 text-primary transition-transform active:scale-95"
          : "flex items-center gap-3 px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container active:scale-95"
      }
    >
      <Icon size={20} strokeWidth={2.25} />
      <span className="label-md">{item.label}</span>
    </Link>
  );
}

export default function SideNav() {
  const pathname = usePathname();

  const { data: session } = useSession();

  const visibleNavItems = navItems.filter((item) => {
    if (item.adminOnly) {
      return session?.user.role === "ADMIN";
    }

    return true;
  });

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-surface-container-lowest border-r border-outline-variant p-md space-y-md shrink-0">
      <Link
        href="/"
        className="mb-xl flex items-center gap-1 px-sm headline-md font-bold text-on-surface transition-opacity hover:opacity-80"
        aria-label="Pebble 홈으로 이동"
      >
        <Mountain size={30} fill="currentColor" />
        Pebble
      </Link>
      <nav className="grow space-y-1">
        {visibleNavItems.map((item) => (
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
