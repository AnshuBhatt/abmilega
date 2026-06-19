export default function VendorHero({
  vendor,
}: {
  vendor: any;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

      <div className="lg:col-span-3 bg-white border rounded-2xl overflow-hidden">

        <div className="h-[350px] bg-orange-50 flex items-center justify-center text-8xl">

          {vendor.category?.slug === "wedding-venue"
            ? "🏛️"
            : vendor.category?.slug === "dentist"
            ? "🦷"
            : vendor.category?.slug === "doctor"
            ? "👨‍⚕️"
            : vendor.category?.slug === "salon"
            ? "💇"
            : vendor.category?.slug === "restaurant"
            ? "🍽️"
            : vendor.category?.slug === "hotel"
            ? "🏨"
            : "🏢"}

        </div>

        <div className="p-8">

          <div className="flex flex-wrap gap-2 mb-4">

            {vendor.isElite && (
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                ELITE VENDOR
              </span>
            )}

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
              VERIFIED
            </span>

          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            {vendor.name}
          </h1>

          <p className="text-gray-600 mb-4">
            📍 {vendor.city?.name}
          </p>

          <p className="text-gray-700">
            {vendor.description}
          </p>

        </div>

      </div>

      <div className="bg-white border rounded-2xl p-6 h-fit sticky top-32 self-start">

        <div className="text-sm text-gray-500 mb-2">
          STARTING FROM
        </div>

        <div className="text-4xl font-bold text-green-700">
          ₹{vendor.startingPrice || "Contact"}
        </div>

        <div className="text-gray-500 mb-6">
          {vendor.pricingUnit}
        </div>

        <div className="space-y-3">

          <a
            href={`tel:${vendor.phone}`}
            className="block text-center bg-orange-500 text-white py-3 rounded-xl"
          >
            Call Now
          </a>

          <a
            href={`https://wa.me/${vendor.whatsapp}`}
            target="_blank"
            className="block text-center bg-green-500 text-white py-3 rounded-xl"
          >
            WhatsApp
          </a>

        </div>

      </div>

    </div>
  );
}