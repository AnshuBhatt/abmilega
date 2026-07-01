"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const carouselImages = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1400&q=80&auto=format&fit=crop",
];

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  async function sendOtp() {
    setError("");

    if (!phone.trim()) {
      setError("Enter a valid phone number.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to send OTP");
        return;
      }

      setOtpSent(true);
    } catch (err) {
      setError("Something went wrong while sending OTP.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp() {
    setError("");

    if (!otp.trim()) {
      setError("Enter OTP.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          otp,
        }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("hasVendor", String(data.hasVendor));
        localStorage.setItem("user", JSON.stringify(data.user));

        router.push("/");
        router.refresh();
        return;
      }

      setError(data.message || "Login failed.");
    } catch (err) {
      setError("Something went wrong while verifying OTP.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#faf7f4]">
      <div className="mx-auto max-w-[1500px] px-4 py-10">
        <div className="mx-auto max-w-[1180px] rounded-[30px] border border-gray-100 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left panel */}
            <div className="relative min-h-[640px] overflow-hidden bg-[#6a4a2e]">
              <div className="absolute inset-0">
                <img
                  src={carouselImages[currentSlide]}
                  alt="Login banner"
                  className="h-full w-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/25 to-black/45" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white md:p-10">
                <div className="max-w-[420px]">
                  <p className="text-4xl font-extrabold leading-tight md:text-5xl">
                    Your Perfect Event
                  </p>
                  <p className="mt-1 text-4xl font-extrabold leading-tight text-orange-400 md:text-5xl">
                    Starts Here
                  </p>

                  <p className="mt-6 max-w-md text-base leading-7 text-white/90 md:text-lg">
                    Discover verified vendors, compare options, and plan your dream event with ease.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-white/90">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">🛡️</span>
                    <div>
                      <p className="font-semibold">100% Verified Vendors</p>
                      <p className="text-white/75">All vendors are verified & trusted</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-white/90">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">🔖</span>
                    <div>
                      <p className="font-semibold">No Hidden Charges</p>
                      <p className="text-white/75">Contact vendors directly</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-white/90">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">🎧</span>
                    <div>
                      <p className="font-semibold">24/7 Customer Support</p>
                      <p className="text-white/75">We’re here to help you</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentSlide === index ? "w-8 bg-orange-400" : "w-2.5 bg-white/80"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div className="flex items-center justify-center bg-white p-6 md:p-10">
              <div className="w-full max-w-[440px]">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                  <p className="mt-2 text-sm text-gray-500">Login to your account</p>
                </div>

                <div className="mt-10 space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-orange-400">
                      <span className="mr-3 text-gray-400">📞</span>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                        inputMode="numeric"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-700">
                        Password / OTP
                      </label>
                      <button
                        type="button"
                        onClick={sendOtp}
                        className="text-sm font-medium text-orange-500 hover:text-orange-600"
                        disabled={loading}
                      >
                        Send OTP
                      </button>
                    </div>

                    <div className="flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-orange-400">
                      <span className="mr-3 text-gray-400">🔒</span>
                      <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter password or OTP"
                        className="w-full border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                        disabled={!otpSent}
                      />
                    </div>

                    {!otpSent && (
                      <p className="mt-2 text-xs text-gray-400">
                        Send OTP first to unlock this field.
                      </p>
                    )}
                  </div>

                  {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={otpSent ? verifyOtp : sendOtp}
                    disabled={loading}
                    className="w-full rounded-2xl bg-orange-500 px-4 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "Please wait..." : otpSent ? "Login" : "Send OTP"}
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-500">
                      or
                    </span>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>

                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                  >
                    <span className="text-lg">🌐</span>
                    Continue with Google
                  </button>

                  <p className="text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <a href="/signup" className="font-semibold text-orange-500 hover:text-orange-600">
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-[1180px] grid-cols-1 gap-4 rounded-[24px] border border-gray-100 bg-white p-5 shadow-sm md:grid-cols-4">
          <div className="flex items-start gap-3 border-r border-gray-100 pr-4 last:border-r-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-xl">
              🛡️
            </div>
            <div>
              <p className="font-semibold text-gray-900">100% Verified Vendors</p>
              <p className="text-sm text-gray-500">All vendors are verified & trusted</p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-r border-gray-100 pr-4 last:border-r-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-xl">
              🔖
            </div>
            <div>
              <p className="font-semibold text-gray-900">No Hidden Charges</p>
              <p className="text-sm text-gray-500">Contact vendors directly</p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-r border-gray-100 pr-4 last:border-r-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-xl">
              🎁
            </div>
            <div>
              <p className="font-semibold text-gray-900">Wide Range of Choices</p>
              <p className="text-sm text-gray-500">Compare and choose the best</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-xl">
              🎧
            </div>
            <div>
              <p className="font-semibold text-gray-900">24/7 Customer Support</p>
              <p className="text-sm text-gray-500">We&apos;re here to help you</p>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center">
          <div className="text-2xl font-bold text-orange-500">AbMilega</div>
          <p className="mt-1 text-sm text-gray-500">Jo Chahiye, Ab Milega</p>
          <p className="mt-3 text-xs text-gray-400">© 2026 AbMilega. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}