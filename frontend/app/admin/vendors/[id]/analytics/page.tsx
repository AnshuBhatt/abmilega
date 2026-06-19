"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function VendorAnalyticsPage() {

const params = useParams();

const [vendor, setVendor] =
  useState<any>(null);

const [analytics, setAnalytics] =
  useState<any>(null);

const [events, setEvents] =
  useState<any[]>([]);

const [loading, setLoading] =
useState(true);

useEffect(() => {

if (!params?.id) {
  return;
}

async function loadData() {

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const vendorRes =
      await fetch(

        `http://localhost:5000/vendors/admin/${params.id}`,

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

    const vendorData =
      await vendorRes.json();

    const analyticsRes =
      await fetch(

        `http://localhost:5000/vendors/admin/${params.id}/analytics`,

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

    const analyticsData =
      await analyticsRes.json();

    const eventsRes =
      await fetch(

        `http://localhost:5000/vendors/admin/${params.id}/events`,

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

    const eventsData =
      await eventsRes.json();

    setVendor(
      vendorData
    );

    setAnalytics(
      analyticsData
    );

    setEvents(
      Array.isArray(eventsData)
        ? eventsData
        : []
    );

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }

}

loadData();

}, [params]);

if (loading) {

return <p>Loading...</p>;

}

return (

<div
  style={{
    padding: "20px",
  }}
>

  <h1>
    Analytics
  </h1>

  <h2>
    {vendor?.name}
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(4, 1fr)",
      gap: "20px",
      marginTop: "30px",
    }}
  >

    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
      }}
    >
      <h2>👀</h2>
      <h3>{analytics?.views ?? 0}</h3>
      <p>Views</p>
    </div>

    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
      }}
    >
      <h2>📞</h2>
      <h3>{analytics?.callClicks ?? 0}</h3>
      <p>Calls</p>
    </div>

    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
      }}
    >
      <h2>💬</h2>
      <h3>{analytics?.whatsappClicks ?? 0}</h3>
      <p>WhatsApp</p>
    </div>

    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
      }}
    >
      <h2>📍</h2>
      <h3>{analytics?.mapClicks ?? 0}</h3>
      <p>Maps</p>
    </div>

  </div>

  <h2
    style={{
      marginTop: "30px",
    }}
  >
    Recent Activity
  </h2>

  {events.length === 0 ? (

    <p>
      No activity found
    </p>

  ) : (

    events.map(
      (event: any) => (

        <div
          key={event.id}
          style={{
            borderBottom:
              "1px solid #eee",
            padding:
              "10px 0",
          }}
        >

          <strong>
            {event.eventType}
          </strong>

          <p>
            {new Date(
              event.createdAt
            ).toLocaleString()}
          </p>

        </div>

      )
    )

  )}

</div>

);

}