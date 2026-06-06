"use client";

export default function TrackedLink({
  href,
  vendorId,
  eventType,
  children,
}: any) {

  async function handleClick() {

    await fetch(
      `http://localhost:5000/vendors/${vendorId}/events`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          eventType,
        }),
      }
    );

  }

  return (
    <a
      href={href}
      target="_blank"
      onClick={handleClick}
    >
      {children}
    </a>
  );

}