export default function VendorStats({
  stats,
}: {
  stats: any[];
}) {
  if (!stats?.length) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

      {stats.map((stat) => (

        <div
          key={stat.id}
          className="bg-white border rounded-xl p-4 text-center"
        >
          <div className="text-2xl mb-2">
            {stat.template.icon}
          </div>

          <div className="text-2xl font-bold text-orange-500">
            {stat.value}
          </div>

          <div className="text-sm text-gray-600">
            {stat.template.label}
          </div>

        </div>

      ))}
    </div>
  );
}