import Link from "next/link";
import VendorCard from "@/components/VendorCard";
import CategoryCard from "@/components/CategoryCard";
import CityCard from "@/components/CityCard";

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

function getCityCount(vendors: any[], citySlug: string) {
  return vendors.filter((vendor) => vendor.city?.slug === citySlug).length;
}

export default async function HomePage() {
  const categories = await getCategories();
  const cities = await getCities();
  const vendors = await getVendors();

  const featuredVendors = vendors
    .filter((vendor: any) => vendor.isElite)
    .slice(0, 5);

  const trendingVendors = [...vendors]
    .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
    .filter((vendor: any) => !vendor.isElite)
    .slice(0, 5);

  const topCategories = categories.slice(0, 8);
  const topCities = cities.slice(0, 5);

  const stats = [
    { value: "25,000+", label: "Verified Vendors", icon: "🛡️" },
    { value: "150,000+", label: "Monthly Visitors", icon: "👀" },
    { value: "50,000+", label: "Successful Bookings", icon: "📦" },
    { value: "120+", label: "Cities Covered", icon: "📍" },
    { value: "4.8★", label: "Average Rating", icon: "⭐" },
    { value: "24/7", label: "Customer Support", icon: "📞" },
  ];

  const whyChoose = [
    {
      icon: "🛡️",
      title: "Verified & Trusted Vendors",
      text: "Every vendor is verified for quality and reliability.",
    },
    {
      icon: "📞",
      title: "Direct Contact",
      text: "Connect directly with vendors with no middlemen.",
    },
    {
      icon: "📊",
      title: "Compare Easily",
      text: "Compare packages, reviews and prices side-by-side.",
    },
    {
      icon: "💰",
      title: "Best Prices Guaranteed",
      text: "Get the best deals and multiple quotes to choose from.",
    },
  ];

  const appBenefits = [
    "Premium listings",
    "Verified badge",
    "Unlimited inquiries",
    "Analytics dashboard",
    "WhatsApp integration",
    "Priority support",
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
                 Now Live Across Rajasthan · Expanding Pan-India
                </p>

                <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
                  Jo bhi chahiye,
                  <br />
                  {" "}
                  <span className="text-orange-500">
                   Ab Milega! ⚡
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-gray-500 md:text-lg">
                  India's local discovery platform — find verified vendors, professionals & services near you, instantly.
                </p>

                <form
                  action="/search"
                  method="GET"
                  className="mt-8 flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-3 shadow-sm md:flex-row"
                >
                  <select
                    name="category"
                    className="h-12 flex-1 rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none"
                    defaultValue=""
                  >
                    <option value="">All Categories</option>
                    {categories.map((category: any) => (
                      <option key={category.id} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  <select
                    name="city"
                    className="h-12 flex-1 rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none"
                    defaultValue=""
                  >
                    <option value="">All Cities</option>
                    {cities.map((city: any) => (
                      <option key={city.id} value={city.slug}>
                        {city.name}
                      </option>
                    ))}
                  </select>

                  <button
                    type="submit"
                    className="h-12 rounded-2xl bg-orange-500 px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                  >
                    🔎 Search
                  </button>
                </form>

                <div className="mt-5 flex flex-wrap gap-3">
                  {[
                    "Verified Vendors",
                    "Secure & Trusted",
                    "24/7 Support",
                    "No Hidden Charges",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative min-h-[320px] lg:min-h-[430px]">
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80&auto=format&fit=crop"
                alt="Wedding banquet"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/10" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 pb-2 md:px-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Popular Categories</h2>
          </div>
          <Link href="/categories" className="text-sm font-semibold text-orange-500">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
          {topCategories.map((category: any) => (
            <CategoryCard
              key={category.id}
              category={category}
              count={getCategoryCount(vendors, category.slug)}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-8 md:px-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Popular Cities</h2>
          </div>
          <Link href="/cities" className="text-sm font-semibold text-orange-500">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {topCities.map((city: any) => (
            <CityCard
              key={city.id}
              city={city}
              count={getCityCount(vendors, city.slug)}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-4 md:px-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Featured Vendors</h2>
            <p className="mt-1 text-sm text-gray-500">Elite vendors handpicked for you.</p>
          </div>
          <Link href="/vendors" className="text-sm font-semibold text-orange-500">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {featuredVendors.map((vendor: any) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              variant="featured"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-8 md:px-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Trending Vendors Near You</h2>
            <p className="mt-1 text-sm text-gray-500">
              Most viewed and contacted vendors this week.
            </p>
          </div>
          <Link href="/vendors" className="text-sm font-semibold text-orange-500">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {trendingVendors.map((vendor: any) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              variant="trending"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-8 md:px-6">
        <div className="grid grid-cols-2 gap-4 rounded-[30px] border border-orange-100 bg-white p-5 shadow-sm md:grid-cols-3 xl:grid-cols-6">
          {stats.map((item) => (
            <div key={item.label} className="text-center">
              <div className="mb-2 text-3xl">{item.icon}</div>
              <div className="text-2xl font-black text-orange-500">{item.value}</div>
              <div className="mt-1 text-sm text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-6 md:px-6">
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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[34px] border border-orange-100 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.15fr_0.85fr]">
              <div>
                <h2 className="text-3xl font-bold">Grow Your Business With AbMilega</h2>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Get more visibility, leads and bookings for your business.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {appBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                        ✓
                      </span>
                      <span className="text-sm font-medium text-gray-700">{benefit}</span>
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
                  alt="Business growth"
                  className="h-full min-h-[280px] w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[34px] border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-bold">Take AbMilega With You</h2>
            <p className="mt-3 text-sm leading-6 text-gray-500">
              Find and book the best vendors on the go.
            </p>

            <div className="mt-6 flex gap-3">
              <div className="rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white">
                Google Play
              </div>
              <div className="rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white">
                App Store
              </div>
            </div>

            <div className="mt-8 rounded-[28px] bg-[#fff7f0] p-5">
              <h3 className="text-2xl font-bold">Get Wedding Tips & Exclusive Offers</h3>
              <p className="mt-2 text-sm text-gray-500">
                Subscribe to our newsletter and never miss an update!
              </p>

              <form className="mt-5 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-12 flex-1 rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none"
                />
                <button className="h-12 rounded-2xl bg-orange-500 px-6 text-sm font-semibold text-white">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}