"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {

  const [stats, setStats] =
    useState<any>(null);

  useEffect(() => {

    async function loadStats() {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await fetch(

            "http://localhost:5000/vendors/admin-dashboard",

            {

              headers: {

                Authorization:
                  `Bearer ${token}`,

              },

            }

          );

        const data =
          await res.json();

        setStats(data);

      } catch (error) {

        console.error(error);

      }

    }

    loadStats();

  }, []);

  if (!stats) {

    return <p>Loading...</p>;

  }

  return (

    <div
      style={{
        padding: "20px",
      }}
    >

      <h1>
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >

        <Link
          href="/admin/vendors"
          style={{
            textDecoration:
              "none",
            color:
              "inherit",
          }}
        >

          <div
            style={{
              border:
                "1px solid #ddd",
              padding:
                "20px",
              borderRadius:
                "10px",
              cursor:
                "pointer",
            }}
          >

            <h2>
              {stats.totalVendors}
            </h2>

            <p>
              Total Vendors
            </p>

          </div>

        </Link>

        <Link
          href="/admin/vendors?status=APPROVED"
          style={{
            textDecoration:
              "none",
            color:
              "inherit",
          }}
        >

          <div
            style={{
              border:
                "1px solid #ddd",
              padding:
                "20px",
              borderRadius:
                "10px",
              cursor:
                "pointer",
            }}
          >

            <h2>
              {stats.approvedVendors}
            </h2>

            <p>
              Approved
            </p>

          </div>

        </Link>

        <Link
          href="/admin/vendors?status=PENDING"
          style={{
            textDecoration:
              "none",
            color:
              "inherit",
          }}
        >

          <div
            style={{
              border:
                "1px solid #ddd",
              padding:
                "20px",
              borderRadius:
                "10px",
              cursor:
                "pointer",
            }}
          >

            <h2>
              {stats.pendingVendors}
            </h2>

            <p>
              Pending
            </p>

          </div>

        </Link>

        <Link
          href="/admin/vendors?status=REJECTED"
          style={{
            textDecoration:
              "none",
            color:
              "inherit",
          }}
        >

          <div
            style={{
              border:
                "1px solid #ddd",
              padding:
                "20px",
              borderRadius:
                "10px",
              cursor:
                "pointer",
            }}
          >

            <h2>
              {stats.rejectedVendors}
            </h2>

            <p>
              Rejected
            </p>

          </div>

        </Link>

      </div>

      <h2
        style={{
          marginTop: "40px",
        }}
      >
        Platform Analytics
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >

        <div
          style={{
            border:
              "1px solid #ddd",
            padding:
              "20px",
            borderRadius:
              "10px",
          }}
        >

          <h2>
            {stats.views}
          </h2>

          <p>
            Views
          </p>

        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding:
              "20px",
            borderRadius:
              "10px",
          }}
        >

          <h2>
            {stats.callClicks}
          </h2>

          <p>
            Calls
          </p>

        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding:
              "20px",
            borderRadius:
              "10px",
          }}
        >

          <h2>
            {stats.whatsappClicks}
          </h2>

          <p>
            WhatsApp
          </p>

        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding:
              "20px",
            borderRadius:
              "10px",
          }}
        >

          <h2>
            {stats.mapClicks}
          </h2>

          <p>
            Maps
          </p>

        </div>

      </div>

    </div>

  );

}