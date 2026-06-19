import Link from "next/link";

export default function VendorListCard({
vendor,
}: {
vendor: any;
}) {

const amenities =
vendor.amenities
?.slice(0, 4)
?.map(
(a: any) =>
a.amenity?.name
) || [];

const reviewCount =
vendor.reviews?.length || 0;

const averageRating =
reviewCount > 0
? (
vendor.reviews.reduce(
(
sum: number,
review: any
) =>
sum +
review.rating,
0
) / reviewCount
).toFixed(1)
: null;

const categoryIcon =
vendor.category?.slug ===
"wedding-venue"
? "🏛️"
: vendor.category?.slug ===
"dentist"
? "🦷"
: vendor.category?.slug ===
"salon"
? "💇"
: vendor.category?.slug ===
"restaurant"
? "🍽️"
: vendor.category?.slug ===
"hotel"
? "🏨"
: vendor.category?.slug ===
"doctor"
? "👨‍⚕️"
: vendor.category?.slug ===
"tutor"
? "📚"
: "🏢";

return (

<div
  className="
    bg-white
    rounded-2xl
    border
    shadow-sm
    overflow-hidden
    hover:shadow-md
    transition
  "
>

  <div
    className="
      flex
      flex-col
      md:flex-row
    "
  >

    <div
      className="
        w-full
        md:w-[280px]
        h-[220px]
        bg-gradient-to-br
        from-orange-50
        to-orange-100
        flex
        items-center
        justify-center
        text-6xl
      "
    >

      {categoryIcon}

    </div>

    <div className="flex-1 p-5">

      <div
        className="
          flex
          justify-between
          items-start
          mb-3
        "
      >

        <div>

          <p
            className="
              text-xs
              text-orange-500
              font-medium
              uppercase
            "
          >
            {vendor.category?.name}
          </p>

          <Link
            href={`/vendor/${vendor.slug}`}
          >

            <h2
              className="
                text-2xl
                font-bold
                hover:text-orange-500
              "
            >
              {vendor.name}
            </h2>

          </Link>

        </div>

        {vendor.isElite && (

          <span
            className="
              bg-yellow-100
              text-yellow-700
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold
            "
          >
            ELITE
          </span>

        )}

      </div>

      <div
        className="
          flex
          flex-wrap
          gap-4
          text-sm
          text-gray-600
          mb-4
        "
      >

        <span>
          📍 {vendor.city?.name}
        </span>

        <span>
          ⭐ {averageRating || "New"}
        </span>

        <span>
  {reviewCount > 0
    ? `${reviewCount} Reviews`
    : "No Reviews"}
</span>

      </div>

      {amenities.length > 0 && (

        <div
          className="
            flex
            flex-wrap
            gap-2
            mb-4
          "
        >

          {amenities.map(
            (
              amenity: string
            ) => (

              <span
                key={amenity}
                className="
                  text-xs
                  bg-gray-100
                  px-3
                  py-1
                  rounded-full
                "
              >
                {amenity}
              </span>

            )
          )}

        </div>

      )}

      {vendor.startingPrice ? (

        <div
          className="
            text-2xl
            font-bold
            text-green-700
            mb-5
          "
        >

          ₹
          {vendor.startingPrice}

          {vendor.pricingUnit && (

            <span
              className="
                text-sm
                text-gray-500
                font-normal
                ml-2
              "
            >
              {vendor.pricingUnit}
            </span>

          )}

        </div>

      ) : (

        <div
          className="
            text-gray-500
            mb-5
          "
        >
          Price on Request
        </div>

      )}

      <div
        className="
          flex
          flex-wrap
          gap-3
        "
      >

        <a
          href={`tel:${vendor.phone}`}
          className="
            px-4
            py-2
            border
            rounded-lg
          "
        >
          Call
        </a>

        <a
          href={`https://wa.me/${vendor.whatsapp}`}
          target="_blank"
          className="
            px-4
            py-2
            rounded-lg
            bg-green-500
            text-white
          "
        >
          WhatsApp
        </a>

        <Link
          href={`/vendor/${vendor.slug}`}
          className="
            px-4
            py-2
            rounded-lg
            bg-orange-500
            text-white
          "
        >
          View Details
        </Link>

      </div>

    </div>

  </div>

</div>

);

}