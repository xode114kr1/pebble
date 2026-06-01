import AdminGymClient from "./_components/admin-gym-client/AdminGymClient";
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
      <AdminGymClient gymlist={gymlist} />
    </div>
  );
}
