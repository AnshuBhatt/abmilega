"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [phone, setPhone] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  async function sendOtp() {

    const res = await fetch(
      "http://localhost:5000/auth/send-otp",
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          phone,
        }),

      }
    );

    const data =
      await res.json();

    console.log(data);

    alert("OTP Sent");

    setOtpSent(true);

  }

  async function verifyOtp() {

    const res = await fetch(
      "http://localhost:5000/auth/verify-otp",
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          phone,

          otp,

        }),

      }
    );

    const data =
      await res.json();

    console.log(data);

    if (data.token) {

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
  "hasVendor",
  String(data.hasVendor)
);

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

      alert(
        "Login Successful"
      );

      window.location.href = "/";

    } else {

      alert(
        data.message ||
        "Login Failed"
      );

    }

  }

  return (

    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
      }}
    >

      <h1>
        Login
      </h1>

      <input

        placeholder=
          "Phone Number"

        value={phone}

        onChange={(e) =>
          setPhone(
            e.target.value
          )
        }

      />

      <br />
      <br />

      <button
        onClick={sendOtp}
      >
        Send OTP
      </button>

      {otpSent && (

        <>

          <br />
          <br />

          <input

            placeholder="OTP"

            value={otp}

            onChange={(e) =>
              setOtp(
                e.target.value
              )
            }

          />

          <br />
          <br />

          <button
            onClick={
              verifyOtp
            }
          >
            Verify OTP
          </button>

        </>

      )}

    </div>

  );

}