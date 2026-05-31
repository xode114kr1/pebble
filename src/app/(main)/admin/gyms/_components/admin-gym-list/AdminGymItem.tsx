import GradeColorDot from "@/components/grade-color-dot/GradeColorDot";
import { Pencil, Trash2 } from "lucide-react";
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

      <td className="px-sm py-md text-right sm:px-lg">
        <div className="flex justify-end gap-xs opacity-100 transition-opacity lg:gap-sm lg:opacity-0 lg:group-hover:opacity-100">
          <button
            type="button"
            className="rounded-lg p-sm text-on-surface-variant transition-all hover:bg-surface-container-high hover:text-primary"
            aria-label="지점 수정"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            className="rounded-lg p-sm text-on-surface-variant transition-all hover:bg-error-container hover:text-error"
            aria-label="지점 삭제"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
