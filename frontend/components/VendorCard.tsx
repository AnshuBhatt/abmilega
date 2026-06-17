import Link from "next/link";

export default function VendorCard({
vendor,
}: {
vendor: any;
}) {

const amenities =
vendor.amenities
?.slice(0, 2)
?.map(
(a: any) =>
a.amenity?.name
)
?.join(" • ");

return (

<div
  style={{
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
    background: "#fff",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
    transition:
      "0.2s ease",
  }}
>

  <div
    style={{
      position: "relative",
    }}
  >

    {vendor.imageUrl &&
    vendor.imageUrl !== "sd" ? (

      <img
        src={vendor.imageUrl}
        alt={vendor.name}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover",
        }}
      />

    ) : (

      <div
        style={{
          height: "220px",
          background:
            "#f3f4f6",
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          color: "#6b7280",
        }}
      >

        No Image Available

      </div>

    )}

    {vendor.isElite && (

      <div
        style={{
          position:
            "absolute",
          top: "10px",
          left: "10px",
          background:
            "#f59e0b",
          color: "white",
          padding:
            "4px 10px",
          borderRadius:
            "20px",
          fontSize:
            "12px",
          fontWeight:
            "bold",
        }}
      >

        ELITE

      </div>

    )}

  </div>

  <div
    style={{
      padding: "16px",
    }}
  >

    <div
      style={{
        color: "#6b7280",
        fontSize: "14px",
        marginBottom: "6px",
      }}
    >

      {vendor.category?.name}

    </div>

    <Link
      href={`/vendor/${vendor.slug}`}
      style={{
        textDecoration:
          "none",
        color: "inherit",
      }}
    >

      <h3
        style={{
          margin: 0,
          marginBottom:
            "8px",
        }}
      >

        {vendor.name}

      </h3>

    </Link>

    <p
      style={{
        color: "#6b7280",
        marginBottom:
          "12px",
      }}
    >

      📍 {vendor.city?.name}

    </p>

    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        marginBottom:
          "12px",
      }}
    >

      <span>

        {vendor.rating > 0
          ? `⭐ ${vendor.rating}`
          : "🆕 New"}

      </span>

      <span>

        ₹
        {vendor.startingPrice}
        /
        {vendor.pricingUnit}

      </span>

    </div>

    {amenities && (

      <p
        style={{
          fontSize:
            "14px",
          color:
            "#4b5563",
          marginBottom:
            "16px",
        }}
      >

        {amenities}

      </p>

    )}

    <div
      style={{
        display: "flex",
        gap: "8px",
      }}
    >

      <a
        href={`tel:${vendor.phone}`}
        style={{
          flex: 1,
          textAlign:
            "center",
          padding:
            "10px",
          borderRadius:
            "8px",
          background:
            "#f3f4f6",
          textDecoration:
            "none",
          color:
            "#111827",
        }}
      >

        Call

      </a>

      <a
        href={`https://wa.me/${vendor.whatsapp}`}
        target="_blank"
        style={{
          flex: 1,
          textAlign:
            "center",
          padding:
            "10px",
          borderRadius:
            "8px",
          background:
            "#25D366",
          color: "white",
          textDecoration:
            "none",
        }}
      >

        WhatsApp

      </a>

      <Link
        href={`/vendor/${vendor.slug}`}
        style={{
          flex: 1,
          textAlign:
            "center",
          padding:
            "10px",
          borderRadius:
            "8px",
          background:
            "#f97316",
          color:
            "white",
          textDecoration:
            "none",
        }}
      >

        View

      </Link>

    </div>

  </div>

</div>

);

}