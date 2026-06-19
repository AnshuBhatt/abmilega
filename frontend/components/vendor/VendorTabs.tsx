"use client";

import { useState } from "react";
import ReviewForm from "@/components/ReviewForm";

export default function VendorTabs({
  vendor,
}: {
  vendor: any;
}) {
  const [activeTab, setActiveTab] =
    useState("packages");

  return (
    <div className="mt-8">

      <div className="flex gap-2 mb-6">

        <button
          onClick={() =>
            setActiveTab("packages")
          }
          className={`px-4 py-2 rounded-lg ${
            activeTab === "packages"
              ? "bg-orange-500 text-white"
              : "bg-gray-100"
          }`}
        >
          Packages
        </button>

        <button
          onClick={() =>
            setActiveTab("reviews")
          }
          className={`px-4 py-2 rounded-lg ${
            activeTab === "reviews"
              ? "bg-orange-500 text-white"
              : "bg-gray-100"
          }`}
        >
          Reviews
        </button>

        <button
          onClick={() =>
            setActiveTab("portfolio")
          }
          className={`px-4 py-2 rounded-lg ${
            activeTab === "portfolio"
              ? "bg-orange-500 text-white"
              : "bg-gray-100"
          }`}
        >
          Portfolio
        </button>

      </div>

      {activeTab === "packages" && (

        <div className="grid md:grid-cols-2 gap-6">

          {vendor.packages?.map(
            (pkg: any) => (

              <div
                key={pkg.id}
                className="border rounded-xl p-5 bg-white"
              >

                <h3 className="font-bold text-lg">
                  {pkg.packageTemplate.name}
                </h3>

                <div className="text-3xl font-bold text-green-600 my-3">
                  ₹
                  {Number(
                    pkg.price
                  ).toLocaleString()}
                </div>

                <div className="space-y-2">

                  {pkg.features?.map(
                    (f: any) => (

                      <p
                        key={
                          f.feature.id
                        }
                      >
                        ✓ {f.feature.name}
                      </p>

                    )
                  )}

                </div>

              </div>

            )
          )}

        </div>

      )}

      {activeTab === "reviews" && (

        <div>

          {vendor.reviews.length === 0 && (
            <p>
              No reviews yet.
            </p>
          )}

          {vendor.reviews.map(
            (review: any) => (

              <div
                key={review.id}
                className="border rounded-xl p-4 mb-4"
              >

                <h4 className="font-semibold">
                  {review.reviewerName}
                </h4>

                <p>
                  {"⭐".repeat(
                    review.rating
                  )}
                </p>

                <p>
                  {review.comment}
                </p>

              </div>

            )
          )}

          <ReviewForm
            vendorId={vendor.id}
          />

        </div>

      )}

      {activeTab === "portfolio" && (

        <div className="border rounded-xl p-8 text-center">

          Portfolio images coming soon

        </div>

      )}

    </div>
  );
}