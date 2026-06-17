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

    <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "280px 1fr",
    gap: "20px",
    marginTop: "20px",
  }}
>

  <div
    style={{
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "20px",
      height: "fit-content",
    }}
  >

    <h3>
      Filters
    </h3>

    <div
      style={{
        marginTop: "20px",
      }}
    >

      <p>
        Category
      </p>

      <select
        value={category}
        onChange={(e) =>
          setCategory(
            e.target.value
          )
        }
        style={{
          width: "100%",
        }}
      >

        <option value="">
          All Categories
        </option>

        {categories.map(
          (category: any) => (

            <option
              key={
                category.id
              }
              value={
                category.slug
              }
            >

              {category.name}

            </option>

          )
        )}

      </select>

    </div>

    <div
      style={{
        marginTop: "20px",
      }}
    >

      <p>
        City
      </p>

      <select
        value={city}
        onChange={(e) =>
          setCity(
            e.target.value
          )
        }
        style={{
          width: "100%",
        }}
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

    </div>

    <button
      onClick={handleSearch}
      style={{
        marginTop: "20px",
        width: "100%",
      }}
    >

      Apply Filters

    </button>

  </div>

  <div>

    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        marginBottom: "20px",
      }}
    >

      <h2>

        {vendors.length}
        {" "}
        Vendors Found

      </h2>

      <select>

        <option>
          Top Rated
        </option>

        <option>
          Lowest Price
        </option>

        <option>
          Highest Price
        </option>

      </select>

    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(2, 1fr)",
        gap: "20px",
      }}
    >

      {vendors.map(
        (vendor: any) => (

          <VendorCard
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