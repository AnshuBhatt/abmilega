"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import VendorForm from "@/components/VendorForm";

export default function VendorEditPage() {

    const params = useParams();

    const id = params?.id as string;

    const [vendor, setVendor] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        if (!id) return;

        async function loadVendor() {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const response =
                    await fetch(

                        `http://localhost:5000/vendors/id/${id}`,

                        {

                            headers: {

                                Authorization:
                                    `Bearer ${token}`,

                            },

                        }

                    );

                const data =
                    await response.json();

                console.log(data);

                setVendor(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        }

        loadVendor();

    }, [id]);

    if (loading) {

        return <div>Loading...</div>;

    }

 if (vendor?.message) {

  return (

    <div>

      <h1>
        {vendor.message}
      </h1>

    </div>

  );

}
    return (

        <div
            style={{
                padding: "20px",
            }}
        >

            <h1>
                Edit Business
            </h1>

            <VendorForm
                initialVendor={vendor}
            />

        </div>

    );

}