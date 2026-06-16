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
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        marginBottom: "15px",
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
        Phone:
        {" "}
        {vendor.phone}
      </p>

      <p>
        Status:
        {" "}
        <strong
          style={{
            color: "orange",
          }}
        >
          {vendor.status}
        </strong>
      </p>

      <a
        href={`/vendor/${vendor.slug}`}
        target="_blank"
      >
        <button>
          View
        </button>
      </a>

      {" "}

      <a
        href={`/admin/vendors/${vendor.id}/edit`}
      >
        <button>
          Edit
        </button>
      </a>

      {" "}

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