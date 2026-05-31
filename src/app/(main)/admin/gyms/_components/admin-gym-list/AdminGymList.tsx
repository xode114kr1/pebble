import { GymBranchWithBrand } from "../../types/adminGym";

export default function AdminGymList({
  gymlist,
}: {
  gymlist: GymBranchWithBrand[];
}) {
  console.log(gymlist);
  return <div>AdminGymList</div>;
}
