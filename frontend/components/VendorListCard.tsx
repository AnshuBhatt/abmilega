import Link from "next/link";

function iconForCategory(slug?: string) {
  switch (slug) {
    case "wedding-venue":
      return "🏛️";
    case "salon":
      return "💇";
    case "doctor":
      return "👨‍⚕️";
    case "dentist":
      return "🦷";
    case "restaurant":
      return "🍽️";
    case "hotel":
      return "🏨";
    case "tutor":
      return "📚";
    default:
      return "🏢";
  }
}

export default function VendorListCard({
  vendor,
  viewMode = "list",
}: {
  vendor: any;
  viewMode?: "list" | "grid";
}) {
  const amenities =
    vendor.amenities?.slice(0, 4)?.map((a: any) => a.amenity?.name) || [];

  const reviewCount = vendor.reviews?.length || 0;

  const averageRating =
    reviewCount > 0
      ? (
          vendor.reviews.reduce(
            (sum: number, review: any) => sum + Number(review.rating || 0),
            0
          ) / reviewCount
        ).toFixed(1)
      : null;

  const images = vendor.images || [];
  const primaryImage =
    images.find((item: any) => item.isPrimary)?.imageUrl ||
    images[0]?.imageUrl ||
    null;

  const hiddenCount = Math.max(images.length - 4, 0);

  if (viewMode === "grid") {
    return (
      <article className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
        <div className="relative h-56 bg-[#fdf2e6]">
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={vendor.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-7xl">
              {iconForCategory(vendor.category?.slug)}
            </div>
          )}

          <button className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
            ♡ Save
          </button>

          <div className="absolute bottom-3 right-3 rounded-xl bg-white/95 px-3 py-2 text-xs font-medium text-gray-700 shadow-sm">
            📸 {images.length || 0} Photos
          </div>

          {vendor.isElite && (
            <span className="absolute right-3 top-3 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 shadow-sm">
              ELITE
            </span>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
            {vendor.category?.name}
          </p>

          <Link href={`/vendor/${vendor.slug}`}>
            <h3 className="mt-1 text-xl font-bold text-gray-900 hover:text-orange-500">
              {vendor.name}
            </h3>
          </Link>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span>📍 {vendor.city?.name}, {vendor.city?.state}</span>
            <span>⭐ {averageRating || "New"}</span>
            <span>{reviewCount > 0 ? `${reviewCount} Reviews` : "No Reviews"}</span>
          </div>

          {amenities.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
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

          <div className="mt-4">
            {vendor.startingPrice ? (
              <div className="text-2xl font-bold text-green-700">
                ₹{Number(vendor.startingPrice).toLocaleString()}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  {vendor.pricingUnit || ""}
                </span>
              </div>
            ) : (
              <div className="text-base font-medium text-gray-500">
                Price on Request
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`tel:${vendor.phone}`}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-700"
            >
              Call
            </a>
            <a
              href={`https://wa.me/${vendor.whatsapp}`}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-xl bg-green-500 px-4 py-2 text-sm text-white"
            >
              WhatsApp
            </a>
            <Link
              href={`/vendor/${vendor.slug}`}
              className="rounded-xl bg-orange-500 px-4 py-2 text-sm text-white"
            >
              View Details
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex flex-col lg:flex-row">
        <div className="relative lg:w-[360px]">
          <div className="relative h-[240px] bg-[#fdf2e6] lg:h-full">
            {primaryImage ? (
              <img
                src={primaryImage}
                alt={vendor.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-7xl">
                {iconForCategory(vendor.category?.slug)}
              </div>
            )}

            <button className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
              ♡ Save
            </button>

            <div className="absolute bottom-3 right-3 rounded-xl bg-white/95 px-3 py-2 text-xs font-medium text-gray-700 shadow-sm">
              📸 {images.length || 0} Photos
            </div>
          </div>
        </div>

        <div className="flex-1 p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
                {vendor.category?.name}
              </p>

              <Link href={`/vendor/${vendor.slug}`}>
                <h3 className="mt-1 text-2xl font-bold text-gray-900 hover:text-orange-500">
                  {vendor.name}
                </h3>
              </Link>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span>📍 {vendor.city?.name}, {vendor.city?.state}</span>
                <span>⭐ {averageRating || "New"}</span>
                <span>{reviewCount > 0 ? `${reviewCount} Reviews` : "No Reviews"}</span>
              </div>
            </div>

            {vendor.isElite && (
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                ELITE
              </span>
            )}
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

          <div className="mt-4">
            {vendor.startingPrice ? (
              <div className="text-2xl font-bold text-green-700">
                ₹{Number(vendor.startingPrice).toLocaleString()}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  {vendor.pricingUnit || ""}
                </span>
              </div>
            ) : (
              <div className="text-base font-medium text-gray-500">
                Price on Request
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`tel:${vendor.phone}`}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-700"
            >
              Call
            </a>
            <a
              href={`https://wa.me/${vendor.whatsapp}`}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-xl bg-green-500 px-4 py-2 text-sm text-white"
            >
              WhatsApp
            </a>
            <Link
              href={`/vendor/${vendor.slug}`}
              className="rounded-xl bg-orange-500 px-4 py-2 text-sm text-white"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}