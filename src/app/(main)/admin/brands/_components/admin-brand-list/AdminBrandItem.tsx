import { AdminBrand } from "../../types/adminBrand";

type AdminBrandItemProps = {
  brand: AdminBrand;
  onClick: () => void;
};

export default function AdminBrandItem({
  brand,
  onClick,
}: AdminBrandItemProps) {
  return (
    <tr
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      className="group cursor-pointer transition-colors hover:bg-surface-bright focus:bg-surface-bright focus:outline-none"
    >
      <td className="whitespace-nowrap px-sm py-md font-headline font-semibold text-on-surface sm:px-lg">
        {brand.name}
      </td>

      <td className="hidden px-lg py-md lg:table-cell">
        <div className="flex items-center">
          {brand.colors.length > 0 ? (
            <div className="flex overflow-hidden">
              {brand.colors.map((brandColor) => (
                <span
                  key={brandColor.id}
                  className="h-7 w-8"
                  style={{
                    backgroundColor: brandColor.difficultyColor.colorCode,
                  }}
                  title={`${brandColor.order}. ${brandColor.difficultyColor.name}`}
                />
              ))}
            </div>
          ) : (
            <span className="body-sm text-on-surface-variant">-</span>
          )}
        </div>
      </td>

      <td className="label-md px-sm py-md text-on-surface-variant sm:px-lg">
        {brand.createdAt}
      </td>
    </tr>
  );
}
