import GradeColorDot from "@/components/grade-color-dot/GradeColorDot";
import { GymBranchWithBrand } from "../../types/adminGym";

export default function AdminGymItem({
  branch,
}: {
  branch: GymBranchWithBrand;
}) {
  return (
    <tr className="group transition-colors hover:bg-surface-bright">
      <td className="whitespace-nowrap px-sm py-md font-headline font-semibold text-on-surface sm:px-lg">
        {branch.brand.name}
      </td>

      <td className="body-md whitespace-nowrap px-sm py-md text-on-surface-variant sm:px-lg">
        {branch.branchName}
      </td>

      <td className="body-sm hidden whitespace-nowrap px-lg py-md text-on-surface-variant lg:table-cell">
        {branch.location}
      </td>

      <td className="hidden px-lg py-md lg:table-cell">
        <div className="flex gap-1">
          {branch.brand.gradeColors.map((color) => (
            <GradeColorDot key={color.id} color={color} />
          ))}
        </div>
      </td>

      <td className="label-md px-sm py-md text-on-surface-variant sm:px-lg">
        {branch.createdAt}
      </td>
    </tr>
  );
}
