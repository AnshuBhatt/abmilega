"use client";

import { useEffect, useState } from "react";
import VendorCard from "@/components/VendorCard";

export default function SearchPage() {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  const [vendors, setVendors] = useState([]);

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

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
    let url = "http://localhost:5000/vendors?";

    if (category) {
      url += `category=${category}&`;
    }

    if (city) {
      url += `city=${city}`;
    }

    const res = await fetch(url);

    const data = await res.json();

    setVendors(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Vendors</h1>

      <div style={{ marginBottom: "20px" }}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">
        Select Category
        </option>

        {categories.map((category: any) => (
        <option
            key={category.id}
            value={category.slug}
        >
            {category.name}
        </option>
        ))}
        </select>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="">
            Select City
            </option>

            {cities.map((city: any) => (
            <option
                key={city.id}
                value={city.slug}
            >
                {city.name}
            </option>
            ))}
        </select>

        <button
          onClick={handleSearch}
          style={{ marginLeft: "10px" }}
        >
          Search
        </button>
      </div>

      <h2>Results</h2>

          {vendors.map((vendor: any) => (
              <VendorCard
                  key={vendor.id}
                  vendor={vendor}
              />
          ))}
    </div>
  );
}