import { redirect } from "next/navigation";
import { connection } from "next/server";
import {
  CheckCircle,
  Clock,
  ExternalLink,
  Layers,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import StatCard from "@/components/common/stat-card";
import StatusBadge from "@/components/common/status-badge";
import { getAllProjects } from "@/src/actions/admin-actions";
import AdminActions from "@/components/admin/admin-actions";

export const instant = false;

export default async function AdminPage() {
  await connection();
  let allProjects;

  try {
    allProjects = await getAllProjects();
  } catch {
    redirect("/");
  }

  const total = allProjects.length;
  const pending = allProjects.filter((p) => p.status === "pending").length;
  const approved = allProjects.filter((p) => p.status === "approved").length;
  const rejected = allProjects.filter((p) => p.status === "rejected").length;

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-10 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="mt-2 text-zinc-400">
          Manage platform submissions and project statuses.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={total}
          icon={<Layers className="h-5 w-5 text-blue-500" />}
        />
        <StatCard
          title="Pending"
          value={pending}
          icon={<Clock className="h-5 w-5 text-amber-500" />}
        />
        <StatCard
          title="Approved"
          value={approved}
          icon={<CheckCircle className="h-5 w-5 text-emerald-500" />}
        />
        <StatCard
          title="Rejected"
          value={rejected}
          icon={<XCircle className="h-5 w-5 text-red-500" />}
        />
      </div>

      <div className="space-y-4">
        <h2 className="mb-4 border-b border-zinc-800/80 pb-2 text-xl font-semibold">
          Recent Submissions
        </h2>

        {allProjects.length === 0 ? (
          <p className="text-zinc-500">No projects found.</p>
        ) : (
          allProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between gap-6 rounded-xl border border-zinc-800/80 bg-[#0B0F17] p-5 transition-colors hover:border-zinc-700 lg:flex-row"
            >
              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <StatusBadge status={project.status || "pending"} />
                </div>

                <p className="line-clamp-2 max-w-2xl text-sm text-zinc-400">
                  {project.tagline || project.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                  <span>
                    By:{" "}
                    <span className="text-zinc-300">{project.submittedBy}</span>
                  </span>
                  <span>•</span>
                  <span>
                    Votes:{" "}
                    <span className="font-medium text-emerald-400">
                      {project.voteCount}
                    </span>
                  </span>
                  <span>•</span>
                  <span>
                    Submitted: {project.createdAt?.toLocaleDateString()}
                  </span>

                  <div className="ml-2 flex gap-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex items-center gap-1 text-zinc-400 transition-colors hover:text-white"
                    >
                      <ExternalLink className="h-3 w-3" /> View Page
                    </Link>
                    {project.website_url && (
                      <a
                        href={project.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-zinc-400 transition-colors hover:text-emerald-400"
                      >
                        <ExternalLink className="h-3 w-3" /> Website
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 lg:border-l lg:border-zinc-800/80 lg:pl-6">
                <AdminActions
                  projectId={project.id}
                  status={project.status || "pending"}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
