"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SavedVendorsPage() {

  const [savedVendors,
    setSavedVendors] =
    useState<any[]>([]);

  useEffect(() => {

    async function loadSavedVendors() {

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {

        window.location.href =
          "/login";

        return;

      }

      const res =
        await fetch(

          "http://localhost:5000/users/me/saved-vendors",

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

      const data =
        await res.json();

      setSavedVendors(data);

    }

    loadSavedVendors();

  }, []);

  return (

    <div
      style={{
        padding: "20px",
      }}
    >

      <h1>
        ❤️ My Saved Vendors
      </h1>

      {savedVendors.length === 0 && (

        <p>
          No saved vendors.
        </p>

      )}

      {savedVendors.map(
        (item: any) => (

          <div
            key={item.id}
            style={{
              border:
                "1px solid #ddd",
              padding:
                "15px",
              marginBottom:
                "15px",
            }}
          >

            <h3>
              {item.vendor.name}
            </h3>

            <p>
              {
                item.vendor.description
              }
            </p>

           <Link
  href={`/vendor/${item.vendor.slug}`}
>
  View Vendor
</Link>

          </div>

        )
      )}

    </div>

  );

}