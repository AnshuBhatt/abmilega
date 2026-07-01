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
  const res = await fetch(`http://localhost:5000/vendors/${slug}`, {
    cache: "no-store",
  });

  return res.json();
}

function formatPrice(value?: number | string | null) {
  if (value === null || value === undefined || value === "") {
    return "Contact";
  }

  const amount = Number(value);
  if (Number.isNaN(amount) || amount <= 0) {
    return "Contact";
  }

  return `₹${amount.toLocaleString()}`;
}

function findStatValue(vendor: any, labelPart: string) {
  const stat = vendor.stats?.find((item: any) =>
    String(item?.template?.label ?? "")
      .toLowerCase()
      .includes(labelPart.toLowerCase())
  );

  return stat?.value ?? null;
}

function normalizeDigits(value?: string | null) {
  return String(value ?? "").replace(/\D/g, "");
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
      <div className="bg-[#faf7f4]">
        <div className="container mx-auto px-4 py-10">
          <div className="rounded-[28px] border border-gray-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">Vendor not found</h1>
            <p className="mt-2 text-sm text-gray-500">
              The page you are looking for does not exist or has been removed.
            </p>
          </div>
        </div>
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

  const galleryImages =
    vendor.images?.length > 0
      ? vendor.images
      : vendor.imageUrl
        ? [
            {
              id: 0,
              imageUrl: vendor.imageUrl,
              isPrimary: true,
              altText: vendor.name,
            },
          ]
        : [];

  const phoneDigits = normalizeDigits(vendor.phone);
  const whatsappDigits = normalizeDigits(vendor.whatsapp);

  const phoneHref = phoneDigits ? `tel:${phoneDigits}` : null;
  const whatsappHref = whatsappDigits
    ? `https://wa.me/${whatsappDigits.startsWith("91") ? whatsappDigits : `91${whatsappDigits}`}`
    : null;

  const topBadges = [
    vendor.isElite ? { label: "Elite Vendor", tone: "yellow" } : null,
    { label: "Verified Business", tone: "blue" },
    { label: "Open Now", tone: "green" },
  ].filter(Boolean) as { label: string; tone: "yellow" | "blue" | "green" }[];

  return (
    <div className="bg-[#faf7f4] text-gray-900">
      <VendorViewTracker vendorId={vendor.id} />

      <div className="mx-auto max-w-[1500px] px-4 py-6 md:px-6">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <span>›</span>
          <Link href="/vendors" className="hover:text-orange-500">
            Vendors
          </Link>
          <span>›</span>
          <Link href="/categories" className="hover:text-orange-500">
            {vendor.category?.name || "Category"}
          </Link>
          <span>›</span>
          <Link href="/cities" className="hover:text-orange-500">
            {vendor.city?.name || "City"}
          </Link>
          <span>›</span>
          <span className="font-medium text-gray-800">{vendor.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <main className="space-y-6">
            <section className="overflow-hidden rounded-[34px] border border-gray-100 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.05)]">
              <div className="relative">
                {topBadges.length > 0 && (
                  <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                    {topBadges.map((badge) => (
                      <span
                        key={badge.label}
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                          badge.tone === "yellow"
                            ? "bg-yellow-100 text-yellow-700"
                            : badge.tone === "blue"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {badge.tone === "yellow"
                          ? "👑 "
                          : badge.tone === "blue"
                            ? "✓ "
                            : "● "}
                        {badge.label}
                      </span>
                    ))}
                  </div>
                )}

                <div className="absolute right-4 top-4 z-10">
                  <span className="inline-flex items-center rounded-full border border-orange-200 bg-white/95 px-3 py-1 text-xs font-semibold text-orange-500 shadow-sm">
                    {reviewCount > 0 ? `⭐ ${averageRating}` : "New Vendor"}
                  </span>
                </div>

                <VendorGallery images={galleryImages} />
              </div>

              <div className="p-5 md:p-7">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                      {vendor.category?.name || "Vendor"}
                    </p>

                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
                      {vendor.name}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 font-semibold text-orange-600">
                        📍 {vendor.city?.name}
                        {vendor.city?.state ? `, ${vendor.city.state}` : ""}
                      </span>

                      <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1">
                        ⭐ {reviewCount > 0 ? averageRating : "New"}
                      </span>

                      <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1">
                        💬 {reviewCount} reviews
                      </span>

                      {guestCapacity && (
                        <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1">
                          👥 {guestCapacity}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 rounded-[28px] border border-orange-100 bg-[#fff7f0] p-4 md:w-[250px]">
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                      Starting From
                    </p>

                    <div className="mt-1 text-4xl font-black text-orange-500">
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
                </div>

                <p className="mt-6 max-w-4xl leading-7 text-gray-600">
                  {vendor.description}
                </p>
              </div>
            </section>

            {vendor.stats?.length > 0 && (
              <section className="rounded-[30px] border border-gray-100 bg-white p-5 shadow-sm md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Venue Stats</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Snapshot of the venue’s experience and capacity.
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <VendorStats stats={vendor.stats} />
                </div>
              </section>
            )}

            {vendor.amenities?.length > 0 && (
              <section className="rounded-[30px] border border-gray-100 bg-white p-5 shadow-sm md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Amenities</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      What makes this place easier and better for your event.
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <VendorAmenities amenities={vendor.amenities} />
                </div>
              </section>
            )}

            {hasSocialLinks && (
              <section className="rounded-[30px] border border-gray-100 bg-white p-5 shadow-sm md:p-6">
                <h2 className="text-2xl font-bold text-gray-900">Social Links</h2>
                <p className="mt-1 text-sm text-gray-500">
                  View the business on their official online channels.
                </p>

                <div className="mt-5">
                  <VendorSocialLinks vendor={vendor} />
                </div>
              </section>
            )}

            <VendorTabs vendor={vendor} />
          </main>

          <aside className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <section className="rounded-[34px] border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>⭐</span>
                  <span>{reviewCount > 0 ? averageRating : "New"}</span>
                  <span className="text-gray-300">•</span>
                  <span>{reviewCount} reviews</span>
                </div>

                <div className="mt-4 rounded-[26px] border border-gray-200 bg-[#fffaf4] p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                    Price
                  </p>

                  <div className="mt-1 text-4xl font-black text-orange-500">
                    {formatPrice(vendor.startingPrice)}
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    {vendor.pricingUnit || "Contact for pricing"}
                  </p>

                  <p className="mt-3 text-xs text-gray-400">
                    No hidden charges. Reach the owner directly.
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  {phoneHref && (
                    <TrackedLink
                      href={phoneHref}
                      vendorId={vendor.id}
                      eventType="CALL_CLICK"
                    >
                      <span className="flex w-full items-center justify-center rounded-2xl bg-orange-500 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600">
                        📞 Call Now
                      </span>
                    </TrackedLink>
                  )}

                  {whatsappHref && (
                    <TrackedLink
                      href={whatsappHref}
                      vendorId={vendor.id}
                      eventType="WHATSAPP_CLICK"
                    >
                      <span className="flex w-full items-center justify-center rounded-2xl border border-green-300 bg-green-50 px-4 py-3.5 text-sm font-semibold text-green-700 transition hover:bg-green-100">
                        💬 WhatsApp
                      </span>
                    </TrackedLink>
                  )}

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

              <section className="rounded-[34px] border border-gray-100 bg-white p-5 shadow-sm">
                <div className="rounded-[24px] border border-gray-100 bg-gradient-to-br from-orange-50 to-white p-3">
                  <div className="flex h-40 items-center justify-center rounded-[18px] bg-white/70 text-5xl">
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

              <section className="rounded-[34px] border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">Business Info</h3>

                <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                      City
                    </p>
                    <p className="mt-2 font-semibold text-gray-900">
                      {vendor.city?.name || "—"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                      Category
                    </p>
                    <p className="mt-2 font-semibold text-gray-900">
                      {vendor.category?.name || "—"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                      Guest Capacity
                    </p>
                    <p className="mt-2 font-semibold text-gray-900">
                      {guestCapacity || "—"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                      Established
                    </p>
                    <p className="mt-2 font-semibold text-gray-900">
                      {yearsInBusiness ? `${yearsInBusiness} years` : "—"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                      Working Days
                    </p>
                    <p className="mt-2 font-semibold text-gray-900">Mon - Sun</p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                      Timings
                    </p>
                    <p className="mt-2 font-semibold text-gray-900">9:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </section>

              <section className="rounded-[34px] border border-gray-100 bg-white p-5 shadow-sm">
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-green-600">🛡️</span>
                    <div>
                      <p className="font-semibold text-gray-800">Verified Business</p>
                      <p className="text-gray-500">Identity verified by AbMilega</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-green-600">🔐</span>
                    <div>
                      <p className="font-semibold text-gray-800">Secure Enquiries</p>
                      <p className="text-gray-500">Connect directly without middlemen</p>
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