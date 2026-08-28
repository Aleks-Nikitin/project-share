export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex-1 bg-[#0B0F17] text-white">{children}</div>
  );
}
