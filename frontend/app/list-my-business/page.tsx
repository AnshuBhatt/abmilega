"use client";

import { useEffect, useMemo, useState } from "react";

type FormValues = {
  name: string;
  description: string;
  phone: string;
  whatsapp: string;
  categoryId: string;
  cityId: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type TouchedFields = Record<keyof FormValues, boolean>;

const carouselImages = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&q=80&auto=format&fit=crop",
];

const carouselCaptions = [
  {
    title: "Verified vendors",
    text: "Build trust with a verified profile and stronger visibility.",
  },
  {
    title: "More bookings",
    text: "Reach customers searching for wedding and lifestyle services.",
  },
  {
    title: "Easy management",
    text: "Update details, respond faster, and manage leads in one place.",
  },
  {
    title: "Premium presence",
    text: "Look polished with a clean profile and strong imagery.",
  },
  {
    title: "Support that helps",
    text: "Get guidance for setup, visibility, and conversions.",
  },
];

const initialForm: FormValues = {
  name: "",
  description: "",
  phone: "",
  whatsapp: "",
  categoryId: "",
  cityId: "",
};

const initialTouched: TouchedFields = {
  name: false,
  description: false,
  phone: false,
  whatsapp: false,
  categoryId: false,
  cityId: false,
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

function validateField(field: keyof FormValues, value: string) {
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
      if (trimmed.length > 500) return "Description must be 500 characters or less.";
      return "";

    case "phone":
      if (!trimmed) return "Phone number is required.";
      if (!/^\d{10}$/.test(trimmed)) return "Enter a valid 10-digit phone number.";
      return "";

    case "whatsapp":
      if (!trimmed) return "WhatsApp number is required.";
      if (!/^\d{10}$/.test(trimmed)) return "Enter a valid 10-digit WhatsApp number.";
      return "";

    case "categoryId":
      if (!trimmed) return "Please select a category.";
      return "";

    case "cityId":
      if (!trimmed) return "Please select a city.";
      return "";

    default:
      return "";
  }
}

