import Link from "next/link";

export default function VendorCard({
  vendor,
}: {
  vendor: any;
}) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
        {vendor.imageUrl && (
        <img
          src={vendor.imageUrl}
          alt={vendor.name}
          width="300"
        />
      )}
      
      <Link href={`/vendor/${vendor.slug}`}>
        <h3>{vendor.name}</h3>
      </Link>

      <p>{vendor.category.name}</p>

      <p>{vendor.city.name}</p>

      <p>⭐ {vendor.rating}</p>
    </div>
  );
}