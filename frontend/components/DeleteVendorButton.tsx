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

    if (!confirmed) {
      return;
    }

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await fetch(

        `http://localhost:5000/vendors/${vendorId}`,

        {

          method: "DELETE",

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

    const data =
      await response.json();

    if (!response.ok) {

      alert(
        data.message ||
        "Failed to delete vendor"
      );

      return;

    }

    alert(
      "Vendor deleted successfully"
    );

    router.refresh();

    window.location.reload();

  }

  return (

    <button
      onClick={
        deleteVendor
      }
    >
      Delete
    </button>

  );

}