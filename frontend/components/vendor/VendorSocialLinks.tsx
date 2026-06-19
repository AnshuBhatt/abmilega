export default function VendorSocialLinks({
  vendor,
}: {
  vendor: any;
}) {
    if (
  !vendor.websiteUrl &&
  !vendor.instagramUrl &&
  !vendor.facebookUrl &&
  !vendor.youtubeUrl &&
  !vendor.linkedinUrl
) {
  return null;
}
  return (
    <div className="flex flex-wrap gap-3">

      {vendor.websiteUrl && (
        <a
          href={vendor.websiteUrl}
          target="_blank"
          className="px-4 py-2 border rounded-lg"
        >
          🌐 Website
        </a>
      )}

      {vendor.instagramUrl && (
        <a
          href={vendor.instagramUrl}
          target="_blank"
          className="px-4 py-2 border rounded-lg"
        >
          📸 Instagram
        </a>
      )}

      {vendor.facebookUrl && (
        <a
          href={vendor.facebookUrl}
          target="_blank"
          className="px-4 py-2 border rounded-lg"
        >
          👍 Facebook
        </a>
      )}

      {vendor.youtubeUrl && (
        <a
          href={vendor.youtubeUrl}
          target="_blank"
          className="px-4 py-2 border rounded-lg"
        >
          ▶ YouTube
        </a>
      )}

    </div>
  );
}