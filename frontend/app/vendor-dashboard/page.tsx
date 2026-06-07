"use client";

import { useEffect, useState } from "react";

export default function VendorDashboardPage() {

  const [vendors,
    setVendors] =
    useState<any[]>([]);

    const [completionData,
  setCompletionData] =
  useState<any>({});

  const [analyticsData,
  setAnalyticsData] =
  useState<any>({});

  async function loadVendors() {

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

        "http://localhost:5000/users/me/vendors",

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

    data.forEach(
  (vendor: any) => {

    loadCompletion(
      vendor.id
    );
    loadAnalytics(
  vendor.id
);

  }
);

  }

  async function loadCompletion(
  vendorId: number
) {

  const res =
    await fetch(

      `http://localhost:5000/vendors/${vendorId}/completion`

    );

  const data =
    await res.json();

  setCompletionData(
    (prev: any) => ({

      ...prev,

      [vendorId]: data,

    })
  );

}

async function loadAnalytics(
  vendorId: number
) {

  const res =
    await fetch(

      `http://localhost:5000/vendors/${vendorId}/analytics`

    );

  const data =
    await res.json();

  setAnalyticsData(
    (prev: any) => ({

      ...prev,

      [vendorId]: data,

    })
  );

}

  useEffect(() => {

    loadVendors();

  }, []);

  return (

    <div
      style={{
        padding: "20px",
      }}
    >

      <h1>
        Vendor Dashboard
      </h1>

      {vendors.length === 0 && (

        <div>

          <p>
            You do not own any
            businesses yet.
          </p>

        </div>

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

            <h2>
              {vendor.name}
            </h2>

            <p>
              Status:
              {" "}
              <strong>
                {vendor.status}
              </strong>
            </p>

            <p>

  Profile Completion:

  {" "}

  {completionData[
    vendor.id
  ]?.completion ?? 0}%

</p>

<div>

  <strong>
    Missing:
  </strong>

  <ul>

    {completionData[
      vendor.id
    ]?.missing?.map(
      (
        item: string
      ) => (

        <li key={item}>
          ❌ {item}
        </li>

      )
    )}

  </ul>

  <h4>
  Analytics
</h4>

<p>
  👀 Views:
  {" "}
  {
    analyticsData[
      vendor.id
    ]?.views ?? 0
  }
</p>

<p>
  📞 Calls:
  {" "}
  {
    analyticsData[
      vendor.id
    ]?.callClicks ?? 0
  }
</p>

<p>
  💬 WhatsApp:
  {" "}
  {
    analyticsData[
      vendor.id
    ]?.whatsappClicks ?? 0
  }
</p>

<p>
  📍 Maps:
  {" "}
  {
    analyticsData[
      vendor.id
    ]?.mapClicks ?? 0
  }
</p>

</div>

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

            <a
              href={`/admin/vendors/${vendor.id}/edit`}
            >
              Edit Business
            </a>

          </div>

        )
      )}

    </div>

  );

}