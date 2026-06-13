"use client";

import { useRouter } from "next/navigation";

export default function DeleteVendorButton({
  vendorId,
}: {
  vendorId: number;
}) {

  const router = useRouter();

  async function deleteVendor() {

    const confirmed =
      confirm(
        "Are you sure?"
      );

    if (!confirmed) return;

    await fetch(
      `http://localhost:5000/vendors/${vendorId}`,
      {
        method: "DELETE",
      }
    );

    router.refresh();

  }

  return (

    <button
      onClick={deleteVendor}
    >
      Delete
    </button>

  );

}