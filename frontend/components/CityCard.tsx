import Link from "next/link";

export default function CityCard({
  city,
}: {
  city: any;
}) {
  return (
    <div
      style={{
        border: "1px solid lightgray",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <Link href={`/city/${city.slug}`}>
        {city.name}
      </Link>
    </div>
  );
}