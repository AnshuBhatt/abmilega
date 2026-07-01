"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type UserData = {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [hasBusiness, setHasBusiness] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Search", href: "/search" },
    { label: "Vendors", href: "/vendors" },
    { label: "Categories", href: "/categories" },
    { label: "Cities", href: "/cities" },
  ];

  function readAuthState() {
    const storedToken = localStorage.getItem("token");
    const storedHasVendor = localStorage.getItem("hasVendor") === "true";
    const storedUser = localStorage.getItem("user");

    setToken(storedToken);
    setHasBusiness(storedHasVendor);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }

  useEffect(() => {
    setMounted(true);
    readAuthState();

    const handleStorage = () => readAuthState();
    const handleAuthChanged = () => readAuthState();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("auth-changed", handleAuthChanged);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("auth-changed", handleAuthChanged);
    };
    // pathname is included so navbar refreshes auth state after route change
  }, [pathname]);

  const activePath = useMemo(() => {
    return pathname || "/";
  }, [pathname]);

  const firstLetter = (user?.name || user?.email || "U").trim().charAt(0).toUpperCase();

  const isLoggedIn = Boolean(token);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("hasVendor");
    localStorage.removeItem("user");
    setToken(null);
    setHasBusiness(false);
    setUser(null);
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-4 md:px-6">
          <Link href="/" className="text-3xl font-black text-orange-500">
            AbMilega
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-3xl font-black text-orange-500">
          AbMilega
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => {
            const isActive =
              activePath === item.href ||
              activePath.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "text-orange-500"
                    : "text-gray-600 transition hover:text-orange-500"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                Login
              </Link>

              <Link
                href="/list-my-business"
                className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                List My Business
              </Link>
            </>
          ) : !hasBusiness ? (
            <>
              <Link
                href="/list-my-business"
                className="rounded-2xl border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-500 shadow-sm transition hover:bg-orange-50"
              >
                + List My Business
              </Link>

              <Link
                href="/saved-vendors"
                className="hidden rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 md:inline-flex"
              >
                ❤ Saved Vendors
              </Link>

              <button
                type="button"
                className="hidden h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm md:inline-flex"
                aria-label="Notifications"
              >
                🔔
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-2 py-1.5 shadow-sm transition hover:bg-gray-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                    {firstLetter}
                  </div>
                  <span className="hidden max-w-[120px] truncate text-sm font-medium text-gray-700 md:inline-block">
                    {user?.name || "Account"}
                  </span>
                  <span className="pr-1 text-gray-500">⌄</span>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-3 w-64 rounded-[22px] border border-gray-100 bg-white p-2 shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      👤 My Profile
                    </Link>

                    <Link
                      href="/saved-vendors"
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      ❤ Saved Vendors
                    </Link>

                    <Link
                      href="/my-reviews"
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      ⭐ My Reviews
                    </Link>

                    <Link
                      href="/settings"
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      ⚙ Settings
                    </Link>

                    <div className="my-1 border-t border-gray-100" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                    >
                      ↪ Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/list-my-business"
                className="rounded-2xl border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-500 shadow-sm transition hover:bg-orange-50"
              >
                + Add Business
              </Link>

              <Link
                href="/vendor-dashboard"
                className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm transition hover:bg-orange-100"
              >
                🏢 Vendor Dashboard
              </Link>

              <button
                type="button"
                className="hidden h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm md:inline-flex"
                aria-label="Notifications"
              >
                🔔
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-2 py-1.5 shadow-sm transition hover:bg-gray-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                    {firstLetter}
                  </div>
                  <span className="hidden max-w-[120px] truncate text-sm font-medium text-gray-700 md:inline-block">
                    {user?.name || "Account"}
                  </span>
                  <span className="pr-1 text-gray-500">⌄</span>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-3 w-64 rounded-[22px] border border-gray-100 bg-white p-2 shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      👤 My Profile
                    </Link>

                    <Link
                      href="/saved-vendors"
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      ❤ Saved Vendors
                    </Link>

                    <Link
                      href="/vendor-dashboard"
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      🏢 My Business
                    </Link>

                    <Link
                      href="/vendor-dashboard/analytics"
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      📊 Analytics
                    </Link>

                    <Link
                      href="/settings"
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      ⚙ Settings
                    </Link>

                    <div className="my-1 border-t border-gray-100" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                    >
                      ↪ Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}