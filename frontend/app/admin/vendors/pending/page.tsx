"use client";

import { useEffect, useState } from "react";

export default function PendingVendorsPage() {

  const [vendors, setVendors] =
    useState<any[]>([]);

  async function loadPendingVendors() {

    const res =
      await fetch(
        "http://localhost:5000/vendors/pending"
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

    await fetch(

      `http://localhost:5000/vendors/${vendorId}/approve`,

      {

        method: "PUT",

      }

    );

    loadPendingVendors();

  }

  async function rejectVendor(
    vendorId: number
  ) {

    await fetch(

      `http://localhost:5000/vendors/${vendorId}/reject`,

      {

        method: "PUT",

      }

    );

    loadPendingVendors();

  }

  return (

    <div
      style={{
        padding: "20px",
      }}
    >

      <h1>
        Pending Vendors
      </h1>

      {vendors.length === 0 && (

        <p>
          No pending vendors.
        </p>

      )}

      {vendors.map(
        (vendor: any) => (

          <div

            key={vendor.id}

            style={{

              border:
                "1px solid #ddd",

              padding:
                "20px",

              marginBottom:
                "20px",

            }}

          >

            <h3>
              {vendor.name}
            </h3>

            <p>
              Category:
              {" "}
              {vendor.category?.name}
            </p>

            <p>
              City:
              {" "}
              {vendor.city?.name}
            </p>

            <p>
              Status:
              {" "}
              {vendor.status}
            </p>

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

  );

}