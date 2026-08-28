export default function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-[#0B0F17] border border-zinc-800/80 rounded-xl p-5 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-zinc-400 mb-1">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className="p-3 bg-[#182232] rounded-lg">{icon}</div>
    </div>
  );
}
