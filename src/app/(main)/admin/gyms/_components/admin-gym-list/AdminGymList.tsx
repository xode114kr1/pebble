import { Pencil, Trash2 } from "lucide-react";
import { GymBranchWithBrand } from "../../types/adminGym";
import GradeColorDot from "@/components/grade-color-dot/GradeColorDot";

export default function AdminGymList({
  gymlist,
}: {
  gymlist: GymBranchWithBrand[];
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-card">
      <table className="w-full border-collapse text-left">
        <thead className="border-b border-outline-variant bg-surface-container-low">
          <tr>
            <th className="label-sm px-lg py-md uppercase text-on-surface-variant">
              브랜드명
            </th>
            <th className="label-sm px-lg py-md uppercase text-on-surface-variant">
              지점명
            </th>
            <th className="label-sm px-lg py-md uppercase text-on-surface-variant">
              위치
            </th>
            <th className="label-sm px-lg py-md uppercase text-on-surface-variant">
              난이도 색상 목록
            </th>
            <th className="label-sm px-lg py-md uppercase text-on-surface-variant">
              등록일
            </th>
            <th className="label-sm px-lg py-md text-right uppercase text-on-surface-variant">
              관리
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-outline-variant">
          {gymlist.map((branch) => (
            <tr
              key={branch.id}
              className="group transition-colors hover:bg-surface-bright"
            >
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
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-outline-variant bg-surface-container-lowest px-lg py-md">
        <p className="label-sm text-on-surface-variant">
          Showing 1 to {gymlist.length} of {gymlist.length} entries
        </p>

        <div className="flex gap-sm">
          <button
            type="button"
            disabled
            className="rounded-lg border border-outline-variant px-sm py-xs text-on-surface-variant opacity-50"
          >
            이전
          </button>

          <button
            type="button"
            className="label-sm rounded-lg bg-primary px-md py-xs text-on-primary"
          >
            1
          </button>

          <button
            type="button"
            disabled
            className="rounded-lg border border-outline-variant px-sm py-xs text-on-surface-variant opacity-50"
          >
            다음
          </button>
        </div>
      </div>
    </section>
  );
}
