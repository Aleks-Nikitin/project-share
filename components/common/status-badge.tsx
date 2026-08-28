import { Badge } from "@/components/ui/badge";
export default function StatusBadge({ status }: { status: string }) {
  switch (status.toLowerCase()) {
    case "approved":
      return (
        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 shadow-none">
          Approved
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 shadow-none">
          Rejected
        </Badge>
      );
    default:
      return (
        <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 shadow-none">
          Pending
        </Badge>
      );
  }
}