export default function ListMyBusinessPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [formData, setFormData] = useState<FormValues>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>(initialTouched);
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const currentCaption = useMemo(
    () => carouselCaptions[currentSlide],
    [currentSlide]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoryRes, cityRes] = await Promise.all([
          fetch("http://localhost:5000/categories"),
          fetch("http://localhost:5000/cities"),
        ]);

        const [categoryData, cityData] = await Promise.all([
          categoryRes.json(),
          cityRes.json(),
        ]);

        setCategories(categoryData);
        setCities(cityData);
      } finally {
        setLoadingMeta(false);
      }
    };

    loadData();
  }, []);

  function updateField(field: keyof FormValues, value: string) {
    let nextValue = value;

    if (field === "phone" || field === "whatsapp") {
      nextValue = onlyDigits(value);
    }

    if (field === "description") {
      nextValue = value.slice(0, 500);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: nextValue,
    }));

    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, nextValue),
      }));
    }
  }

  function handleBlur(field: keyof FormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData[field]),
    }));
  }

  function validateAll(values: FormValues) {
    const nextErrors: FormErrors = {};

    (Object.keys(values) as (keyof FormValues)[]).forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) nextErrors[field] = error;
    });

    return nextErrors;
  }

  async function submitBusiness() {
    const nextTouched: TouchedFields = {
      name: true,
      description: true,
      phone: true,
      whatsapp: true,
      categoryId: true,
      cityId: true,
    };

    setTouched(nextTouched);

    const nextErrors = validateAll(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        phone: formData.phone.trim(),
        whatsapp: formData.whatsapp.trim(),
        categoryId: formData.categoryId,
        cityId: formData.cityId,
      };

      const res = await fetch("http://localhost:5000/vendors/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Unable to submit business");
        return;
      }

      alert("Business submitted successfully");
      window.location.href = "/vendor-dashboard";
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const benefits = [
    {
      icon: "🎯",
      title: "Get Discovered",
      text: "Reach thousands of potential customers in your city.",
    },
    {
      icon: "🛡️",
      title: "Build Credibility",
      text: "Verified badge builds trust and confidence.",
    },
    {
      icon: "📈",
      title: "More Inquiries",
      text: "Receive more leads and grow your business.",
    },
    {
      icon: "⚙️",
      title: "Easy to Manage",
      text: "Update details, photos and services anytime.",
    },
    {
      icon: "🎧",
      title: "24/7 Support",
      text: "Our team is always here to help you.",
    },
  ];

  const supportItems = [
    {
      icon: "📞",
      label: "+91 1234567890",
    },
    {
      icon: "✉️",
      label: "support@abmilega.com",
    },
  ];

  const trustStats = [
    {
      value: "10K+",
      label: "Verified Vendors",
    },
    {
      value: "50K+",
      label: "Monthly Inquiries",
    },
    {
      value: "200K+",
      label: "Happy Customers",
    },
    {
      value: "100+",
      label: "Cities Covered",
    },
  ];

  return (
    <div className="bg-[#faf7f4]">
      <div className="mx-auto max-w-[1500px] px-4 py-8 md:px-6">
        <section className="relative overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.05)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,140,80,0.14),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(255,200,160,0.12),_transparent_35%)]" />
          <div className="relative grid min-h-[310px] grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[310px] overflow-hidden lg:min-h-[330px]">
              <img
                src={carouselImages[currentSlide]}
                alt="Vendor registration banner"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#fff7f0] via-[#fff7f0]/88 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />

              <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10">
                <div className="max-w-[560px]">
                  <span className="inline-flex rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-orange-500 shadow-sm">
                    Join AbMilega
                  </span>

                  <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
                    Grow Your Business with{" "}
                    <span className="text-orange-500">AbMilega</span>
                  </h1>

                  <p className="mt-5 max-w-xl text-base leading-7 text-gray-700 md:text-lg">
                    Get discovered by thousands of customers looking for the best vendors
                    for their special events.
                  </p>

                  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {benefits.slice(0, 3).map((item) => (
                      <div
                        key={item.title}
                        className="rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur"
                      >
                        <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-xl">
                          {item.icon}
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-gray-600">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 pt-8">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentSlide === index ? "w-8 bg-orange-500" : "w-2.5 bg-white/80"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setCurrentSlide(
                    (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
                  )
                }
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/95 p-3 text-gray-700 shadow-lg transition hover:scale-105"
                aria-label="Previous slide"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
                }
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/95 p-3 text-gray-700 shadow-lg transition hover:scale-105"
                aria-label="Next slide"
              >
                ›
              </button>

              <div className="absolute bottom-5 left-6 z-20 rounded-full bg-black/55 px-3 py-2 text-xs font-semibold text-white">
                {currentSlide + 1} / {carouselImages.length}
              </div>

              <div className="absolute bottom-5 right-6 z-20 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                {currentCaption.title}
              </div>
            </div>

            <div className="flex items-center justify-center bg-white/95 p-6 md:p-10">
              <div className="w-full max-w-[440px]">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                  <p className="mt-2 text-sm text-gray-500">Login to your account</p>
                </div>

                <div className="mt-8 space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Business Name
                    </label>
                    <input
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      placeholder="Enter your business name"
                      className={`h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none transition focus:border-orange-400 ${
                        errors.name && touched.name ? "border-red-300" : "border-gray-200"
                      }`}
                      aria-invalid={Boolean(errors.name && touched.name)}
                    />
                    {touched.name && errors.name && (
                      <p className="mt-2 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => updateField("description", e.target.value)}
                      onBlur={() => handleBlur("description")}
                      placeholder="Tell us about your business, services and experience..."
                      rows={5}
                      maxLength={500}
                      className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400 ${
                        errors.description && touched.description
                          ? "border-red-300"
                          : "border-gray-200"
                      }`}
                      aria-invalid={Boolean(errors.description && touched.description)}
                    />
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className={`${errors.description && touched.description ? "text-red-500" : "text-gray-400"}`}>
                        {touched.description && errors.description ? errors.description : "Write a short, clear summary of what you offer."}
                      </span>
                      <span className="text-gray-400">{formData.description.length}/500</span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <div
                      className={`flex items-center rounded-2xl border bg-white px-4 py-3 transition focus-within:border-orange-400 ${
                        errors.phone && touched.phone ? "border-red-300" : "border-gray-200"
                      }`}
                    >
                      <span className="mr-3 text-gray-400">📞</span>
                      <input
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        placeholder="Enter your phone number"
                        className="w-full border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                        inputMode="numeric"
                        maxLength={10}
                        aria-invalid={Boolean(errors.phone && touched.phone)}
                      />
                    </div>
                    {touched.phone && errors.phone && (
                      <p className="mt-2 text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      WhatsApp
                    </label>
                    <div
                      className={`flex items-center rounded-2xl border bg-white px-4 py-3 transition focus-within:border-orange-400 ${
                        errors.whatsapp && touched.whatsapp ? "border-red-300" : "border-gray-200"
                      }`}
                    >
                      <span className="mr-3 text-gray-400">💬</span>
                      <input
                        value={formData.whatsapp}
                        onChange={(e) => updateField("whatsapp", e.target.value)}
                        onBlur={() => handleBlur("whatsapp")}
                        placeholder="Enter your WhatsApp number"
                        className="w-full border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                        inputMode="numeric"
                        maxLength={10}
                        aria-invalid={Boolean(errors.whatsapp && touched.whatsapp)}
                      />
                    </div>
                    {touched.whatsapp && errors.whatsapp && (
                      <p className="mt-2 text-xs text-red-500">{errors.whatsapp}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Select Category
                      </label>
                      <select
                        value={formData.categoryId}
                        onChange={(e) => updateField("categoryId", e.target.value)}
                        onBlur={() => handleBlur("categoryId")}
                        className={`h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none ${
                          errors.categoryId && touched.categoryId
                            ? "border-red-300"
                            : "border-gray-200"
                        }`}
                        aria-invalid={Boolean(errors.categoryId && touched.categoryId)}
                        disabled={loadingMeta}
                      >
                        <option value="">
                          {loadingMeta ? "Loading categories..." : "Choose a category"}
                        </option>
                        {categories.map((category: any) => (
                          <option key={category.id} value={String(category.id)}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {touched.categoryId && errors.categoryId && (
                        <p className="mt-2 text-xs text-red-500">{errors.categoryId}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Select City
                      </label>
                      <select
                        value={formData.cityId}
                        onChange={(e) => updateField("cityId", e.target.value)}
                        onBlur={() => handleBlur("cityId")}
                        className={`h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none ${
                          errors.cityId && touched.cityId
                            ? "border-red-300"
                            : "border-gray-200"
                        }`}
                        aria-invalid={Boolean(errors.cityId && touched.cityId)}
                        disabled={loadingMeta}
                      >
                        <option value="">
                          {loadingMeta ? "Loading cities..." : "Choose a city"}
                        </option>
                        {cities.map((city: any) => (
                          <option key={city.id} value={String(city.id)}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                      {touched.cityId && errors.cityId && (
                        <p className="mt-2 text-xs text-red-500">{errors.cityId}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={submitBusiness}
                    disabled={submitting}
                    className="w-full rounded-2xl bg-orange-500 px-4 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? "Submitting..." : "Submit Business"}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    Your listing will be reviewed before it goes live.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.45fr_0.9fr]">
          <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900">Why List Your Business</h3>
            <p className="mt-2 text-sm text-gray-500">
              Better visibility, stronger trust, and more direct enquiries.
            </p>

            <div className="mt-6 space-y-4">
              {benefits.map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-gray-100 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">Need Help?</h3>
              <p className="mt-2 text-sm text-gray-500">Our support team is here to assist you.</p>

              <div className="mt-6 space-y-4">
                {supportItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-gray-100 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-lg">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-6 w-full rounded-2xl border border-orange-200 bg-[#fff7f0] px-4 py-3 text-sm font-semibold text-orange-500 transition hover:bg-orange-50">
                Contact Support
              </button>
            </div>

            <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">How it works</h3>
              <div className="mt-5 space-y-4 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-orange-500">1.</span>
                  <p>Fill in your business details and pick category/city.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-orange-500">2.</span>
                  <p>Submit your listing for review and approval.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-orange-500">3.</span>
                  <p>Start receiving direct calls and WhatsApp enquiries.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">Trusted by 10,000+ Vendors</h3>
            <p className="mt-2 text-sm text-gray-500">
              Join thousands of successful vendors growing their business with AbMilega
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {trustStats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-gray-100 p-5 text-center">
                <div className="text-3xl font-bold text-orange-500">{item.value}</div>
                <div className="mt-1 text-sm text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-6 rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="text-2xl font-bold text-orange-500">AbMilega</div>
              <p className="mt-2 text-sm text-gray-500">Jo Chahiye, Ab Milega</p>
              <p className="mt-4 text-sm leading-6 text-gray-500">
                India&apos;s most trusted platform to discover and connect with the best
                vendors for every special occasion.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">For Vendors</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>List Your Business</li>
                <li>Vendor Dashboard</li>
                <li>Pricing Plans</li>
                <li>Success Stories</li>
                <li>Vendor Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">For Users</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>Search Vendors</li>
                <li>Categories</li>
                <li>Cities</li>
                <li>How It Works</li>
                <li>Help Center</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">Company</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-5 text-sm text-gray-500">
            <span>📘</span>
            <span>📷</span>
            <span>🔗</span>
            <span>▶</span>
          </div>
        </footer>
      </div>
    </div>
  );
}