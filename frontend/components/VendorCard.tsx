import Link from "next/link";

function getCategoryLabel(slug?: string) {
  if (!slug) return "VENDOR";
  return slug.replace(/-/g, " ").toUpperCase();
}

export default function VendorCard({
  vendor,
  variant = "featured",
}: {
  vendor: any;
  variant?: "featured" | "trending";
}) {
  const amenities =
    vendor.amenities
      ?.slice(0, variant === "featured" ? 3 : 2)
      ?.map((a: any) => a.amenity?.name)
      ?.filter(Boolean) || [];

  const imageUrl =
    vendor.imageUrl && vendor.imageUrl !== "sd"
      ? vendor.imageUrl
      : "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80&auto=format&fit=crop";

  const reviewCount = vendor.reviews?.length || 0;
  const rating = vendor.rating > 0 ? Number(vendor.rating).toFixed(1) : "New";

  if (variant === "trending") {
    return (
      <div className="overflow-hidden rounded-[26px] border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative h-40">
          <img src={imageUrl} alt={vendor.name} className="h-full w-full object-cover" />
          {vendor.isElite && (
            <span className="absolute left-3 top-3 rounded-full bg-pink-500 px-3 py-1 text-[11px] font-bold text-white">
              TRENDING
            </span>
          )}
          <button className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-gray-600">
            ♡ Save
          </button>
        </div>

        <div className="p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
            {getCategoryLabel(vendor.category?.slug || vendor.category?.name)}
          </div>

          <Link href={`/vendor/${vendor.slug}`}>
            <h3 className="mt-1 text-lg font-bold text-gray-900 hover:text-orange-500">
              {vendor.name}
            </h3>
          </Link>

          <p className="mt-1 text-sm text-gray-500">
            📍 {vendor.city?.name}, {vendor.city?.state}
          </p>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="text-orange-500">⭐ {rating}</span>
            <span className="text-gray-400">({reviewCount} Reviews)</span>
          </div>

          <p className="mt-3 text-sm font-semibold text-gray-700">
            {variant === "trending" ? `${reviewCount * 2 + 40} Leads` : ""}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-56">
        <img src={imageUrl} alt={vendor.name} className="h-full w-full object-cover" />

        <button className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-gray-600">
          ♡ Save
        </button>

        {vendor.isElite && (
          <span className="absolute right-3 top-3 rounded-full bg-yellow-100 px-3 py-1 text-[11px] font-bold text-yellow-700">
            ELITE
          </span>
        )}

        <div className="absolute bottom-3 right-3 rounded-xl bg-white/95 px-3 py-2 text-xs font-medium text-gray-700 shadow-sm">
          📸 {vendor.images?.length || 12} Photos
        </div>
      </div>

      <div className="p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
          {getCategoryLabel(vendor.category?.slug || vendor.category?.name)}
        </div>

        <Link href={`/vendor/${vendor.slug}`}>
          <h3 className="mt-1 text-2xl font-bold text-gray-900 hover:text-orange-500">
            {vendor.name}
          </h3>
        </Link>

        <p className="mt-2 text-sm text-gray-500">
          📍 {vendor.city?.name}, {vendor.city?.state}
        </p>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="text-orange-500">⭐ {rating}</span>
          <span className="text-gray-400">({reviewCount} Reviews)</span>
        </div>

        {amenities.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {amenities.map((amenity: string) => (
              <span
                key={amenity}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
              >
                {amenity}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 text-xl font-bold text-green-700">
          ₹{Number(vendor.startingPrice || 0).toLocaleString()}
          <span className="ml-2 text-sm font-normal text-gray-500">
            {vendor.pricingUnit}
          </span>
        </div>

        <div className="mt-5 flex gap-2">
          <a
            href={`tel:${vendor.phone}`}
            className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-700"
          >
            Call
          </a>
          <a
            href={`https://wa.me/${vendor.whatsapp}`}
            target="_blank"
            rel="noreferrer noopener"
            className="flex-1 rounded-2xl bg-green-500 px-4 py-3 text-center text-sm font-medium text-white"
          >
            WhatsApp
          </a>
          <Link
            href={`/vendor/${vendor.slug}`}
            className="flex-1 rounded-2xl bg-orange-500 px-4 py-3 text-center text-sm font-medium text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}