"use client";

import { Building2, LayoutGrid, Tags } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNavItems = [
  {
    label: "관리 홈",
    href: "/admin",
    icon: LayoutGrid,
  },
  {
    label: "브랜드 관리",
    href: "/admin/brands",
    icon: Tags,
  },
  {
    label: "지점 관리",
    href: "/admin/gyms",
    icon: Building2,
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-outline-variant bg-surface-container-lowest px-gutter">
      <div className="flex gap-2 overflow-x-auto py-3">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive
                  ? "flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-on-primary"
                  : "flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
              }
            >
              <Icon size={16} className="shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
