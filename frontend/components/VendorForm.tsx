"use client";

import { useEffect, useMemo, useState } from "react";

type VendorFormValues = {
  name: string;
  description: string;
  phone: string;
  whatsapp: string;
  imageUrl: string;
  address: string;
  zipcode: string;
  websiteUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  googleBusinessUrl: string;
  startingPrice: string;
  pricingUnit: string;
  categoryId: string;
  cityId: string;
  latitude: string;
  longitude: string;
};

type Errors = Partial<Record<keyof VendorFormValues, string>> & {
  stats?: string;
  amenities?: string;
  packages?: string;
};

const blankVendor: VendorFormValues = {
  name: "",
  description: "",
  phone: "",
  whatsapp: "",
  imageUrl: "",
  address: "",
  zipcode: "",
  websiteUrl: "",
  instagramUrl: "",
  facebookUrl: "",
  youtubeUrl: "",
  linkedinUrl: "",
  googleBusinessUrl: "",
  startingPrice: "",
  pricingUnit: "",
  categoryId: "",
  cityId: "",
  latitude: "",
  longitude: "",
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

function isValidUrl(value: string) {
  if (!value.trim()) return true;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

function validateField(
  field: keyof VendorFormValues,
  value: string,
  context: {
    isEditMode: boolean;
  }
) {
  const trimmed = value.trim();

  switch (field) {
    case "name":
      if (!trimmed) return "Business name is required.";
      if (trimmed.length < 3) return "Business name must be at least 3 characters.";
      if (trimmed.length > 80) return "Business name must be 80 characters or less.";
      return "";

    case "description":
      if (!trimmed) return "Description is required.";
      if (trimmed.length < 20) return "Description must be at least 20 characters.";
      if (trimmed.length > 1000) return "Description must be 1000 characters or less.";
      return "";

    case "phone":
      if (!trimmed) return "Phone number is required.";
      if (!/^\d{10}$/.test(trimmed)) return "Enter a valid 10-digit phone number.";
      return "";

    case "whatsapp":
      if (!trimmed) return "WhatsApp number is required.";
      if (!/^\d{10}$/.test(trimmed)) return "Enter a valid 10-digit WhatsApp number.";
      return "";

    case "imageUrl":
      if (!context.isEditMode && !trimmed) return "Business image URL is required.";
      if (trimmed && !isValidUrl(trimmed)) return "Enter a valid image URL.";
      return "";

    case "address":
      if (!trimmed) return "Address is required.";
      if (trimmed.length < 5) return "Address is too short.";
      return "";

    case "zipcode":
      if (!trimmed) return "Zipcode is required.";
      if (!/^\d{6}$/.test(trimmed)) return "Enter a valid 6-digit zipcode.";
      return "";

    case "websiteUrl":
    case "instagramUrl":
    case "facebookUrl":
    case "youtubeUrl":
    case "linkedinUrl":
    case "googleBusinessUrl":
      if (trimmed && !isValidUrl(trimmed)) return "Enter a valid URL.";
      return "";

    case "startingPrice":
      if (!trimmed) return "Starting price is required.";
      if (Number(trimmed) <= 0) return "Starting price must be greater than 0.";
      return "";

    case "pricingUnit":
      if (!trimmed) return "Pricing unit is required.";
      if (trimmed.length < 2) return "Pricing unit is too short.";
      return "";

    case "categoryId":
      if (!trimmed) return "Please select a category.";
      return "";

    case "cityId":
      if (!trimmed) return "Please select a city.";
      return "";

    case "latitude":
      if (trimmed && Number.isNaN(Number(trimmed))) return "Latitude must be a number.";
      return "";

    case "longitude":
      if (trimmed && Number.isNaN(Number(trimmed))) return "Longitude must be a number.";
      return "";

    default:
      return "";
  }
}

export default function VendorForm({
  initialVendor,
}: {
  initialVendor?: any;
}) {
  const isEditMode = !!initialVendor;

  const [categories, setCategories] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [onboardingConfig, setOnboardingConfig] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Errors>({});

  const [vendorData, setVendorData] = useState<VendorFormValues>({
    ...blankVendor,
    ...(initialVendor
      ? {
          name: initialVendor.name || "",
          description: initialVendor.description || "",
          phone: initialVendor.phone || "",
          whatsapp: initialVendor.whatsapp || "",
          imageUrl: initialVendor.imageUrl || "",
          address: initialVendor.address || "",
          zipcode: initialVendor.zipcode || "",
          websiteUrl: initialVendor.websiteUrl || "",
          instagramUrl: initialVendor.instagramUrl || "",
          facebookUrl: initialVendor.facebookUrl || "",
          youtubeUrl: initialVendor.youtubeUrl || "",
          linkedinUrl: initialVendor.linkedinUrl || "",
          googleBusinessUrl: initialVendor.googleBusinessUrl || "",
          startingPrice: initialVendor.startingPrice?.toString?.() || "",
          pricingUnit: initialVendor.pricingUnit || "",
          categoryId: initialVendor.categoryId?.toString?.() || "",
          cityId: initialVendor.cityId?.toString?.() || "",
          latitude: initialVendor.latitude?.toString?.() || "",
          longitude: initialVendor.longitude?.toString?.() || "",
        }
      : {}),
  });

  const [statsData, setStatsData] = useState<any[]>(
    initialVendor?.stats?.map((stat: any) => ({
      templateId: stat.templateId,
      value: stat.value,
    })) || []
  );

  const [selectedAmenities, setSelectedAmenities] = useState<number[]>(
    initialVendor?.amenities?.map((item: any) => item.amenityId) || []
  );

  const [packagesData, setPackagesData] = useState<any[]>(
    initialVendor?.packages?.map((pkg: any) => ({
      packageTemplateId: pkg.packageTemplateId,
      price: pkg.price,
      features: pkg.features?.map((f: any) => f.featureId) || [],
    })) || []
  );

  useEffect(() => {
    async function loadCategories() {
      const res = await fetch("http://localhost:5000/categories");
      const data = await res.json();
      setCategories(data || []);
    }

    async function loadCities() {
      const res = await fetch("http://localhost:5000/cities");
      const data = await res.json();
      setCities(data || []);
    }

    loadCategories();
    loadCities();
  }, []);

  useEffect(() => {
    const categoryId = vendorData.categoryId;
    if (!categoryId) return;

    async function loadOnboardingConfig() {
      const res = await fetch(
        `http://localhost:5000/categories/${categoryId}/onboarding-config`
      );
      const data = await res.json();
      setOnboardingConfig(data);
    }

    loadOnboardingConfig();
  }, [vendorData.categoryId]);

  function updateField(field: keyof VendorFormValues, value: string) {
    let nextValue = value;

    if (field === "phone" || field === "whatsapp") {
      nextValue = onlyDigits(value);
    }

    if (field === "startingPrice") {
      nextValue = value.replace(/[^\d]/g, "");
    }

    setVendorData((prev) => ({
      ...prev,
      [field]: nextValue,
    }));

    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, nextValue, { isEditMode }),
      }));
    }
  }

  function markTouched(fields: (keyof VendorFormValues)[]) {
    const next = { ...touched };
    for (const field of fields) next[field] = true;
    setTouched(next);
  }

  function updateStat(templateId: number, value: string) {
    setStatsData((previous) => {
      const existing = previous.find((s) => s.templateId === templateId);
      if (existing) {
        return previous.map((s) =>
          s.templateId === templateId ? { ...s, value } : s
        );
      }
      return [...previous, { templateId, value }];
    });
  }

  function toggleAmenity(amenityId: number) {
    setSelectedAmenities((previous) =>
      previous.includes(amenityId)
        ? previous.filter((id) => id !== amenityId)
        : [...previous, amenityId]
    );
  }

  function updatePackagePrice(packageTemplateId: number, price: string) {
    setPackagesData((previous) => {
      const existing = previous.find(
        (pkg) => pkg.packageTemplateId === packageTemplateId
      );

      if (existing) {
        return previous.map((pkg) =>
          pkg.packageTemplateId === packageTemplateId ? { ...pkg, price } : pkg
        );
      }

      return [...previous, { packageTemplateId, price, features: [] }];
    });
  }

  function togglePackageFeature(packageTemplateId: number, featureId: number) {
    setPackagesData((previous) => {
      const packageData = previous.find(
        (pkg) => pkg.packageTemplateId === packageTemplateId
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

      const featureExists = packageData.features.includes(featureId);

      return previous.map((pkg) => {
        if (pkg.packageTemplateId !== packageTemplateId) return pkg;
        return {
          ...pkg,
          features: featureExists
            ? pkg.features.filter((id: number) => id !== featureId)
            : [...pkg.features, featureId],
        };
      });
    });
  }

  const completion = useMemo(() => {
    let score = 0;
    if (vendorData.name) score += 10;
    if (vendorData.description) score += 15;
    if (vendorData.phone) score += 10;
    if (vendorData.whatsapp) score += 10;
    if (vendorData.imageUrl) score += 15;
    if (vendorData.address) score += 10;
    if (vendorData.zipcode) score += 5;
    if (vendorData.categoryId) score += 5;
    if (vendorData.cityId) score += 5;
    if (selectedAmenities.length > 0) score += 5;
    if (packagesData.length > 0) score += 5;
    return Math.min(score, 100);
  }, [vendorData, selectedAmenities.length, packagesData.length]);

  function validateStep(currentStep: number) {
    const nextErrors: Errors = {};

    const push = (field: keyof VendorFormValues) => {
      const error = validateField(field, vendorData[field], { isEditMode });
      if (error) nextErrors[field] = error;
    };

    if (currentStep === 1) {
      ["name", "description", "phone", "whatsapp", "imageUrl"].forEach((f) =>
        push(f as keyof VendorFormValues)
      );
    }

    if (currentStep === 2) {
      ["categoryId", "cityId", "address", "zipcode"].forEach((f) =>
        push(f as keyof VendorFormValues)
      );
      push("latitude");
      push("longitude");
    }

    if (currentStep === 3) {
      ["startingPrice", "pricingUnit"].forEach((f) =>
        push(f as keyof VendorFormValues)
      );
    }

    if (currentStep === 6) {
      ["websiteUrl", "instagramUrl", "facebookUrl", "youtubeUrl", "linkedinUrl", "googleBusinessUrl"].forEach((f) =>
        push(f as keyof VendorFormValues)
      );
    }

    if (currentStep === 4 && onboardingConfig?.stats?.length) {
      const hasAnyStat = onboardingConfig.stats.some((stat: any) =>
        statsData.find((s) => s.templateId === stat.id && String(s.value || "").trim())
      );
      if (!hasAnyStat) {
        nextErrors.stats = "Add at least one stat.";
      }
    }

    if (currentStep === 4 && onboardingConfig?.amenities?.length) {
      if (selectedAmenities.length === 0) {
        nextErrors.amenities = "Select at least one amenity.";
      }
    }

    if (currentStep === 5 && onboardingConfig?.packageTemplates?.length) {
      if (packagesData.length === 0) {
        nextErrors.packages = "Add at least one package.";
      }
    }

    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  }

  async function createVendor() {
    const fields: (keyof VendorFormValues)[] = [
      "name",
      "description",
      "phone",
      "whatsapp",
      "imageUrl",
      "address",
      "zipcode",
      "websiteUrl",
      "instagramUrl",
      "facebookUrl",
      "youtubeUrl",
      "linkedinUrl",
      "googleBusinessUrl",
      "startingPrice",
      "pricingUnit",
      "categoryId",
      "cityId",
      "latitude",
      "longitude",
    ];

    markTouched(fields);

    const allErrors: Errors = {};
    for (const field of fields) {
      const err = validateField(field, vendorData[field], { isEditMode });
      if (err) allErrors[field] = err;
    }

    if (onboardingConfig?.stats?.length && statsData.length === 0) {
      allErrors.stats = "Add at least one stat.";
    }
    if (onboardingConfig?.amenities?.length && selectedAmenities.length === 0) {
      allErrors.amenities = "Select at least one amenity.";
    }
    if (onboardingConfig?.packageTemplates?.length && packagesData.length === 0) {
      allErrors.packages = "Add at least one package.";
    }

    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) return;

    setLoading(true);

    const payload = {
      ...vendorData,
      startingPrice: vendorData.startingPrice ? Number(vendorData.startingPrice) : null,
      latitude: vendorData.latitude ? Number(vendorData.latitude) : null,
      longitude: vendorData.longitude ? Number(vendorData.longitude) : null,
      stats: statsData,
      amenities: selectedAmenities,
      packages: packagesData,
    };

    const url = isEditMode
      ? `http://localhost:5000/vendors/${initialVendor.id}`
      : "http://localhost:5000/vendors";

    const method = isEditMode ? "PUT" : "POST";
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert(isEditMode ? "Business updated successfully" : "Business submitted successfully");
      window.location.href = "/vendor-dashboard";
    } finally {
      setLoading(false);
    }
  }

  const stepLabels = [
    "Business",
    "Location",
    "Pricing",
    "Stats",
    "Packages",
    "Social",
    "Review",
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
      <aside className="rounded-[28px] border border-gray-100 bg-[#fffaf6] p-5 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
            Listing Progress
          </p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">{completion}% Complete</h3>
          <div className="mt-4 h-3 rounded-full bg-white">
            <div className="h-3 rounded-full bg-orange-500" style={{ width: `${completion}%` }} />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          {stepLabels.map((label, index) => {
            const active = step === index + 1;
            const done = step > index + 1;
            return (
              <button
                type="button"
                key={label}
                onClick={() => setStep(index + 1)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  active
                    ? "bg-orange-50 text-orange-600"
                    : done
                      ? "bg-white text-gray-700"
                      : "text-gray-500 hover:bg-white"
                }`}
              >
                <span className="text-lg">{done ? "✅" : active ? "🟠" : "⬜"}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-[24px] border border-orange-100 bg-white p-4">
          <p className="text-sm font-semibold text-gray-900">Need to improve completion?</p>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Add images, packages, and social links to rank better.
          </p>
        </div>
      </aside>

      <div className="rounded-[32px] border border-gray-100 bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm text-gray-500">{isEditMode ? "Update Business" : "Create Business"}</p>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditMode ? "Edit Listing" : "List Your Business"}
            </h1>
          </div>

          <div className="rounded-2xl bg-[#fff7f0] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">Completion</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{completion}%</p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            createVendor();
          }}
          className="mt-6 space-y-6"
        >
          {step === 1 && (
            <section className="rounded-[28px] border border-gray-100 bg-[#fffdfb] p-5">
              <h2 className="text-xl font-bold text-gray-900">Business Information</h2>
              <p className="mt-1 text-sm text-gray-500">Tell customers who you are.</p>

              <div className="mt-5 grid gap-4">
                {[
                  ["name", "Business Name", "text"],
                  ["description", "Description", "textarea"],
                  ["phone", "Phone", "text"],
                  ["whatsapp", "WhatsApp", "text"],
                  ["imageUrl", "Image URL", "text"],
                ].map(([field, label, type]) => {
                  const key = field as keyof VendorFormValues;
                  return (
                    <div key={field}>
                      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
                      {type === "textarea" ? (
                        <textarea
                          rows={5}
                          value={vendorData[key]}
                          onChange={(e) => updateField(key, e.target.value)}
                          onBlur={() => setTouched((p) => ({ ...p, [key]: true }))}
                          className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none ${
                            touched[key] && errors[key] ? "border-red-300" : "border-gray-200"
                          }`}
                        />
                      ) : (
                        <input
                          type="text"
                          value={vendorData[key]}
                          onChange={(e) => updateField(key, e.target.value)}
                          onBlur={() => setTouched((p) => ({ ...p, [key]: true }))}
                          className={`h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none ${
                            touched[key] && errors[key] ? "border-red-300" : "border-gray-200"
                          }`}
                        />
                      )}
                      {touched[key] && errors[key] && (
                        <p className="mt-2 text-xs text-red-500">{errors[key]}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="rounded-[28px] border border-gray-100 bg-[#fffdfb] p-5">
              <h2 className="text-xl font-bold text-gray-900">Location</h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={vendorData.categoryId}
                    onChange={(e) => updateField("categoryId", e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, categoryId: true }))}
                    className={`h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none ${
                      touched.categoryId && errors.categoryId ? "border-red-300" : "border-gray-200"
                    }`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {touched.categoryId && errors.categoryId && (
                    <p className="mt-2 text-xs text-red-500">{errors.categoryId}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">City</label>
                  <select
                    value={vendorData.cityId}
                    onChange={(e) => updateField("cityId", e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, cityId: true }))}
                    className={`h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none ${
                      touched.cityId && errors.cityId ? "border-red-300" : "border-gray-200"
                    }`}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {touched.cityId && errors.cityId && (
                    <p className="mt-2 text-xs text-red-500">{errors.cityId}</p>
                  )}
                </div>

                {(["address", "zipcode", "latitude", "longitude"] as (keyof VendorFormValues)[]).map(
                  (field) => (
                    <div key={field} className={field === "address" ? "md:col-span-2" : ""}>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {field === "zipcode"
                          ? "Zipcode"
                          : field === "latitude"
                            ? "Latitude"
                            : field === "longitude"
                              ? "Longitude"
                              : "Address"}
                      </label>
                      <input
                        value={vendorData[field]}
                        onChange={(e) => updateField(field, e.target.value)}
                        onBlur={() => setTouched((p) => ({ ...p, [field]: true }))}
                        className={`h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none ${
                          touched[field] && errors[field] ? "border-red-300" : "border-gray-200"
                        }`}
                      />
                      {touched[field] && errors[field] && (
                        <p className="mt-2 text-xs text-red-500">{errors[field]}</p>
                      )}
                    </div>
                  )
                )}
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="rounded-[28px] border border-gray-100 bg-[#fffdfb] p-5">
              <h2 className="text-xl font-bold text-gray-900">Pricing</h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Starting Price</label>
                  <input
                    value={vendorData.startingPrice}
                    onChange={(e) => updateField("startingPrice", e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, startingPrice: true }))}
                    className={`h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none ${
                      touched.startingPrice && errors.startingPrice ? "border-red-300" : "border-gray-200"
                    }`}
                  />
                  {touched.startingPrice && errors.startingPrice && (
                    <p className="mt-2 text-xs text-red-500">{errors.startingPrice}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Pricing Unit</label>
                  <input
                    value={vendorData.pricingUnit}
                    onChange={(e) => updateField("pricingUnit", e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, pricingUnit: true }))}
                    className={`h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none ${
                      touched.pricingUnit && errors.pricingUnit ? "border-red-300" : "border-gray-200"
                    }`}
                  />
                  {touched.pricingUnit && errors.pricingUnit && (
                    <p className="mt-2 text-xs text-red-500">{errors.pricingUnit}</p>
                  )}
                </div>
              </div>
            </section>
          )}

          {step === 4 && (
            <section className="rounded-[28px] border border-gray-100 bg-[#fffdfb] p-5">
              <h2 className="text-xl font-bold text-gray-900">Stats & Amenities</h2>

              <div className="mt-5 grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Stats</h3>
                  <div className="mt-4 space-y-4">
                    {onboardingConfig?.stats?.map((stat: any) => (
                      <div key={stat.id}>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          {stat.label}
                        </label>
                        <input
                          value={statsData.find((s) => s.templateId === stat.id)?.value || ""}
                          onChange={(e) => updateStat(stat.id, e.target.value)}
                          className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none"
                        />
                      </div>
                    ))}
                    {errors.stats && <p className="text-xs text-red-500">{errors.stats}</p>}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Amenities</h3>
                  <div className="mt-4 grid grid-cols-1 gap-3">
                    {onboardingConfig?.amenities?.map((item: any) => (
                      <label
                        key={item.id}
                        className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4"
                      >
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(item.id)}
                          onChange={() => toggleAmenity(item.id)}
                        />
                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      </label>
                    ))}
                    {errors.amenities && <p className="text-xs text-red-500">{errors.amenities}</p>}
                  </div>
                </div>
              </div>
            </section>
          )}

          {step === 5 && (
            <section className="rounded-[28px] border border-gray-100 bg-[#fffdfb] p-5">
              <h2 className="text-xl font-bold text-gray-900">Packages</h2>

              <div className="mt-5 grid gap-5">
                {onboardingConfig?.packageTemplates?.map((pkg: any) => (
                  <div key={pkg.id} className="rounded-[24px] border border-gray-100 bg-white p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Package Price
                        </label>
                        <input
                          value={packagesData.find((p) => p.packageTemplateId === pkg.id)?.price || ""}
                          onChange={(e) => updatePackagePrice(pkg.id, e.target.value)}
                          className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <p className="mb-2 text-sm font-medium text-gray-700">Features</p>
                        <div className="grid gap-3 md:grid-cols-2">
                          {onboardingConfig?.packageFeatureTemplates?.map((feature: any) => (
                            <label
                              key={feature.id}
                              className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4"
                            >
                              <input
                                type="checkbox"
                                checked={
                                  packagesData.find((p) => p.packageTemplateId === pkg.id)?.features?.includes(
                                    feature.id
                                  ) || false
                                }
                                onChange={() => togglePackageFeature(pkg.id, feature.id)}
                              />
                              <span className="text-sm text-gray-700">{feature.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {errors.packages && <p className="text-xs text-red-500">{errors.packages}</p>}
              </div>
            </section>
          )}

          {step === 6 && (
            <section className="rounded-[28px] border border-gray-100 bg-[#fffdfb] p-5">
              <h2 className="text-xl font-bold text-gray-900">Social Links</h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  ["websiteUrl", "Website URL"],
                  ["instagramUrl", "Instagram URL"],
                  ["facebookUrl", "Facebook URL"],
                  ["youtubeUrl", "YouTube URL"],
                  ["linkedinUrl", "LinkedIn URL"],
                  ["googleBusinessUrl", "Google Business URL"],
                ].map(([field, label]) => {
                  const key = field as keyof VendorFormValues;
                  return (
                    <div key={field}>
                      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
                      <input
                        value={vendorData[key]}
                        onChange={(e) => updateField(key, e.target.value)}
                        onBlur={() => setTouched((p) => ({ ...p, [key]: true }))}
                        className={`h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none ${
                          touched[key] && errors[key] ? "border-red-300" : "border-gray-200"
                        }`}
                      />
                      {touched[key] && errors[key] && (
                        <p className="mt-2 text-xs text-red-500">{errors[key]}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {step === 7 && (
            <section className="rounded-[28px] border border-gray-100 bg-[#fffdfb] p-5">
              <h2 className="text-xl font-bold text-gray-900">Review Listing</h2>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {[
                  ["Name", vendorData.name],
                  ["Description", vendorData.description],
                  ["Phone", vendorData.phone],
                  ["WhatsApp", vendorData.whatsapp],
                  ["Starting Price", vendorData.startingPrice],
                  ["Pricing Unit", vendorData.pricingUnit],
                  ["Category", categories.find((c) => String(c.id) === vendorData.categoryId)?.name || ""],
                  ["City", cities.find((c) => String(c.id) === vendorData.cityId)?.name || ""],
                  ["Amenities Selected", String(selectedAmenities.length)],
                  ["Packages Added", String(packagesData.length)],
                  ["Completion", `${completion}%`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-gray-100 bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400">{label}</p>
                    <p className="mt-2 text-sm font-semibold text-gray-900">{value || "—"}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 disabled:opacity-50"
            >
              Back
            </button>

            <div className="text-sm text-gray-500">Step {step} of 7</div>

            {step < 7 ? (
              <button
                type="button"
                onClick={() => {
                  if (validateStep(step)) setStep((s) => Math.min(7, s + 1));
                }}
                className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm disabled:opacity-70"
              >
                {loading
                  ? "Saving..."
                  : isEditMode
                    ? "Update Business"
                    : "Submit Business"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}