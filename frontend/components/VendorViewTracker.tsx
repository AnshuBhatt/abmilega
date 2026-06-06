"use client";

import { useEffect } from "react";

export default function VendorViewTracker({
  vendorId,
}: {
  vendorId: number;
}) {

  useEffect(() => {

    fetch(
      `http://localhost:5000/vendors/${vendorId}/events`,
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          eventType: "VIEW",

        }),

      }
    );

  }, [vendorId]);

  return null;

}