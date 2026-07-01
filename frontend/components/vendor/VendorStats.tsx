export default function VendorStats({
  stats,
}: {
  stats: any[];
}) {
  if (!stats?.length) return null;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.id ?? stat.templateId ?? stat.template?.label}
          className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm"
        >
          <div className="mb-2 text-2xl">
            {stat.template?.icon || "•"}
          </div>

          <div className="text-3xl font-bold text-orange-500">
            {stat.value}
          </div>

          <div className="mt-1 text-sm text-gray-500">
            {stat.template?.label}
          </div>
        </div>
      ))}
    </div>
  );
}