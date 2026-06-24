import Link from "next/link";

function getCityGradient(slug?: string) {
  switch (slug) {
    case "jaipur":
      return "from-rose-400 via-orange-300 to-amber-200";
    case "udaipur":
      return "from-sky-400 via-blue-300 to-indigo-300";
    case "jodhpur":
      return "from-orange-500 via-amber-400 to-yellow-200";
    case "ajmer":
      return "from-emerald-400 via-teal-300 to-cyan-200";
    default:
      return "from-orange-400 via-orange-300 to-amber-200";
  }
}

export default function CityCard({
  city,
  count = 0,
}: {
  city: any;
  count?: number;
}) {
  return (
    <Link
      href={`/city/${city.slug}`}
      className="group relative overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div
        className={`flex h-44 items-end bg-gradient-to-br ${getCityGradient(
          city.slug
        )} p-4`}
      >
        <div className="w-full rounded-[20px] bg-black/40 p-4 text-white backdrop-blur-sm">
          <div className="text-2xl font-bold">{city.name}</div>
          <div className="mt-1 text-sm text-white/90">
            {city.state}
          </div>
          <div className="mt-2 text-xs text-white/80">
            {count} vendors
          </div>
        </div>
      </div>
    </Link>
  );
}