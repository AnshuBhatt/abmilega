"use client";

import { useEffect, useState } from "react";

export default function NewVendorPage() {

    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [onboardingConfig, setOnboardingConfig] =
        useState<any>(null);
    const [vendorData, setVendorData] =
        useState({
            name: "",
            slug: "",
            phone: "",
            whatsapp: "",
            imageUrl: "",
            categoryId: "",
            cityId: "",
        });
    const [statsData, setStatsData] =
        useState<any[]>([]);
    const [selectedAmenities,
        setSelectedAmenities] =
        useState<number[]>([]);
    const [selectedCity, setSelectedCity] =
        useState("");

    async function loadOnboardingConfig(
        categoryId: string
    ) {

        const res = await fetch(
            `http://localhost:5000/categories/${categoryId}/onboarding-config`
        );

        const data = await res.json();

        console.log(data);

        setOnboardingConfig(data);

        console.log(onboardingConfig);
    }

    async function loadCategories() {
        const res = await fetch(
            "http://localhost:5000/categories"
        );

        const data = await res.json();

        console.log(data);

        setCategories(data);
    }



    async function loadCities() {

        const res = await fetch(
            "http://localhost:5000/cities"
        );

        const data = await res.json();

        setCities(data);
    }

    function updateStat(
        templateId: number,
        value: string
    ) {

        const existing =
            statsData.find(
                (s) =>
                    s.templateId === templateId
            );

        if (existing) {

            setStatsData(
                statsData.map((s) =>
                    s.templateId === templateId
                        ? {
                            ...s,
                            value,
                        }
                        : s
                )
            );

        } else {

            setStatsData([
                ...statsData,
                {
                    templateId,
                    value,
                },
            ]);

        }

    }

    function toggleAmenity(
        amenityId: number
    ) {

        if (
            selectedAmenities.includes(
                amenityId
            )
        ) {

            setSelectedAmenities(
                selectedAmenities.filter(
                    (id) => id !== amenityId
                )
            );

        } else {

            setSelectedAmenities([
                ...selectedAmenities,
                amenityId,
            ]);

        }

    }

    async function createVendor() {

        const payload = {

            ...vendorData,

            stats: statsData,

            amenities: selectedAmenities,

        };

        fetch(
            "http://localhost:5000/vendors",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify(
                    payload
                ),
            }
        );

    }



    useEffect(() => {
        loadCategories();
        loadCities();
    }, []);

    useEffect(() => {

        if (!selectedCategory) return;

        loadOnboardingConfig(
            selectedCategory
        );

    }, [selectedCategory]);

    console.log(vendorData);
    console.log(statsData);
    console.log(selectedAmenities);

    return (
        <div>
            <h1>Create Vendor</h1>

            <form>
                <h2>Basic Details</h2>

                <input
                    placeholder="Vendor Name"
                    value={vendorData.name}
                    onChange={(e) =>
                        setVendorData({
                            ...vendorData,
                            name: e.target.value,
                        })
                    }
                />

                <br />
                <br />

                <input
                    placeholder="Slug"
                    value={vendorData.slug}
                    onChange={(e) =>
                        setVendorData({
                            ...vendorData,
                            slug: e.target.value,
                        })
                    }
                />

                <br />
                <br />

                <input
                    placeholder="Phone"
                    value={vendorData.phone}
                    onChange={(e) =>
                        setVendorData({
                            ...vendorData,
                            phone: e.target.value,
                        })
                    }
                />

                <br />
                <br />

                <input
                    placeholder="WhatsApp"
                    value={vendorData.whatsapp}
                    onChange={(e) =>
                        setVendorData({
                            ...vendorData,
                            whatsapp: e.target.value,
                        })
                    }
                />

                <br />
                <br />

                <input
                    placeholder="Image URL"
                    value={vendorData.imageUrl}
                    onChange={(e) =>
                        setVendorData({
                            ...vendorData,
                            imageUrl: e.target.value,
                        })
                    }
                />

                <br />
                <br />

                <select
                    value={selectedCategory}
                    onChange={(e) => {

                        setSelectedCategory(
                            e.target.value
                        );

                        setVendorData({
                            ...vendorData,
                            categoryId: e.target.value,
                        });

                    }}
                >
                    <option>Select Category</option>

                    {categories.map((category: any) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>

                <br />
                <br />

                <select
                    value={selectedCity}
                    onChange={(e) => {

                        setSelectedCity(
                            e.target.value
                        );

                        setVendorData({
                            ...vendorData,
                            cityId: e.target.value,
                        });

                    }}
                >

                    <option>
                        Select City
                    </option>

                    {cities.map((city: any) => (

                        <option
                            key={city.id}
                            value={city.id}
                        >
                            {city.name}
                        </option>

                    ))}

                </select>

                <br />
                <br />

                <h2>Stats</h2>

                {onboardingConfig?.stats?.map(
                    (stat: any) => (
                        <div key={stat.id}>

                            <label>
                                {stat.label}
                            </label>

                            <br />

                            <input
                                placeholder={stat.label}

                                onChange={(e) =>
                                    updateStat(
                                        stat.id,
                                        e.target.value
                                    )
                                }
                            />

                            <br />
                            <br />

                        </div>
                    )
                )}

                <h2>Amenities</h2>

                {onboardingConfig?.amenities?.map(
                    (item: any) => (

                        <div
                            key={item.id}
                        >

                            <input
                                type="checkbox"

                                onChange={() =>
                                    toggleAmenity(item.id)
                                }
                            />

                            <label>
                                {item.name}
                            </label>

                        </div>

                    )
                )}

                <br />
                <br />

                <button
                    type="button"
                    onClick={createVendor}
                >
                    Create Vendor
                </button>

            </form>
        </div>
    );


}