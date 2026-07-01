"use client";

import { useEffect, useState } from "react";

export default function SaveVendorButton({
  vendorId,
}: {
  vendorId: number;
}) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSaved() {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:5000/vendors/${vendorId}/is-saved`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setSaved(Boolean(data.saved));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    checkSaved();
  }, [vendorId]);

  async function toggleSaveVendor() {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      if (saved) {
        const res = await fetch(
          `http://localhost:5000/vendors/${vendorId}/save`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          setSaved(false);
        }

        return;
      }

      const res = await fetch(
        `http://localhost:5000/vendors/${vendorId}/save`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setSaved(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <button
        type="button"
        disabled
        className="w-full rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500"
      >
        Loading...
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleSaveVendor}
      className={`w-full rounded-full border px-3 py-2 text-sm font-medium transition ${
        saved
          ? "border-pink-300 bg-pink-50 text-pink-600"
          : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-500"
      }`}
    >
      {saved ? "❤️ Saved" : "🤍 Save Vendor"}
    </button>
  );
}