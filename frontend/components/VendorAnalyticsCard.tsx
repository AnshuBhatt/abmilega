"use client";

import { useEffect, useState } from "react";

export default function VendorAnalyticsCard({
  vendorId,
}: {
  vendorId: number;
}) {

  const [analytics, setAnalytics] =
    useState<any>(null);

  useEffect(() => {

    async function loadAnalytics() {

      const res = await fetch(
        `http://localhost:5000/vendors/${vendorId}/analytics`
      );

      const data =
        await res.json();

      setAnalytics(data);

    }

    loadAnalytics();

  }, [vendorId]);

  if (!analytics) {

    return <p>Loading analytics...</p>;

  }

  return (

    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >

      <h2>
        Analytics
      </h2>

      <p>
        👀 Views:
        {" "}
        {analytics.views}
      </p>

      <p>
        📞 Calls:
        {" "}
        {analytics.callClicks}
      </p>

      <p>
        💬 WhatsApp:
        {" "}
        {analytics.whatsappClicks}
      </p>

      <p>
        📍 Maps:
        {" "}
        {analytics.mapClicks}
      </p>

    </div>

  );

}