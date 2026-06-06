"use client";

import { useEffect, useState } from "react";

export default function VendorForm({
  initialVendor,
}: {
  initialVendor?: any;
}) {

    const isEditMode =
  !!initialVendor;

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [onboardingConfig, setOnboardingConfig] =
    useState<any>(null);
  const [vendorData, setVendorData] =
    useState(

    initialVendor || {

      name: "",
      description: "",

      phone: "",
      whatsapp: "",

      imageUrl: "",

      address: "",
      zipcode: "",

      websiteUrl: "",
      instagramUrl: "",

      startingPrice: "",
      pricingUnit: "",

      categoryId: "",
      cityId: "",

      latitude: "",
      longitude: "",

      facebookUrl: "",

      youtubeUrl: "",
      linkedinUrl: "",

      googleBusinessUrl: "",


    });
  const [statsData, setStatsData] =
    useState<any[]>([]);
  const [selectedAmenities,
    setSelectedAmenities] =
    useState<number[]>([]);
  const [selectedCity, setSelectedCity] =
    useState("");
  const [packagesData, setPackagesData] =
    useState<any[]>([]);
  
    useEffect(() => {

  if (!initialVendor) return;

  setSelectedCategory(
    String(initialVendor.categoryId)
  );

  setSelectedCity(
    String(initialVendor.cityId)
  );

}, [initialVendor]);

useEffect(() => {

  if (!initialVendor) return;

  if (initialVendor.stats) {

    setStatsData(
      initialVendor.stats.map(
        (stat: any) => ({
          templateId:
            stat.templateId,
          value:
            stat.value,
        })
      )
    );

  }

  if (initialVendor.amenities) {

    setSelectedAmenities(

      initialVendor.amenities.map(
        (item: any) =>
          item.amenityId
      )

    );

  }

}, [initialVendor]);

useEffect(() => {

  if (!initialVendor) return;

  setPackagesData(

    initialVendor.packages.map(
      (pkg: any) => ({

        packageTemplateId:
          pkg.packageTemplateId,

        price:
          pkg.price,

        features:
          pkg.features.map(
            (f: any) =>
              f.featureId
          ),

      })
    )

  );

}, [initialVendor]);

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

      packages: packagesData,

    };
    console.log(payload);

    const url = isEditMode
  ? `http://localhost:5000/vendors/${initialVendor.id}`
  : "http://localhost:5000/vendors";

const method = isEditMode
  ? "PUT"
  : "POST";

fetch(
  url,
  {
    method,
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
    console.log(
      "ONBOARDING CONFIG",
      onboardingConfig
    );
  }, [onboardingConfig]);

  useEffect(() => {

    if (!selectedCategory) return;

    loadOnboardingConfig(
      selectedCategory
    );

  }, [selectedCategory]);

  console.log(vendorData);
  console.log(statsData);
  console.log(selectedAmenities);

  function updatePackagePrice(
    packageTemplateId: number,
    price: string
  ) {

    setPackagesData((previous: any[]) => {

      const existingPackage =
        previous.find(
          (pkg) =>
            pkg.packageTemplateId ===
            packageTemplateId
        );

      if (existingPackage) {

        return previous.map((pkg) =>

          pkg.packageTemplateId ===
            packageTemplateId

            ? {
              ...pkg,
              price,
            }

            : pkg
        );
      }

      return [
        ...previous,

        {
          packageTemplateId,
          price,
          features: [],
        },
      ];
    });
  }

  function togglePackageFeature(
    packageTemplateId: number,
    featureId: number
  ) {

    setPackagesData((previous: any[]) => {

      const packageData =
        previous.find(
          (pkg) =>
            pkg.packageTemplateId ===
            packageTemplateId
        );

      if (!packageData) {

        return [
          ...previous,

          {
            packageTemplateId,
            price: "",
            features: [featureId],
          },
        ];
      }

      const featureExists =
        packageData.features.includes(
          featureId
        );

      return previous.map((pkg) => {

        if (
          pkg.packageTemplateId !==
          packageTemplateId
        ) {
          return pkg;
        }

        return {

          ...pkg,

          features: featureExists

            ? pkg.features.filter(
              (id: number) =>
                id !== featureId
            )

            : [
              ...pkg.features,
              featureId,
            ],
        };
      });
    });
  }

  return (
    <div>
      <h1>{isEditMode
    ? "Update Vendor"
    : "Create Vendor"}</h1>

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

        <textarea
          placeholder="Description"
          value={vendorData.description}
          onChange={(e) =>
            setVendorData({
              ...vendorData,
              description: e.target.value,
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
          placeholder="Website URL"
          value={vendorData.websiteUrl}
          onChange={(e) =>
            setVendorData({
              ...vendorData,
              websiteUrl: e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          placeholder="Instagram URL"
          value={vendorData.instagramUrl}
          onChange={(e) =>
            setVendorData({
              ...vendorData,
              instagramUrl: e.target.value,
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
          value={vendorData.categoryId}
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
          value={vendorData.cityId}
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

        <input
          placeholder="Address"
          value={vendorData.address}
          onChange={(e) =>
            setVendorData({
              ...vendorData,
              address: e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          placeholder="Zip Code"
          value={vendorData.zipcode}
          onChange={(e) =>
            setVendorData({
              ...vendorData,
              zipcode: e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          placeholder="Starting Price"
          value={vendorData.startingPrice}
          onChange={(e) =>
            setVendorData({
              ...vendorData,
              startingPrice: e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          placeholder="Pricing Unit"
          value={vendorData.pricingUnit}
          onChange={(e) =>
            setVendorData({
              ...vendorData,
              pricingUnit: e.target.value,
            })
          }
        />

        <br /><br />

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

                value={

    statsData.find(
      (s) =>
        s.templateId ===
        stat.id
    )?.value || ""

  }

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

                checked={
    selectedAmenities.includes(
      item.id
    )
  }

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

        <h2>Package Templates</h2>


        <br /><br />
        <h2>Package Features</h2>

       <br /><br />
        <h2>Packages</h2>

        {onboardingConfig?.packageTemplates?.map(
          (pkg: any) => (

            <div key={pkg.id}>

              <h3>{pkg.name}</h3>

              <h4>
                Features
              </h4>

              {onboardingConfig?.packageFeatureTemplates?.map(
                (feature: any) => (

                  <div key={feature.id}>

                    <input
                      type="checkbox"

                      checked={

    packagesData.find(
      (p) =>
        p.packageTemplateId ===
        pkg.id
    )?.features?.includes(
      feature.id
    ) || false

  }
                      onChange={() =>
                        togglePackageFeature(
                          pkg.id,
                          feature.id
                        )
                      }
                    />

                    {feature.name}

                  </div>

                )
              )}

              <input
                placeholder="Package Price"

                value={

    packagesData.find(
      (p) =>
        p.packageTemplateId ===
        pkg.id
    )?.price || ""

  }

                onChange={(e) =>
                  updatePackagePrice(
                    pkg.id,
                    e.target.value
                  )
                }
              />

             

            </div>

          )
        )}

        <button
  onClick={createVendor}
>
  {
    isEditMode
      ? "Update Vendor"
      : "Create Vendor"
  }
</button>

      </form>
    </div>
  );


}