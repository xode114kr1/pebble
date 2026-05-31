import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AdminFeature } from "../types/admin";

type AdminFeatureCardProps = {
  feature: AdminFeature;
};

export default function AdminFeatureCard({ feature }: AdminFeatureCardProps) {
  const Icon = feature.icon;

  if (feature.active && feature.href) {
    return (
      <Link
        href={feature.href}
        className="card-interactive group relative block overflow-hidden"
      >
        <div className="relative z-10">
          <div className="mb-lg flex h-14 w-14 items-center justify-center rounded-xl bg-primary-fixed text-on-primary-fixed shadow-card">
            <Icon size={30} strokeWidth={2.25} />
          </div>

          <div className="mb-sm flex items-start justify-between gap-md">
            <h3 className="headline-md text-on-surface">{feature.title}</h3>

            <ArrowRight
              size={22}
              strokeWidth={2.25}
              className="translate-x-[-8px] text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </div>

          <p className="body-sm mb-lg text-on-surface-variant">
            {feature.description}
          </p>

          {feature.stats && (
            <div className="chip gap-sm bg-surface-container-low text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {feature.stats}
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <div className="card relative cursor-not-allowed overflow-hidden opacity-60 grayscale-[0.35]">
      <span className="label-sm absolute right-md top-md rounded-sm bg-surface-container-high px-sm py-xs uppercase text-outline">
        Coming Soon
      </span>

      <div className="mb-lg flex h-14 w-14 items-center justify-center rounded-xl bg-surface-container-highest text-on-surface-variant">
        <Icon size={30} strokeWidth={2.25} />
      </div>

      <h3 className="headline-md mb-sm text-on-surface">{feature.title}</h3>

      <p className="body-sm text-on-surface-variant">{feature.description}</p>
    </div>
  );
}
