"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Search", href: "/search" },
    { label: "Vendors", href: "/vendors" },
    { label: "Categories", href: "/categories" },
    { label: "Cities", href: "/cities" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-[1500px] items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="text-3xl font-black text-orange-500"
        >
          AbMilega
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "text-orange-500"
                    : "text-gray-600 hover:text-orange-500 transition"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Login
          </Link>

          <Link
            href="/list-my-business"
            className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
          >
            List My Business
          </Link>
        </div>
      </div>
    </nav>
  );
}