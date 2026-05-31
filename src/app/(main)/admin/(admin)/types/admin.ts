import { LucideIcon } from "lucide-react";

export type AdminFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  active: boolean;
  stats?: string;
};
