import { GymBranchWithBrand } from "../../types/adminGym";
import AdminGymItem from "./AdminGymItem";

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
            <th className="label-sm px-sm py-md uppercase text-on-surface-variant sm:px-lg">
              브랜드명
            </th>
            <th className="label-sm px-sm py-md uppercase text-on-surface-variant sm:px-lg">
              지점명
            </th>
            <th className="label-sm hidden px-lg py-md uppercase text-on-surface-variant lg:table-cell">
              위치
            </th>
            <th className="label-sm hidden px-lg py-md uppercase text-on-surface-variant lg:table-cell">
              난이도 색상 목록
            </th>
            <th className="label-sm px-sm py-md uppercase text-on-surface-variant sm:px-lg">
              등록일
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-outline-variant">
          {gymlist.map((branch) => (
            <AdminGymItem key={branch.id} branch={branch} />
          ))}
        </tbody>
      </table>

      <div className="flex flex-col gap-md border-t border-outline-variant bg-surface-container-lowest px-lg py-md sm:flex-row sm:items-center sm:justify-between">
        <p className="label-sm text-on-surface-variant">
          Showing 1 to {gymlist.length} of {gymlist.length} entries
        </p>

        <div className="flex justify-end gap-sm">
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
