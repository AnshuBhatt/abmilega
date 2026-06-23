"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import VendorForm from "@/components/VendorForm";

export default function VendorEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function loadVendor() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch(`http://localhost:5000/vendors/id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setVendor(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadVendor();
  }, [id, router]);

  const progress = useMemo(() => {
    if (!vendor) return 0;

    let score = 0;
    if (vendor.name) score += 20;
    if (vendor.description) score += 15;
    if (vendor.phone) score += 10;
    if (vendor.whatsapp) score += 10;
    if (vendor.category?.name) score += 10;
    if (vendor.city?.name) score += 10;
    if (vendor.imageUrl || vendor.images?.length) score += 15;
    if (vendor.amenities?.length) score += 5;
    if (vendor.packages?.length) score += 5;

    return Math.min(score, 100);
  }, [vendor]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          Loading...
        </div>
      </div>
    );
  }

  if (vendor?.message) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-8 text-red-700 shadow-sm">
          {vendor.message}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#faf7f4]">
      <div className="mx-auto max-w-[1500px] px-4 py-6 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Business</h1>
            <p className="mt-1 text-sm text-gray-500">
              Update your listing details, photos, and services.
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm"
          >
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[32px] border border-gray-100 bg-white p-5 shadow-sm md:p-6">
            <div className="rounded-[28px] bg-[#fff9f4] p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm text-gray-500">Business</p>
                  <h2 className="text-3xl font-extrabold text-gray-900">
                    {vendor?.name || "Business Name"}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Completion: <span className="font-semibold text-orange-500">{progress}%</span>
                  </p>
                </div>

                <div className="w-full max-w-sm">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">Profile progress</span>
                    <span className="font-semibold text-orange-500">{progress}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-white">
                    <div
                      className="h-3 rounded-full bg-orange-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  ["Status", vendor?.status || "—"],
                  ["Category", vendor?.category?.name || "—"],
                  ["City", vendor?.city?.name || "—"],
                  ["Reviews", String(vendor?.reviews?.length || 0)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400">{label}</p>
                    <p className="mt-2 text-base font-semibold text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <VendorForm initialVendor={vendor} />
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Missing Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Fix these items to improve profile completion.
              </p>

              <div className="mt-5 space-y-3">
                {[
                  !vendor?.imageUrl && !(vendor?.images?.length > 0) && "Business Images",
                  !vendor?.amenities?.length && "Amenities",
                  !vendor?.packages?.length && "Packages",
                  !vendor?.description && "Description",
                  !vendor?.phone && "Phone",
                ]
                  .filter(Boolean)
                  .map((item) => (
                    <div
                      key={item as string}
                      className="flex items-center gap-3 rounded-2xl border border-gray-100 p-4"
                    >
                      <span className="text-pink-500">✕</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item}</p>
                        <p className="text-xs text-gray-500">Add this to improve your listing</p>
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Quick Links</h3>
              <div className="mt-5 space-y-3">
                <a
                  href={`/vendor/${vendor?.slug}`}
                  className="block rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700"
                >
                  View Public Profile
                </a>
                <button className="block w-full rounded-2xl border border-orange-200 bg-[#fff7f0] px-4 py-3 text-sm font-semibold text-orange-500">
                  Upload Images
                </button>
                <button className="block w-full rounded-2xl border border-orange-200 bg-[#fff7f0] px-4 py-3 text-sm font-semibold text-orange-500">
                  Edit Packages
                </button>
              </div>
            </section>

            <section className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Help</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Keep photos, description, amenities, and packages updated. Strong profiles rank better and convert better.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}