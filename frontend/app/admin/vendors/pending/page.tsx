"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";

export default function PendingVendorsPage() {

  const [vendors,
    setVendors] =
    useState<any[]>([]);

  async function loadPendingVendors() {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await fetch(
        "http://localhost:5000/vendors/pending",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    const data =
      await res.json();

    setVendors(data);

  }

  useEffect(() => {

    loadPendingVendors();

  }, []);

  async function approveVendor(
    vendorId: number
  ) {

    const token =
      localStorage.getItem(
        "token"
      );

    await fetch(

      `http://localhost:5000/vendors/${vendorId}/approve`,

      {

        method: "PUT",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },

      }

    );

    loadPendingVendors();

  }

  async function rejectVendor(
    vendorId: number
  ) {

    const token =
      localStorage.getItem(
        "token"
      );

    await fetch(

      `http://localhost:5000/vendors/${vendorId}/reject`,

      {

        method: "PUT",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },

      }

    );

    loadPendingVendors();

  }

  return (

    <AdminGuard>

      <div
        style={{
          padding: "20px",
        }}
      >

        <h1>
          Pending Vendors
        </h1>

        {vendors.map(
          (vendor: any) => (

            <div
              key={vendor.id}
            >

              <h3>
                {vendor.name}
              </h3>

              <button
                onClick={() =>
                  approveVendor(
                    vendor.id
                  )
                }
              >
                Approve
              </button>

              {" "}

              <button
                onClick={() =>
                  rejectVendor(
                    vendor.id
                  )
                }
              >
                Reject
              </button>

            </div>

          )
        )}

      </div>

    </AdminGuard>

  );

}