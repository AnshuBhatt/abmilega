import Link from "next/link";

function getCategoryIcon(slug?: string) {
  switch (slug) {
    case "wedding-venue":
      return "🏛️";
    case "photographer":
    case "photographers":
      return "📷";
    case "makeup-artist":
    case "makeup-artists":
      return "💄";
    case "decorator":
    case "decorators":
      return "🎀";
    case "mehendi-artist":
    case "mehendi-artists":
      return "✋";
    case "dj":
    case "djs":
      return "🎧";
    case "caterer":
    case "caterers":
      return "🍽️";
    case "bridal-wear":
      return "👗";
    default:
      return "✨";
  }
}

export default function CategoryCard({
  category,
  count = 0,
}: {
  category: any;
  count?: number;
}) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group block rounded-[24px] border border-gray-100 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff7f0] text-2xl transition group-hover:bg-orange-500 group-hover:text-white">
        {getCategoryIcon(category.slug)}
      </div>

      <div className="mt-4 text-sm font-semibold text-gray-900">
        {category.name}
      </div>

      <div className="mt-1 text-xs text-gray-500">
        {count} vendors
      </div>
    </Link>
  );
}