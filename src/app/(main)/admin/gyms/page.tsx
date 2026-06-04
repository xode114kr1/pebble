import AdminGymClient from "./_components/admin-gym-client/AdminGymClient";
import { getAdminGymPageData } from "./queries";

export default async function AdminGymsPage() {
  const { brands, gymlist } = await getAdminGymPageData();

  return (
    <div className="space-y-xl px-gutter py-lg">
      <AdminGymClient brands={brands} gymlist={gymlist} />
    </div>
  );
}
