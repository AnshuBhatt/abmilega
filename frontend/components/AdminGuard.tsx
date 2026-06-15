"use client";

import { useEffect, useState } from "react";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {

  const [authorized,
    setAuthorized] =
    useState(false);

  useEffect(() => {

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        ) || "{}"
      );

    if (
      user.role === "ADMIN"
    ) {

      setAuthorized(
        true
      );

    } else {

      window.location.href =
        "/";

    }

  }, []);

  if (!authorized) {

    return (
      <div>
        Checking access...
      </div>
    );

  }

  return <>{children}</>;

}