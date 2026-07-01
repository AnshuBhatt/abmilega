import Link from "next/link";
import VendorCard from "@/components/VendorCard";

async function getCategories() {
  const res = await fetch("http://localhost:5000/categories", {
    cache: "no-store",
  });
  return res.json();
}

async function getCities() {
  const res = await fetch("http://localhost:5000/cities", {
    cache: "no-store",
  });
  return res.json();
}

async function getVendors() {
  const res = await fetch("http://localhost:5000/vendors", {
    cache: "no-store",
  });
  return res.json();
}

function getCategoryCount(vendors: any[], categorySlug: string) {
  return vendors.filter((vendor) => vendor.category?.slug === categorySlug).length;
}

function getCategoryStats(vendors: any[]) {
  const totalVendors = vendors.length;
  const totalRatings = vendors.reduce(
    (sum: number, vendor: any) => sum + (vendor.reviews?.length || 0),
    0
  );
  const eliteCount = vendors.filter((vendor: any) => vendor.isElite).length;
  const avgRating =
    vendors.length > 0
      ? (
          vendors.reduce(
            (sum: number, vendor: any) => sum + Number(vendor.rating || 0),
            0
          ) / vendors.length
        ).toFixed(1)
      : "0.0";

  return [
    { value: `${totalVendors}+`, label: "Total Vendors", icon: "🧩" },
    { value: `${totalRatings}+`, label: "Reviews", icon: "⭐" },
    { value: `${eliteCount}+`, label: "Elite Vendors", icon: "🏆" },
    { value: `${avgRating}★`, label: "Average Rating", icon: "📈" },
  ];
}

