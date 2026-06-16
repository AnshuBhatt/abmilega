"use client";

import { useEffect, useState } from "react";
import DeleteVendorButton from "@/components/DeleteVendorButton";
import Link from "next/link";

export default function VendorsPage() {

const [vendors, setVendors] =
useState<any[]>([]);

const [loading, setLoading] =
useState(true);

async function loadVendors() {

try {

  const token =
    localStorage.getItem(
      "token"
    );

  const res =
    await fetch(

      "http://localhost:5000/vendors/admin",

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

} catch (error) {

  console.error(error);

} finally {

  setLoading(false);

}

}

useEffect(() => {

loadVendors();

}, []);

if (loading) {

return <p>Loading...</p>;

}

return (

<div>

  <div
  style={{
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  }}
>

  <Link
    href="/admin/vendors/new"
  >
    <button>
      Add New Vendor
    </button>
  </Link>

  <Link
    href="/admin/vendors/pending"
  >
    <button>
      Pending Vendors
    </button>
  </Link>

</div>

<h1>
  Vendors
</h1>

  {vendors.map(
    (vendor: any) => (

      <div
        key={vendor.id}
        style={{
          border:
            "1px solid #ddd",
          padding: "15px",
          marginBottom: "15px",
        }}
      >

        <h3>
          {vendor.name}
        </h3>

        <p>
          {vendor.category?.name}
        </p>

        <p>
          {vendor.city?.name}
        </p>

        <p>

          Status{" "}
          <strong
            style={{
              color:
                vendor.status === "APPROVED"
                  ? "green"
                  : vendor.status === "PENDING"
                  ? "orange"
                  : "red",
            }}
          >

            {vendor.status}

          </strong>

        </p>

        <Link
          href={`/admin/vendors/${vendor.id}/edit`}
        >
          <button>
            Edit
          </button>
        </Link>

        {" "}

        <Link
          href={`/admin/vendors/${vendor.id}/analytics`}
        >
          <button>
            Analytics
          </button>
        </Link>

        {" "}

        <DeleteVendorButton
          vendorId={vendor.id}
        />

      </div>

    )
  )}

</div>

);

}