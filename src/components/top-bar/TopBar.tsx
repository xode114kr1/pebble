"use client";

import { usePathname } from "next/navigation";

export default function TopBar() {
  const pathName = usePathname();

  return (
    <header className="sticky top-0 z-40 mx-auto flex h-16 w-full items-center border-b border-outline-variant bg-surface px-gutter">
      <h1 className="headline-md font-bold text-on-surface">
        {pathName === "/"
          ? "Home"
          : pathName.charAt(1).toUpperCase() + pathName.slice(2)}
      </h1>
    </header>
  );
}
