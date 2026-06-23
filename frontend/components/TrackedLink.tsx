"use client";

export default function TrackedLink({
  href,
  vendorId,
  eventType,
  children,
}: any) {
  const isExternal = /^https?:\/\//i.test(href) || href.startsWith("mailto:");

  async function handleClick() {
    try {
      await fetch(
        `http://localhost:5000/vendors/${vendorId}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventType,
          }),
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}