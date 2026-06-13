"use client";

import { useEffect, useState } from "react";

export default function Header() {

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (storedUser) {

      setUser(
        JSON.parse(
          storedUser
        )
      );

    }

  }, []);

  function logout() {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
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

          Welcome{" "}
          {user.phone}

          {" | "}
          <a href="/vendor-dashboard">
  Vendor Dashboard
</a> {" | "}

          
      <a href="/saved-vendors">
  Saved Vendors
</a>

{" | "} <a href="/list-my-business">
  List My Business
</a> {" | "}


          <button
            onClick={logout}
          >
            Logout
          </button>

        </div>

      ) : (

        <a href="/login">
          Login
        </a>

      )}


    </div>

  );

}