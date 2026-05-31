import AdminGymHeader from "./_components/admin-gym-header/AdminGymHeader";
import AdminGymList from "./_components/admin-gym-list/AdminGymList";
import { dummyGymBranches, dummyGymBrands } from "./dummy-data";

export default function AdminGymsPage() {
  const gymlist = dummyGymBranches
    .map((branch) => {
      const brand = dummyGymBrands.find((item) => item.id === branch.brandId);

      if (!brand) {
        return null;
      }

      return {
        ...branch,
        brand,
      };
    })
    .filter((branch) => branch !== null);
  return (
    <div className="space-y-xl px-gutter py-lg">
      <AdminGymHeader />
      <AdminGymList gymlist={gymlist} />
    </div>
  );
}
