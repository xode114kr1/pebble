import AdminFeatureCard from "./_components/AdminFeatureCard";
import { adminFeatures } from "./constants/adminFeatures";

export default function AdminPage() {
  return (
    <div className="w-full space-y-10 px-gutter py-lg">
      <section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {adminFeatures.map((feature) => (
            <AdminFeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </section>
    </div>
  );
}
