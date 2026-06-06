import VendorForm from "@/components/VendorForm";

async function getVendor(
  id: string
) {

  const res = await fetch(
    `http://localhost:5000/vendors/id/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();

}

export default async function EditVendorPage({
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

  return (

    <div>

      <VendorForm
      initialVendor={vendor}
    />
<br/>
    

    </div>

  );

}