"use client";

import VendorForm from "@/components/VendorForm";
import AdminGuard from "@/components/AdminGuard";

export default function NewVendorPage() {

  return (

    <AdminGuard>

      <VendorForm />

    </AdminGuard>

  );

}