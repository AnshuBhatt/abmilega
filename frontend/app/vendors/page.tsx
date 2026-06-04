import VendorCard from "@/components/VendorCard";

async function getVendors() {
  const res = await fetch("http://localhost:5000/vendors", {
    cache: "no-store",
  });

  return res.json();
}

export default async function VendorsPage() {
  const vendors = await getVendors();

  return (
    <div style={{ padding: "20px" }}>
      <h1>AbMilega Vendors</h1>

      {vendors.map((vendor: any) => (
        <VendorCard
          key={vendor.id}
          vendor={vendor}
        />
      ))}
    </div>
  );
}