function getCategoryIcon(slug?: string) {
  switch (slug) {
    case "wedding-venue":
      return "🏛️";
    case "photographers":
    case "photographer":
      return "📷";
    case "makeup-artist":
    case "makeup-artists":
      return "💄";
    case "decorators":
    case "decorator":
      return "🎀";
    case "mehendi-artists":
    case "mehendi-artist":
      return "✋";
    case "djs":
    case "dj":
      return "🎧";
    case "caterers":
    case "caterer":
      return "🍽️";
    case "bridal-wear":
      return "👗";
    default:
      return "✨";
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();
  const cities = await getCities();
  const vendors = await getVendors();

  const topCategories = categories.slice(0, 10);
  const topRatedVendors = [...vendors]
    .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);

  const stats = getCategoryStats(vendors);

  const featuredPills = [
    "Verified Businesses",
    "Trusted Reviews",
    "Local Experts",
    "Quick Discovery",
  ];

  const serviceHighlights = [
    {
      title: "Photography and Video",
      count: "15,764 vendors",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop",
    },
    {
      title: "Caterers",
      count: "2,715 vendors",
      image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80&auto=format&fit=crop",
    },
    {
      title: "Wedding Planners",
      count: "7,374 vendors",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80&auto=format&fit=crop",
    },
    {
      title: "Transportation",
      count: "511 vendors",
      image:
        "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&q=80&auto=format&fit=crop",
    },
    {
      title: "Wedding Cards",
      count: "1,074 vendors",
      image:
        "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?w=1200&q=80&auto=format&fit=crop",
    },
    {
      title: "Flowers and Decoration",
      count: "819 vendors",
      image:
        "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80&auto=format&fit=crop",
    },
  ];

  const regions = [
    "Hyderabad",
    "Bangalore",
    "Mumbai",
    "Chennai",
    "Delhi NCR",
    "Lucknow",
  ];

  const whyChoose = [
    {
      icon: "🛡️",
      title: "Verified & Trusted",
      text: "Every business is verified for quality and reliability.",
    },
    {
      icon: "📞",
      title: "Direct Contact",
      text: "Connect directly with vendors with no middlemen.",
    },
    {
      icon: "📊",
      title: "Compare Easily",
      text: "Compare services, prices, photos and reviews side by side.",
    },
    {
      icon: "💰",
      title: "Best Prices",
      text: "Get the best deals and multiple quotes to choose from.",
    },
  ];

  return (
    <div className="bg-[#fffdfb] text-gray-900">
      <section className="mx-auto max-w-[1500px] px-4 py-6 md:px-6">
        <div className="overflow-hidden rounded-[34px] border border-orange-100 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative p-6 md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,37,0.12),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,184,136,0.10),transparent_35%)]" />
              <div className="relative z-10 max-w-[660px]">
                <p className="text-sm font-medium text-gray-600">
                  Browse verified categories across India
                </p>

                <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
                  Browse Categories
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-gray-500 md:text-lg">
                  Explore a wide range of trusted categories to find the perfect
                  service for you.
                </p>

                <form
                  action="/search"
                  method="GET"
                  className="mt-8 flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-3 shadow-sm md:flex-row"
                >
                  <select
                    name="city"
                    defaultValue=""
                    className="h-12 flex-1 rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none"
                  >
                    <option value="">All Cities</option>
                    {cities.map((city: any) => (
                      <option key={city.id} value={city.slug}>
                        {city.name}
                      </option>
                    ))}
                  </select>

                  <input
                    name="q"
                    type="text"
                    placeholder="Search for a category..."
                    className="h-12 flex-1 rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none"
                  />

                  <button
                    type="submit"
                    className="h-12 rounded-2xl bg-orange-500 px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                  >
                    🔎 Search
                  </button>
                </form>

                <div className="mt-5 flex flex-wrap gap-3">
                  {featuredPills.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {stats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[22px] border border-gray-100 bg-[#fffdfb] p-4 shadow-sm"
                    >
                      <div className="text-2xl">{item.icon}</div>
                      <div className="mt-3 text-2xl font-black text-orange-500">
                        {item.value}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative min-h-[320px] lg:min-h-[430px]">
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80&auto=format&fit=crop"
                alt="Category banner"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/10" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-8 md:px-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">All Categories</h2>
            <p className="mt-1 text-sm text-gray-500">
              Discover trusted services across every category.
            </p>
          </div>

          <Link href="/vendors" className="text-sm font-semibold text-orange-500">
            View All Vendors →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {topCategories.map((category: any) => {
            const count = getCategoryCount(vendors, category.slug);

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group rounded-[28px] border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#fff7f0] text-3xl transition group-hover:bg-orange-500 group-hover:text-white">
                  {getCategoryIcon(category.slug)}
                </div>

                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {count}+ Vendors
                </p>

                <div className="mt-4 text-2xl text-orange-500">→</div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-6 md:px-6">
        <div className="rounded-[34px] border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Explore Categories by Service</h2>
              <p className="mt-1 text-sm text-gray-500">
                Featured category collections inspired by the most searched services.
              </p>
            </div>
            <div className="hidden text-sm font-semibold text-orange-500 md:block">
              Scroll for more →
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {serviceHighlights.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-[28px] border border-gray-100 bg-[#fffdfb] shadow-sm"
              >
                <div className="relative h-52">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-[20px] bg-white/95 p-4 shadow-sm backdrop-blur">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{item.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-8 md:px-6">
        <div className="overflow-hidden rounded-[34px] border border-orange-100 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-semibold text-gray-500">
                Are you a Business Owner?
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                Grow your business with{" "}
                <span className="text-orange-500">AbMilega</span>
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                Get more visibility, leads and bookings for your business.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "Premium Listings",
                  "Unlimited Inquiries",
                  "Analytics Dashboard",
                  "Verified Badge",
                  "WhatsApp Integration",
                  "Priority Support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                      ✓
                    </span>
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/list-my-business"
                className="mt-8 inline-flex rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                List Your Business
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-[28px]">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop"
                alt="Business owner banner"
                className="h-full min-h-[280px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-4 md:px-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Top Rated Vendors in All Categories</h2>
            <p className="mt-1 text-sm text-gray-500">
              Handpicked top-rated vendors across all categories.
            </p>
          </div>
          <Link href="/vendors" className="text-sm font-semibold text-orange-500">
            View All Vendors →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {topRatedVendors.map((vendor: any) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              variant="featured"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-8 md:px-6">
        <div className="rounded-[34px] border border-gray-100 bg-[#fffaf6] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Can&apos;t find what you&apos;re looking for?</h2>
              <p className="mt-1 text-sm text-gray-600">
                Let us help you find the perfect service for your needs.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              Get Help Now
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-4 md:px-6">
        <div className="rounded-[34px] border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-center text-3xl font-bold">Why Choose AbMilega?</h2>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="rounded-[26px] border border-gray-100 bg-[#fffdfb] p-5"
              >
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-8 md:px-6">
        <div className="overflow-hidden rounded-[34px] border border-orange-100 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-3xl font-bold">Best Services by Region</h2>
              <p className="mt-2 text-sm text-gray-500">
                Popular destinations with strong vendor activity.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                {regions.map((region) => (
                  <div
                    key={region}
                    className="rounded-[22px] border border-gray-100 bg-[#fffdfb] p-4"
                  >
                    <p className="font-semibold text-gray-900">{region}</p>
                    <p className="mt-1 text-sm text-gray-500">Trusted vendors</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px]">
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80&auto=format&fit=crop"
                alt="Regional highlight"
                className="h-full min-h-[240px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}