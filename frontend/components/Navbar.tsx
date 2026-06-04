import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "15px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link href="/">
        <strong>ABMILEGA</strong>
      </Link>

      <Link href="/search">
        Search
      </Link>

      <Link href="/vendors">
        Vendors
      </Link>
    </nav>
  );
}