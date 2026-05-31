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
      <td className="px-lg py-md font-headline font-semibold text-on-surface">
        {branch.brand.name}
      </td>

      <td className="body-md px-lg py-md text-on-surface-variant">
        {branch.branchName}
      </td>

      <td className="body-sm px-lg py-md text-on-surface-variant">
        {branch.location}
      </td>

      <td className="px-lg py-md">
        <div className="flex gap-1">
          {branch.brand.gradeColors.map((color) => (
            <GradeColorDot key={color.id} color={color} />
          ))}
        </div>
      </td>

      <td className="label-md px-lg py-md text-on-surface-variant">
        {branch.createdAt}
      </td>

      <td className="px-lg py-md text-right">
        <div className="flex justify-end gap-sm opacity-0 transition-opacity group-hover:opacity-100">
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
