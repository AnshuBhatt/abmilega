import Link from "next/link";
import VendorCard from "@/components/VendorCard";
import CategoryCard from "@/components/CategoryCard";
import CityCard from "@/components/CityCard";

async function getCategories() {
  const res = await fetch(
    "http://localhost:5000/categories",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

async function getCities() {
  const res = await fetch(
    "http://localhost:5000/cities",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

async function getVendors() {
  const res = await fetch(
    "http://localhost:5000/vendors",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function HomePage() {
  const categories = await getCategories();

  const cities = await getCities();

  const vendors = await getVendors();

  return (
    <div style={{ padding: "30px" }}>
      <h1>ABMILEGA</h1>

      <h2>Jo Chahiye, Ab Milega</h2>

      <hr />

      <h2>Popular Categories</h2>

      {categories.map((category: any) => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}

      <hr />

      <h2>Popular Cities</h2>

      {cities.map((city: any) => (
        <CityCard
          key={city.id}
          city={city}
        />
      ))}

      <hr />

      <h2>Featured Vendors</h2>

      {vendors.map((vendor: any) => (
        <VendorCard
          key={vendor.id}
          vendor={vendor}
        />
      ))}
    </div>
  );
}