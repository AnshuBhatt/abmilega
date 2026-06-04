import VendorCard from "@/components/VendorCard";

async function getCategory(slug: string) {
  const res = await fetch(
    `http://localhost:5000/categories/${slug}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const categoryData =
    await getCategory(category);

  return (
    <div style={{ padding: "20px" }}>
      <h1>{categoryData.name}</h1>

      <h2>Vendors</h2>

          {categoryData.vendors.map((vendor: any) => (
              <VendorCard
                  key={vendor.id}
                  vendor={vendor}
              />
          ))}
    </div>
  );
}