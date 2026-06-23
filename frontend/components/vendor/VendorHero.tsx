import {
  MapPin,
  Star,
  ShieldCheck,
} from "lucide-react";

import VendorGallery from "./VendorGallery";

export default function VendorHero({
  vendor,
}: any) {
  return (
    <div className="grid lg:grid-cols-12 gap-6">

      {/* LEFT */}

      <div className="lg:col-span-8">

        <div className="bg-white border rounded-3xl overflow-hidden shadow-sm">

          {/* IMAGE */}

          <div className="h-[380px] bg-orange-50 flex items-center justify-center">

           <div className="bg-orange-50">

  {vendor.images?.length > 0 ? (

    <VendorGallery
      images={vendor.images}
    />

  ) : (

    <div className="h-[380px] flex items-center justify-center">

      <div className="text-7xl">
        🏛️
      </div>

    </div>

  )}

</div>

          </div>

          {/* CONTENT */}

          <div className="p-6">

            {/* BADGES */}

            <div className="flex gap-2 mb-4">

              {vendor.isElite && (
                <span
                  className="
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-medium
                  bg-yellow-100
                  text-yellow-700
                "
                >
                  🏆 Elite Vendor
                </span>
              )}

              <span
                className="
                px-3
                py-1
                rounded-full
                text-xs
                font-medium
                bg-green-100
                text-green-700
              "
              >
                Verified
              </span>

            </div>

            {/* TITLE */}

            <h1 className="text-4xl font-bold">
              
              {vendor.name}
            </h1>
<div className="flex flex-wrap gap-4 mt-4 text-gray-600">

  <div>
    ⭐ {vendor.rating || "New"}
  </div>

  <div>
    📍 {vendor.city?.name}
  </div>

  <div>
    🏷 {vendor.category?.name}
  </div>

  <div>
    💬 {vendor.reviews?.length || 0} Reviews
  </div>

</div>
            {/* CITY */}

            <div className="flex items-center gap-2 mt-3 text-gray-500">

              <MapPin size={16} />

              <span>
                {vendor.city?.name}
              </span>

            </div>

            {/* DESCRIPTION */}

            <p className="mt-4 text-gray-600 leading-relaxed">

              {vendor.description}

            </p>
{vendor.amenities?.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-5">

    {vendor.amenities.map((item: any) => (

      <span
        key={item.amenity.id}
        className="
          px-3
          py-1
          rounded-full
          bg-gray-100
          text-sm
        "
      >
        {item.amenity.name}
      </span>

    ))}

  </div>
)}
          </div>

        </div>

      </div>

      {/* RIGHT SIDEBAR */}

      <div className="lg:col-span-4">

        <div
          className="
          sticky
          top-24
          bg-white
          border
          rounded-3xl
          p-6
          shadow-sm
        "
        >

          <div className="flex items-center gap-2 mb-4">

            <Star
              size={18}
              className="text-orange-500"
            />

            <span className="font-semibold">

              {vendor.rating || "New"}

            </span>

          </div>

          <div
            className="
            border
            rounded-2xl
            p-4
            mb-5
          "
          >

            <p className="text-xs text-gray-500 uppercase">

              Starting From

            </p>

            <h2
              className="
              text-4xl
              font-bold
              text-orange-500
            "
            >
              ₹{vendor.startingPrice}
            </h2>

            <p className="text-gray-500">

              {vendor.pricingUnit}

            </p>

          </div>

          <button
            className="
            w-full
            bg-orange-500
            hover:bg-orange-600
            text-white
            py-3
            rounded-xl
            font-semibold
            mb-3
          "
          >
            Call Now
          </button>

          <button
            className="
            w-full
            border
            border-green-500
            text-green-600
            py-3
            rounded-xl
            font-semibold
          "
          >
            WhatsApp
          </button>

          <div
            className="
            flex
            items-center
            gap-2
            mt-5
            text-sm
            text-gray-500
          "
          >

            <ShieldCheck
              size={16}
            />

            Verified Business

          </div>

        </div>

      </div>

    </div>
  );
}