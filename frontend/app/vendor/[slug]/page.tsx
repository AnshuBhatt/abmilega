import Link from "next/link";

import VendorGallery from "@/components/vendor/VendorGallery";
import VendorStats from "@/components/vendor/VendorStats";
import VendorAmenities from "@/components/vendor/VendorAmenities";
import VendorSocialLinks from "@/components/vendor/VendorSocialLinks";
import VendorTabs from "@/components/vendor/VendorTabs";

import VendorViewTracker from "@/components/VendorViewTracker";
import TrackedLink from "@/components/TrackedLink";
import SaveVendorButton from "@/components/SaveVendorButton";

async function getVendor(slug: string) {
  const res = await fetch(
    `http://localhost:5000/vendors/${slug}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

function formatPrice(value?: number | null) {
  if (value === null || value === undefined) {
    return "Contact";
  }

  return `₹${Number(value).toLocaleString()}`;
}

function findStatValue(vendor: any, labelPart: string) {
  const stat = vendor.stats?.find((item: any) =>
    String(item?.template?.label ?? "")
      .toLowerCase()
      .includes(labelPart.toLowerCase())
  );

  return stat?.value ?? null;
}

export default async function VendorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const vendor = await getVendor(slug);

  if (!vendor || vendor.error) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold">Vendor not found</h1>
      </div>
    );
  }

  const reviewCount = vendor.reviews?.length ?? 0;

  const averageRating =
    reviewCount > 0
      ? (
          vendor.reviews.reduce(
            (sum: number, review: any) => sum + Number(review.rating || 0),
            0
          ) / reviewCount
        ).toFixed(1)
      : null;

  const hasSocialLinks = Boolean(
    vendor.websiteUrl ||
      vendor.instagramUrl ||
      vendor.facebookUrl ||
      vendor.youtubeUrl ||
      vendor.linkedinUrl ||
      vendor.googleBusinessUrl
  );

  const addressLine = [
    vendor.address,
    vendor.city?.name,
    vendor.city?.state,
    vendor.zipcode,
  ]
    .filter(Boolean)
    .join(", ");

  const mapsQuery = encodeURIComponent(
    [vendor.name, vendor.address, vendor.city?.name, vendor.zipcode]
      .filter(Boolean)
      .join(" ")
  );

  const guestCapacity = findStatValue(vendor, "guest capacity");
  const yearsInBusiness = findStatValue(vendor, "years in business");

  return (
    <div className="bg-[#fafafa]">
      <VendorViewTracker vendorId={vendor.id} />

      <div className="mx-auto max-w-[1500px] px-4 py-6">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <span>›</span>
          <Link href="/vendors" className="hover:text-orange-500">
            Vendors
          </Link>
          <span>›</span>
          <span>{vendor.category?.name}</span>
          <span>›</span>
          <span>{vendor.city?.name}</span>
          <span>›</span>
          <span className="font-medium text-gray-800">{vendor.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <main className="space-y-6 lg:col-span-8">
            <section className="overflow-hidden rounded-[30px] border border-gray-200 bg-white shadow-sm">
              <div className="p-4 md:p-5">
                <div className="relative">
                  <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                    {vendor.isElite && (
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 shadow-sm">
                        👑 Elite Vendor
                      </span>
                    )}

                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                      ✓ Verified
                    </span>
                  </div>

                  <div className="absolute right-4 top-4 z-10">
                    <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 shadow-sm">
                      ● Open Now
                    </span>
                  </div>

                  <VendorGallery images={vendor.images ?? []} />
                </div>

                <div className="mt-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                        {vendor.name}
                      </h1>

                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-600">
                        <span className="font-medium text-orange-500">
                          📍 {vendor.city?.name}, {vendor.city?.state}
                        </span>
                        <span>• {vendor.category?.name}</span>
                        <span>• {reviewCount} reviews</span>
                      </div>

                      <p className="mt-4 max-w-3xl leading-7 text-gray-600">
                        {vendor.description}
                      </p>
                    </div>

                    <div className="shrink-0 md:text-right">
                      <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-600">
                        ⭐ {averageRating ?? "New"}
                      </div>
                      <p className="mt-2 text-sm text-gray-400">
                        {reviewCount} verified reviews
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <VendorStats stats={vendor.stats} />
                  </div>

                  {vendor.amenities?.length > 0 && (
                    <div className="mt-6">
                      <VendorAmenities amenities={vendor.amenities} />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {hasSocialLinks && (
              <section className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  Social Links
                </h2>
                <VendorSocialLinks vendor={vendor} />
              </section>
            )}

            <VendorTabs vendor={vendor} />
          </main>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>⭐</span>
                  <span>{averageRating ?? "New"}</span>
                </div>

                <div className="mt-4 rounded-2xl border border-gray-200 bg-[#fffaf4] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                    Starting From
                  </p>

                  <div className="mt-1 text-4xl font-bold text-orange-500">
                    {formatPrice(vendor.startingPrice)}
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    {vendor.pricingUnit || "Price on request"}
                  </p>

                  <p className="mt-3 text-xs text-gray-400">
                    {vendor.packages?.length
                      ? `${vendor.packages.length} packages available`
                      : "Packages available on request"}
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  <TrackedLink
                    href={`tel:${vendor.phone}`}
                    vendorId={vendor.id}
                    eventType="CALL_CLICK"
                  >
                    <span className="flex w-full items-center justify-center rounded-2xl bg-orange-500 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600">
                      📞 Call Now
                    </span>
                  </TrackedLink>

                  <TrackedLink
                    href={`https://wa.me/91${vendor.whatsapp}`}
                    vendorId={vendor.id}
                    eventType="WHATSAPP_CLICK"
                  >
                    <span className="flex w-full items-center justify-center rounded-2xl border border-green-300 bg-green-50 px-4 py-3.5 text-sm font-semibold text-green-700 transition hover:bg-green-100">
                      💬 WhatsApp
                    </span>
                  </TrackedLink>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    🔒 Free to contact · No hidden charges
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex-1 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 transition hover:border-orange-300 hover:text-orange-500"
                    >
                      Share
                    </button>

                    <div className="flex-1">
                      <SaveVendorButton vendorId={vendor.id} />
                    </div>

                    <button
                      type="button"
                      className="flex-1 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 transition hover:border-orange-300 hover:text-orange-500"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </section>

              <section className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm">
                <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-50 to-white p-3">
                  <div className="flex h-40 items-center justify-center rounded-xl bg-white/60 text-5xl">
                    🗺️
                  </div>
                </div>

                <p className="mt-4 text-sm font-medium text-gray-800">
                  📍 {addressLine || "Address not available"}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {vendor.zipcode ? `PIN ${vendor.zipcode}` : "PIN not available"}
                </p>

                {vendor.address && (
                  <TrackedLink
                    href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                    vendorId={vendor.id}
                    eventType="MAP_CLICK"
                  >
                    <span className="mt-4 flex w-full items-center justify-center rounded-2xl border border-orange-200 px-4 py-3 text-sm font-semibold text-orange-500 transition hover:bg-orange-50">
                      📍 Get Directions
                    </span>
                  </TrackedLink>
                )}
              </section>

              <section className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <div>
                    <p className="text-gray-500">Business Type</p>
                    <p className="font-medium text-gray-800">
                      {vendor.category?.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">City</p>
                    <p className="font-medium text-gray-800">
                      {vendor.city?.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Guest Capacity</p>
                    <p className="font-medium text-gray-800">
                      {guestCapacity ?? "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Established</p>
                    <p className="font-medium text-gray-800">
                      {yearsInBusiness ? `${yearsInBusiness} years` : "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Working Days</p>
                    <p className="font-medium text-gray-800">Mon - Sun</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Timings</p>
                    <p className="font-medium text-gray-800">9:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </section>

              <section className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm">
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-green-600">🛡️</span>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Verified Business
                      </p>
                      <p className="text-gray-500">Identity verified by AbMilega</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-green-600">🔐</span>
                    <div>
                      <p className="font-semibold text-gray-800">Secure Payments</p>
                      <p className="text-gray-500">No advance payment</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-green-600">💬</span>
                    <div>
                      <p className="font-semibold text-gray-800">24/7 Support</p>
                      <p className="text-gray-500">We are always here to help</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}