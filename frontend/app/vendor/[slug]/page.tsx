
import VendorHero from "@/components/vendor/VendorHero";
import VendorStats from "@/components/vendor/VendorStats";
import VendorAmenities from "@/components/vendor/VendorAmenities";
import VendorSocialLinks from "@/components/vendor/VendorSocialLinks";
import VendorTabs from "@/components/vendor/VendorTabs";

import VendorViewTracker from "@/components/VendorViewTracker";
import TrackedLink from "@/components/TrackedLink";
import SaveVendorButton from "@/components/SaveVendorButton";

async function getVendor(slug: string) {
    const res = await fetch(
        `http://localhost:5000/vendors/${slug}`,
        {
            cache: "no-store",
        }
    );

    return res.json();
}



export default async function VendorPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const vendor = await getVendor(slug);
    if (
  !vendor ||
  vendor.error
) {

  return (

    <div>

      <h1>
        Vendor not found
      </h1>

    </div>

  );

}

    
    return (
        
     <div className="container mx-auto px-4 py-6 space-y-8">

  <VendorHero vendor={vendor} />

  <VendorStats
    stats={vendor.stats}
  />

  <div>

    <h2 className="text-2xl font-bold mb-4">
      Amenities
    </h2>

    <VendorAmenities
      amenities={vendor.amenities}
    />

  </div>

  <div>

    <h2 className="text-2xl font-bold mb-4">
      Social Links
    </h2>

    <VendorSocialLinks
      vendor={vendor}
    />

  </div>

  <VendorTabs vendor={vendor} />

</div>

    );
}