import VendorCard from "@/components/VendorCard";

async function getCity(slug: string) {
  const res = await fetch(
    `http://localhost:5000/cities/${slug}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;

  const cityData = await getCity(city);

  return (
    <div style={{ padding: "20px" }}>
      <h1>{cityData.name}</h1>

      <h2>Vendors</h2>

          {cityData.vendors.map((vendor: any) => (
              <VendorCard
                  key={vendor.id}
                  vendor={vendor}
              />
          ))}
    </div>
  );
}