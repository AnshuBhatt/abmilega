

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
            {vendor.showPackages &&
                vendor.packages.length > 0 && (
                    <>
                        <h2>Packages</h2>

                        {vendor.packages.map((pkg: any) => (
                            <div key={pkg.id}>

                                <h3>
                                    {pkg.packageTemplate.name}
                                </h3>

                                <p> ₹ {pkg.price}</p>

                                {pkg.features.map((f: any) => (
                                    <p key={f.feature.id}>
                                        ✓ {f.feature.name}
                                    </p>
                                ))}

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



        </div>
    );
}