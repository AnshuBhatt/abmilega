"use client";

import { useState } from "react";

export default function SaveVendorButton({
  vendorId,
}: {
  vendorId: number;
}) {

  const [saved, setSaved] =
    useState(false);

  async function saveVendor() {

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

        `http://localhost:5000/vendors/${vendorId}/save`,

        {

          method: "POST",

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

    if (res.ok) {

      setSaved(true);

    } else {

      const data =
        await res.json();

      alert(
        data.message
      );

    }

  }

  return (

    <button
      onClick={
        saveVendor
      }
    >

      {saved
        ? "❤️ Saved"
        : "🤍 Save Vendor"}

    </button>

  );

}