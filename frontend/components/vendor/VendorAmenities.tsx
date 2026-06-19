export default function VendorAmenities({
  amenities,
}: {
  amenities: any[];
}) {
  if (!amenities?.length) return null;

  return (
    <div className="flex flex-wrap gap-3">

      {amenities.map((item) => (

        <span
          key={item.amenity.id}
          className="px-4 py-2 bg-gray-100 rounded-full"
        >
          ✓ {item.amenity.name}
        </span>

      ))}

    </div>
  );
}