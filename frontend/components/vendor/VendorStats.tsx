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
  className="
    bg-white
    border
    rounded-2xl
    p-5
    text-center
    shadow-sm
"
>
  <div className="text-2xl mb-2">
    {stat.template.icon}
  </div>

  <div className="text-3xl font-bold text-orange-500">
    {stat.value}
  </div>

  <div className="text-sm text-gray-500 mt-1">
    {stat.template.label}
  </div>
</div>

      ))}
    </div>
  );
}