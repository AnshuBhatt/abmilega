import DeleteVendorButton from "@/components/DeleteVendorButton";
import Link from "next/link";

async function getVendors() {

  const res = await fetch(
    "http://localhost:5000/vendors",
    {
      cache: "no-store",
    }
  );

  return res.json();

}

export default async function VendorsPage() {

  const vendors =
    await getVendors();

  return (

    <div>

      <h1>
        Vendors
      </h1>

      {vendors.map(
        (vendor: any) => (

          <div
            key={vendor.id}
            style={{
              border:
                "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
            }}
          >

            <h3>
              {vendor.name}
            </h3>

            <p>
              {vendor.category.name}
            </p>

            <p>
              {vendor.city.name}
            </p>

            <Link
  href={`/admin/vendors/${vendor.id}/edit`}
>

  <button>
    Edit
  </button>

</Link>

          <br/>  
      <DeleteVendorButton
    vendorId={vendor.id}
  /> <br/>
  <a
  href={`/admin/vendors/${vendor.id}/analytics`}
>
  Analytics
</a>

          </div>

        )
      )}

    </div>

  );

}