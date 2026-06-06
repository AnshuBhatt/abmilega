import ReviewForm from "@/components/ReviewForm";

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

    return (
        <div style={{ padding: "20px" }}>
            {vendor.imageUrl && (
                <img
                    src={vendor.imageUrl}
                    alt={vendor.name}
                    width="600"
                />
            )}

            <h1>{vendor.name}</h1>

            <h2>
                Business Information
            </h2>

            <p>
                📍 {vendor.address}
            </p>

            <p>
                📍 {vendor.city.name}
            </p>

            <p>
                📮 {vendor.zipcode}
            </p>

            {vendor.address && (

                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${vendor.name} ${vendor.address} ${vendor.zipcode ?? ""}`
                    )}`}
                    target="_blank"
                >

                    <button>
                        📍 Open in Google Maps
                    </button>

                </a>

            )}

            <p>
                💰 Starting From ₹
                {vendor.startingPrice}
                {" "}
                {vendor.pricingUnit}
            </p>

            {vendor.isElite && (
                <p>
                    🏆 Elite Vendor
                </p>
            )}

            <p>
                ⭐ {vendor.rating}
            </p>


            <p>
                🏷 {vendor.category.name}
            </p>


            <h2>Stats</h2>

            <div>
                {vendor.stats.map((stat: any) => (
                    <div key={stat.id}>
                        <strong>{stat.value}</strong>

                        <p>{stat.template.label}</p>
                    </div>
                ))}
            </div>

            <h2>Amenities</h2>

            <div>
                {vendor.amenities.map(
                    (amenityItem: any) => (
                        <p key={amenityItem.amenity.id}>
                            ✓ {amenityItem.amenity.name}
                        </p>
                    )
                )}
            </div>
            <h2>
                Online Presence
            </h2>
            {vendor.websiteUrl && (
                <p>
                    🌐
                    <a
                        href={vendor.websiteUrl}
                        target="_blank"
                    >
                        Website
                    </a>
                </p>
            )}
            {vendor.instagramUrl && (
                <p>
                    📸
                    <a
                        href={vendor.instagramUrl}
                        target="_blank"
                    >
                        Instagram
                    </a>
                </p>
            )}

            <p>
                showPackages:
                {String(vendor.showPackages)}
            </p>

            <p>
                package count:
                {vendor.packages.length}
            </p>

            {
                vendor.packages.length > 0 && (

                    <>
                        <h2>Packages</h2>

                        {vendor.packages.map((pkg: any) => (

                            <div
                                key={pkg.id}
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "20px",
                                    marginBottom: "20px",
                                    borderRadius: "10px",
                                }}
                            >

                                <h3>
                                    {pkg.packageTemplate.name}
                                </h3>

                                <h2>
                                    ₹ {Number(pkg.price).toLocaleString()}
                                </h2>

                                <h4>
                                    Included Features
                                </h4>

                                {pkg.features.map(
                                    (f: any) => (

                                        <p
                                            key={
                                                f.feature.id
                                            }
                                        >
                                            ✓ {f.feature.name}
                                        </p>

                                    )
                                )}

                            </div>

                        ))}
                    </>

                )}
            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    gap: "10px",
                }}
            >
                <a
                    href={`tel:${vendor.phone}`}
                >
                    <button>
                        📞 Call Vendor
                    </button>
                </a>

                <a
                    href={`https://wa.me/91${vendor.whatsapp}`}
                    target="_blank"
                >
                    <button>
                        💬 WhatsApp Vendor
                    </button>
                </a>
            </div>
            <hr />

            <h2>Vendor Details</h2>

            <p>
                Phone: {vendor.phone}
            </p>

            <p>
                WhatsApp: {vendor.whatsapp}
            </p>

            <h2>AB Milega Reviews</h2>

            {vendor.reviews.length === 0 && (
                <p>
                    No reviews yet.
                </p>
            )}

            {vendor.reviews.map((review: any) => (

                <div
                    key={review.id}
                    style={{
                        border: "1px solid #ddd",
                        padding: "15px",
                        marginBottom: "10px",
                        borderRadius: "8px",
                    }}
                >

                    <h4>
                        {review.reviewerName}
                    </h4>

                    <p>
                        {"⭐".repeat(review.rating)}
                    </p>

                    <p>
                        {review.comment}
                    </p>

                </div>

            ))}
            <ReviewForm
                vendorId={vendor.id}
            />
        </div>

    );
}