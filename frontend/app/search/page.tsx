"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import VendorListCard from "@/components/VendorListCard";

type SortBy = "rating" | "priceLow" | "priceHigh" | "newest";
type ViewMode = "list" | "grid";

function iconForCategory(slug: string) {
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

export default function SearchPage() {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [vendors, setVendors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>("rating");
  const [eliteOnly, setEliteOnly] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [loading, setLoading] = useState(false);

  const popularCategories = useMemo(() => categories.slice(0, 7), [categories]);

  useEffect(() => {
    const loadData = async () => {
      const [categoryRes, cityRes] = await Promise.all([
        fetch("http://localhost:5000/categories"),
        fetch("http://localhost:5000/cities"),
      ]);

      const [categoryData, cityData] = await Promise.all([
        categoryRes.json(),
        cityRes.json(),
      ]);

      setCategories(categoryData);
      setCities(cityData);
    };

    loadData();
  }, []);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (category) params.set("category", category);
      if (city) params.set("city", city);
      if (eliteOnly) params.set("elite", "true");
      if (sortBy) params.set("sort", sortBy);

      const url = `http://localhost:5000/vendors?${params.toString()}`;
      const res = await fetch(url);
      const data = await res.json();

      setVendors(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, eliteOnly, category, city]);

  return (
    <div className="bg-[#fafafa]">
      <div className="mx-auto max-w-[1500px] px-4 py-6">
        <section className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm md:p-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Find the Best Vendors Near You
          </h1>
          <p className="mt-2 text-sm text-gray-500 md:text-base">
            Search verified vendors, businesses and services.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-orange-400"
            >
              <option value="">All Categories</option>
              {categories.map((item: any) => (
                <option key={item.id} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-orange-400"
            >
              <option value="">All Cities</option>
              {cities.map((item: any) => (
                <option key={item.id} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSearch}
              className="h-12 rounded-2xl bg-orange-500 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              Search
            </button>
          </div>
        </section>

        <div className="mt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
            Popular Categories
          </p>

          <div className="flex flex-wrap gap-2">
            {popularCategories.map((item: any) => {
              const active = category === item.slug;

              return (
                <button
                  key={item.id}
                  onClick={() => setCategory(item.slug)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "border-orange-300 bg-orange-50 text-orange-600"
                      : "border-gray-200 bg-white text-gray-700 hover:border-orange-200 hover:bg-orange-50"
                  }`}
                >
                  <span>{iconForCategory(item.slug)}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => {
                  setCategory("");
                  setCity("");
                  setEliteOnly(false);
                }}
                className="text-sm font-medium text-orange-500 hover:text-orange-600"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((item: any) => (
                    <option key={item.id} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Location
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none"
                >
                  <option value="">All Cities</option>
                  {cities.map((item: any) => (
                    <option key={item.id} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Budget <span className="text-xs text-gray-400">(per day)</span>
                </label>
                <div className="rounded-2xl border border-dashed border-gray-200 p-4 text-sm text-gray-400">
                  Budget filter can be wired here later.
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <div className="space-y-2 text-sm text-gray-600">
                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <input type="checkbox" />
                      4.5 & above
                    </span>
                    <span className="text-xs text-gray-400">(120)</span>
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <input type="checkbox" />
                      4.0 & above
                    </span>
                    <span className="text-xs text-gray-400">(245)</span>
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <input type="checkbox" />
                      3.5 & above
                    </span>
                    <span className="text-xs text-gray-400">(312)</span>
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <input type="checkbox" />
                      3.0 & above
                    </span>
                    <span className="text-xs text-gray-400">(78)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Amenities
                </label>
                <div className="space-y-2 text-sm text-gray-600">
                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <input type="checkbox" />
                      Parking
                    </span>
                    <span className="text-xs text-gray-400">(350)</span>
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <input type="checkbox" />
                      WiFi
                    </span>
                    <span className="text-xs text-gray-400">(280)</span>
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <input type="checkbox" />
                      AC Hall
                    </span>
                    <span className="text-xs text-gray-400">(210)</span>
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <input type="checkbox" />
                      Catering
                    </span>
                    <span className="text-xs text-gray-400">(180)</span>
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <input type="checkbox" />
                      Valet Parking
                    </span>
                    <span className="text-xs text-gray-400">(95)</span>
                  </label>
                  <button className="text-sm font-medium text-orange-500 hover:text-orange-600">
                    Show More
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Vendor Type
                </label>

                <label className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={eliteOnly}
                      onChange={(e) => setEliteOnly(e.target.checked)}
                    />
                    Elite Vendors
                  </span>
                  <span className="text-xs text-gray-400">(58)</span>
                </label>
              </div>

              <button
                onClick={handleSearch}
                className="h-12 w-full rounded-2xl bg-orange-500 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          <main>
            <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {vendors.length} Vendors Found
                </h2>
                <p className="text-sm text-gray-500">
                  Showing best matches for you
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex rounded-2xl border border-gray-200 bg-white p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                      viewMode === "list"
                        ? "bg-orange-500 text-white"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                    aria-label="List view"
                  >
                    ☰
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                      viewMode === "grid"
                        ? "bg-orange-500 text-white"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                    aria-label="Grid view"
                  >
                    ▦
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  className="h-11 rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none shadow-sm"
                >
                  <option value="rating">Top Rated</option>
                  <option value="priceLow">Lowest Price</option>
                  <option value="priceHigh">Highest Price</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="rounded-[28px] border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
                Loading vendors...
              </div>
            ) : vendors.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
                No vendors found.
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-4 xl:grid-cols-2"
                    : "space-y-4"
                }
              >
                {vendors.map((vendor: any) => (
                  <VendorListCard key={vendor.id} vendor={vendor} viewMode={viewMode} />
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center justify-center gap-2">
              <button className="h-10 w-10 rounded-xl border border-gray-200 bg-white text-gray-500">
                ‹
              </button>
              <button className="h-10 w-10 rounded-xl bg-orange-500 text-sm font-semibold text-white">
                1
              </button>
              <button className="h-10 w-10 rounded-xl border border-gray-200 bg-white text-gray-600">
                2
              </button>
              <button className="h-10 w-10 rounded-xl border border-gray-200 bg-white text-gray-500">
                ›
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-gray-900">100% Verified Vendors</p>
                  <p className="text-sm text-gray-500">All vendors are verified & trusted</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <p className="font-semibold text-gray-900">No Hidden Charges</p>
                  <p className="text-sm text-gray-500">Contact vendors directly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🧭</span>
                <div>
                  <p className="font-semibold text-gray-900">Wide Range of Choices</p>
                  <p className="text-sm text-gray-500">Compare and choose the best</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-semibold text-gray-900">24/7 Customer Support</p>
                  <p className="text-sm text-gray-500">We’re here to help you</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}