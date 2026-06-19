"use client";

import { useEffect, useState } from "react";
import VendorListCard from "@/components/VendorListCard";

export default function SearchPage() {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  const [vendors, setVendors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [sortBy, setSortBy] =
  useState("rating");

const [eliteOnly, setEliteOnly] =
  useState(false);

const [viewMode, setViewMode] =
  useState("list");

useEffect(() => {
  handleSearch();
}, [
  sortBy,
  eliteOnly,
  category,
  city,
]);

  useEffect(() => {
    const loadData = async () => {
      const categoryRes = await fetch(
        "http://localhost:5000/categories"
      );

      const cityRes = await fetch(
        "http://localhost:5000/cities"
      );

      const categoryData =
        await categoryRes.json();

      const cityData =
        await cityRes.json();

      setCategories(categoryData);
      setCities(cityData);
    };

    loadData();
  }, []);

  const handleSearch = async () => {
    let url =
      "http://localhost:5000/vendors?";

    if (category) {
      url += `category=${category}&`;
    }

    if (city) {
      url += `city=${city}`;
    }

    if (eliteOnly) {
  url += "elite=true&";
}

if (sortBy) {
  url += `sort=${sortBy}&`;
}

    const res = await fetch(url);

    const data = await res.json();

    setVendors(data);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">

      {/* Search Hero */}

      <div className="bg-white rounded-2xl border shadow-sm p-6 mb-8">

        <h1 className="text-3xl font-bold mb-2">
          Find the Best Vendors Near You
        </h1>

        <p className="text-gray-500 mb-6">
          Search verified vendors,
          businesses and services.
        </p>

        <div className="flex flex-col md:flex-row gap-3">

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="
              flex-1
              border
              rounded-xl
              px-4
              py-3
            "
          >
            <option value="">
              All Categories
            </option>

            {categories.map(
              (category: any) => (
                <option
                  key={category.id}
                  value={category.slug}
                >
                  {category.name}
                </option>
              )
            )}
          </select>

          <select
            value={city}
            onChange={(e) =>
              setCity(
                e.target.value
              )
            }
            className="
              flex-1
              border
              rounded-xl
              px-4
              py-3
            "
          >
            <option value="">
              All Cities
            </option>

            {cities.map(
              (city: any) => (
                <option
                  key={city.id}
                  value={city.slug}
                >
                  {city.name}
                </option>
              )
            )}
          </select>

          <button
            onClick={handleSearch}
            className="
              bg-orange-500
              text-white
              px-8
              py-3
              rounded-xl
              hover:bg-orange-600
            "
          >
            Search
          </button>

        </div>

      </div>

      {/* Popular Categories */}

      <div className="mb-8">

        <p className="text-sm text-gray-500 mb-3">
          Popular Categories
        </p>

        <div className="flex flex-wrap gap-2">

          {categories
            .slice(0, 8)
            .map((category: any) => (

              <button
                key={category.id}
                onClick={() =>
                  setCategory(
                    category.slug
                  )
                }
                className="
                  px-4
                  py-2
                  rounded-full
                  border
                  hover:bg-orange-50
                  hover:border-orange-500
                "
              >
                {category.name}
              </button>

            ))}

        </div>

      </div>

      {/* Main Layout */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[280px_1fr]
          gap-6
        "
      >

        {/* Filters */}

        <div
          className="
            bg-white
            border
            rounded-xl
            p-5
            h-fit
          "
        >

         <h3 className="font-semibold mb-4">
  Filters
</h3>

<div
  className={
    viewMode === "grid"
      ? `
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        `
      : `
          space-y-4
        `
  }
>

  <label className="flex items-center gap-2">

    <input
      type="checkbox"
      checked={eliteOnly}
      onChange={(e) =>
        setEliteOnly(
          e.target.checked
        )
      }
    />

    Elite Vendors

  </label>

  <button
    onClick={handleSearch}
    className="
      w-full
      bg-orange-500
      text-white
      py-2
      rounded-lg
    "
  >
    Apply Filters
  </button>

</div>
        </div>

        {/* Results */}

        <div>

          <div
            className="
              flex
              justify-between
              items-center
              mb-6
            "
          >

            <div>

              <h2 className="text-xl font-semibold">

                {vendors.length}
                {" "}
                Vendors Found

              </h2>

              <p className="text-gray-500 text-sm">
                Showing best matches
              </p>

            </div>
            <div className="flex gap-2">

  <button
    onClick={() =>
      setViewMode("list")
    }
    className={`
      px-3 py-2 rounded-lg border
      ${
        viewMode === "list"
          ? "bg-orange-500 text-white"
          : ""
      }
    `}
  >
    ☰
  </button>

  <button
    onClick={() =>
      setViewMode("grid")
    }
    className={`
      px-3 py-2 rounded-lg border
      ${
        viewMode === "grid"
          ? "bg-orange-500 text-white"
          : ""
      }
    `}
  >
    ⊞
  </button>

</div>

          <select
  value={sortBy}
  onChange={(e) =>
    setSortBy(
      e.target.value
    )
  }
  className="
    border
    rounded-lg
    px-3
    py-2
  "
>

              <option value="rating">
  Top Rated
</option>

<option value="priceLow">
  Lowest Price
</option>

<option value="priceHigh">
  Highest Price
</option>

<option value="newest">
  Newest
</option>

            </select>

          </div>

       <div
  className={
    viewMode === "grid"
      ? `
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        `
      : `
          space-y-4
        `
  }
>

            {vendors.map(
              (vendor: any) => (

                <VendorListCard
                  key={vendor.id}
                  vendor={vendor}
                />

              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}