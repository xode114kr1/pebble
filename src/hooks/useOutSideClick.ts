"use client";

import { RefObject, useEffect, useRef } from "react";

export default function useOutSideClick<T extends HTMLElement>(
  onOutSideClick: () => void,
  enabled = true,
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      onOutSideClick();
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [enabled, onOutSideClick]);

  return ref;
}
