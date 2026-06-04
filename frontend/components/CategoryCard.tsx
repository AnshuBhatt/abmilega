import Link from "next/link";

export default function CategoryCard({
  category,
}: {
  category: any;
}) {
  return (
    <div
      style={{
        border: "1px solid lightgray",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <Link href={`/category/${category.slug}`}>
        {category.name}
      </Link>
    </div>
  );
}