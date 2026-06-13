"use client";

import { useState } from "react";
import { useEffect } from "react";

export default function SaveVendorButton({
  vendorId,
}: {
  vendorId: number;
}) {

 const [saved, setSaved] =
  useState(false);

const [loading, setLoading] =
  useState(true);

  useEffect(() => {

  async function checkSaved() {

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {

      setLoading(false);

      return;

    }

    const res =
      await fetch(

        `http://localhost:5000/vendors/${vendorId}/is-saved`,

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

    const data =
      await res.json();

    setSaved(
      data.saved
    );

    setLoading(false);

  }

  checkSaved();

}, [vendorId]);

  async function toggleSaveVendor() {

  const token =
    localStorage.getItem("token");

  if (!token) {

    window.location.href =
      "/login";

    return;

  }

  if (saved) {

    const res =
      await fetch(

        `http://localhost:5000/vendors/${vendorId}/save`,

        {

          method: "DELETE",

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

    if (res.ok) {

      setSaved(false);

    }

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

  }

}
  if (loading) {

  return (
    <button disabled>
      Loading...
    </button>
  );

}



  return (

    <button
  onClick={toggleSaveVendor}
>

      {saved
        ? "❤️ Saved"
        : "🤍 Save Vendor"}

    </button>

  );

}