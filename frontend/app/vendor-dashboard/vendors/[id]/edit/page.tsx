import VendorForm from "@/components/VendorForm";


async function getVendor(
  id: string
) {

  const res =
    await fetch(

      `http://localhost:5000/vendors/id/${id}`,

      {

        cache: "no-store",

      }

    );

  return res.json();

}

export default async function VendorEditPage({

  params,

}: {

  params: Promise<{
    id: string;
  }>;

}) {

  const { id } =
    await params;

  const vendor =
    await getVendor(id);

  if (!vendor) {

    return (

      <div>

        <h1>
          Vendor not found
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
        initialVendor={
          vendor
        }
      />

    </div>

  );

}