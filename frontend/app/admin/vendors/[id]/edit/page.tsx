"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import VendorForm from "@/components/VendorForm";

export default function AdminVendorEditPage() {
  const params = useParams();

  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) {
      return;
    }

    async function loadVendor() {
      try {
        const token = localStorage.getItem("token");

        console.log("TOKEN", token);
        console.log("PARAMS", params);
        console.log("ID", params.id);

        const response = await fetch(
  `http://localhost:5000/vendors/admin/${params.id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

        console.log("STATUS", response.status);

        const text = await response.text();

console.log("RAW RESPONSE", text);

const data = text
  ? JSON.parse(text)
  : null;
  
        console.log("ADMIN VENDOR", data);

        setVendor(data);
      } catch (error) {
        console.error("LOAD VENDOR ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    loadVendor();
  }, [params]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!vendor?.id && !vendor?._id) {
    return (
      <div>
        <h1>Vendor not found</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Vendor</h1>

      <VendorForm initialVendor={vendor} />
    </div>
  );
}