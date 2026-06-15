"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] =
    useState<any>(null);

  const [hasVendor, setHasVendor] =
    useState(false);

  useEffect(() => {
    const storedUser =
      localStorage.getItem(
        "user"
      );

    const vendorFlag =
      localStorage.getItem(
        "hasVendor"
      );

    if (storedUser) {
      setUser(
        JSON.parse(
          storedUser
        )
      );
    }

    setHasVendor(
      vendorFlag === "true"
    );
  }, []);

  function logout() {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "hasVendor"
    );

    window.location.reload();
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        padding: "20px",
        borderBottom:
          "1px solid #ddd",
      }}
    >
      <h3>
        AB Milega
      </h3>

      {user ? (
        <div>
          Welcome {user.phone}

          {" | "}

          {hasVendor && (
            <>
              <a href="/vendor-dashboard">
                Vendor Dashboard
              </a>

              {" | "}
            </>
          )}

          <a href="/saved-vendors">
            Saved Vendors
          </a>

          {" | "}

          <a href="/list-my-business">
            List My Business
          </a>

          {" | "}

          <button
            onClick={logout}
          >
            Logout
          </button>
          {
  user?.role === "ADMIN" && (

    <>
      {" | "}
      <a href="/admin/vendors">
        Admin Panel
      </a>
    </>

  )
}
        </div>
      ) : (
        <a href="/login">
          Login
        </a>
      )}

      
    </div>
  );
}