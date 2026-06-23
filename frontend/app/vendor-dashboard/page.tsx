"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Vendor = {
  id: number;
  name: string;
  slug?: string;
  status?: string;
  category?: { name?: string };
  city?: { name?: string; state?: string };
};

type Completion = {
  completion?: number;
  missing?: string[];
};

type Analytics = {
  views?: number;
  callClicks?: number;
  whatsappClicks?: number;
  mapClicks?: number;
};

function StatusBadge({ status }: { status?: string }) {
  const cls =
    status === "APPROVED"
      ? "bg-green-50 text-green-700 border-green-200"
      : status === "PENDING"
        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
        : "bg-red-50 text-red-700 border-red-200";

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>
      {status || "UNKNOWN"}
    </span>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number | string;
  icon: string;
}) {
  return (
    <div className="rounded-[24px] border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-xl">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function VendorDashboardPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [completionData, setCompletionData] = useState<Record<number, Completion>>({});
  const [analyticsData, setAnalyticsData] = useState<Record<number, Analytics>>({});
  const [loading, setLoading] = useState(true);

  async function authFetch(url: string) {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return null;
    }

    return fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async function loadCompletion(vendorId: number) {
    const res = await authFetch(`http://localhost:5000/vendors/${vendorId}/completion`);
    if (!res) return;
    const data = await res.json();
    setCompletionData((prev) => ({
      ...prev,
      [vendorId]: data,
    }));
  }

  async function loadAnalytics(vendorId: number) {
    const res = await authFetch(`http://localhost:5000/vendors/${vendorId}/analytics`);
    if (!res) return;
    const data = await res.json();
    setAnalyticsData((prev) => ({
      ...prev,
      [vendorId]: data,
    }));
  }

  async function loadVendors() {
    setLoading(true);

    const res = await authFetch("http://localhost:5000/users/me/vendors");
    if (!res) return;

    const data = await res.json();
    setVendors(data || []);

    for (const vendor of data || []) {
      loadCompletion(vendor.id);
      loadAnalytics(vendor.id);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadVendors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const overallCompletion = useMemo(() => {
    if (!vendors.length) return 0;
    const total = vendors.reduce((sum, vendor) => {
      return sum + Number(completionData[vendor.id]?.completion || 0);
    }, 0);
    return Math.round(total / vendors.length);
  }, [vendors, completionData]);

  const totalViews = useMemo(
    () =>
      vendors.reduce(
        (sum, vendor) => sum + Number(analyticsData[vendor.id]?.views || 0),
        0
      ),
    [vendors, analyticsData]
  );

  const totalCalls = useMemo(
    () =>
      vendors.reduce(
        (sum, vendor) => sum + Number(analyticsData[vendor.id]?.callClicks || 0),
        0
      ),
    [vendors, analyticsData]
  );

  const totalWhatsApp = useMemo(
    () =>
      vendors.reduce(
        (sum, vendor) => sum + Number(analyticsData[vendor.id]?.whatsappClicks || 0),
        0
      ),
    [vendors, analyticsData]
  );

  return (
    <div className="bg-[#faf7f4]">
      <div className="mx-auto max-w-[1500px] px-4 py-6 md:px-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track profile completion, inquiries, and performance.
            </p>
          </div>

          <Link
            href="/list-my-business"
            className="inline-flex rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            + Add Business
          </Link>
        </div>

        <section className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
            <aside className="border-b border-gray-100 bg-white p-5 lg:border-b-0 lg:border-r">
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-gray-900">Navigation</h2>
                <p className="text-sm text-gray-500">Manage your business profile</p>
              </div>

              <nav className="mt-6 space-y-2">
                {[
                  ["Dashboard", "🏠"],
                  ["My Profile", "👤"],
                  ["Business Details", "🏢"],
                  ["Packages", "📦"],
                  ["Amenities", "✨"],
                  ["Gallery", "🖼️"],
                  ["Inquiries", "💬"],
                  ["Reviews", "⭐"],
                  ["Analytics", "📈"],
                  ["Promotions", "🚀"],
                  ["Settings", "⚙️"],
                  ["Help & Support", "❓"],
                ].map(([label, icon]) => (
                  <button
                    key={label}
                    type="button"
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                      label === "Dashboard"
                        ? "bg-orange-50 text-orange-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">{icon}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 rounded-[24px] border border-orange-100 bg-[#fff7f0] p-4">
                <p className="text-sm font-semibold text-gray-900">Upgrade Your Plan</p>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Get more visibility and leads with Premium Packages.
                </p>
                <button className="mt-4 rounded-2xl border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-500">
                  View Packages
                </button>
              </div>
            </aside>

            <main className="space-y-6 p-5 md:p-6">
              <section className="overflow-hidden rounded-[32px] border border-gray-100 bg-[#fff9f4] shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="p-6 md:p-10">
                    <div className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-orange-500 shadow-sm">
                      Dashboard Overview
                    </div>

                    <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900">
                      Welcome back 👋
                    </h2>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
                      Complete your business profile, upload photos, manage packages, and track inquiries from one place.
                    </p>

                    <div className="mt-8">
                      <div className="mb-3 flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-700">Profile Completion</span>
                        <span className="font-semibold text-orange-500">{overallCompletion}% Completed</span>
                      </div>
                      <div className="h-3 rounded-full bg-white shadow-inner">
                        <div
                          className="h-3 rounded-full bg-orange-500 transition-all"
                          style={{ width: `${overallCompletion}%` }}
                        />
                      </div>
                      <p className="mt-3 text-sm text-gray-500">
                        Complete your profile to get more visibility and inquiries.
                      </p>

                      <Link
                        href="/list-my-business"
                        className="mt-6 inline-flex rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                      >
                        Complete Profile
                      </Link>
                    </div>
                  </div>

                  <div className="relative min-h-[260px] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80&auto=format&fit=crop"
                      alt="Dashboard banner"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-[#fff9f4] via-[#fff9f4]/35 to-transparent" />
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard label="Profile Views" value={totalViews} icon="👁️" />
                <MetricCard label="Calls" value={totalCalls} icon="📞" />
                <MetricCard label="WhatsApp" value={totalWhatsApp} icon="💬" />
                <MetricCard label="Listings" value={vendors.length} icon="📍" />
              </section>

              <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr]">
                <div className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Profile Status</h3>
                      <p className="mt-1 text-sm text-gray-500">Current listing health</p>
                    </div>
                    <button className="rounded-2xl border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-500">
                      Complete Profile
                    </button>
                  </div>

                  {loading ? (
                    <div className="mt-6 text-sm text-gray-500">Loading...</div>
                  ) : vendors.length === 0 ? (
                    <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
                      You do not own any businesses yet.
                    </div>
                  ) : (
                    <div className="mt-6 space-y-4">
                      {vendors.map((vendor) => {
                        const completion = completionData[vendor.id]?.completion ?? 0;
                        const missing = completionData[vendor.id]?.missing ?? [];

                        return (
                          <div key={vendor.id} className="rounded-[24px] border border-gray-100 p-5">
                            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900">{vendor.name}</h4>
                                <p className="mt-1 text-sm text-gray-500">
                                  {vendor.category?.name} · {vendor.city?.name}
                                </p>
                              </div>
                              <StatusBadge status={vendor.status} />
                            </div>

                            <div className="mt-4">
                              <div className="mb-2 flex items-center justify-between text-sm">
                                <span className="text-gray-600">Profile Completion</span>
                                <span className="font-semibold text-orange-500">{completion}%</span>
                              </div>
                              <div className="h-2.5 rounded-full bg-gray-100">
                                <div
                                  className="h-2.5 rounded-full bg-orange-500"
                                  style={{ width: `${completion}%` }}
                                />
                              </div>
                            </div>

                            <div className="mt-5">
                              <p className="text-sm font-semibold text-gray-900">Missing</p>
                              {missing.length > 0 ? (
                                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                                  {missing.map((item: string) => (
                                    <li key={item} className="flex items-center gap-2">
                                      <span className="text-pink-500">✕</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="mt-2 text-sm text-green-600">Nothing missing. Good work.</p>
                              )}
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                              <Link
                                href={`/vendor-dashboard/vendors/${vendor.id}/edit`}
                                className="rounded-2xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
                              >
                                Edit Business
                              </Link>
                              <Link
                                href={`/vendor/${vendor.slug}`}
                                className="rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700"
                              >
                                View Public Page
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Recent Inquiries</h3>
                      <p className="mt-1 text-sm text-gray-500">Customers reaching out to you</p>
                    </div>
                    <button className="rounded-2xl border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-500">
                      View All
                    </button>
                  </div>

                  <div className="mt-6 flex min-h-[240px] flex-col items-center justify-center rounded-[24px] border border-dashed border-gray-200 bg-gray-50 text-center">
                    <div className="text-5xl">📩</div>
                    <p className="mt-4 text-lg font-semibold text-gray-900">No inquiries yet!</p>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                      Once customers contact you, you&apos;ll see inquiries here.
                    </p>
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>

                  <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
                    {[
                      ["Edit Profile", "✏️"],
                      ["Add Images", "🖼️"],
                      ["Manage Packages", "📦"],
                      ["Amenities", "✨"],
                      ["Promotions", "📣"],
                      ["View Inquiries", "📨"],
                    ].map(([label, icon]) => (
                      <button
                        key={label}
                        className="rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="text-2xl">{icon}</div>
                        <p className="mt-3 text-sm font-semibold text-gray-900">{label}</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Manage your listing from here
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Performance Overview</h3>
                      <p className="mt-1 text-sm text-gray-500">This month</p>
                    </div>
                    <select className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm">
                      <option>This Month</option>
                      <option>Last Month</option>
                    </select>
                  </div>

                  <div className="mt-6 rounded-[24px] border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-500">
                    Chart placeholder. Wire in a chart library next.
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <MetricCard label="Total Views" value={totalViews} icon="👁️" />
                    <MetricCard label="Total Calls" value={totalCalls} icon="📞" />
                    <MetricCard label="Total WhatsApp" value={totalWhatsApp} icon="💬" />
                  </div>
                </div>
              </section>

              <section className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">Tips to Get More Inquiries</h3>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
                  {[
                    ["Complete Your Profile", "Add all details to build trust with customers", "🛡️"],
                    ["Add High Quality Images", "Showcase your work with beautiful photos", "🖼️"],
                    ["Add Packages", "Clear pricing helps customers make quick decisions", "📦"],
                    ["Respond Quickly", "Quick responses lead to more bookings", "⚡"],
                  ].map(([title, text, icon]) => (
                    <div key={title} className="rounded-2xl border border-gray-100 p-4">
                      <div className="text-2xl">{icon}</div>
                      <p className="mt-3 text-sm font-semibold text-gray-900">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-gray-500">{text}</p>
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </section>
      </div>
    </div>
  );
}