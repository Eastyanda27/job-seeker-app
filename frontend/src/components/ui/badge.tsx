import * as React from "react";
import { cn } from "@/utils/cn";
import type { ApplicationStatus } from "@/modules/applications/types/application-types";
import type { JobType } from "@/modules/jobs/types/job-types";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info";
}

const variantStyles: Record<string, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive: "bg-red-500 text-white hover:bg-red-600",
  outline: "border border-border text-foreground hover:bg-accent",
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
  warning: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
  info: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantStyles[variant] || variantStyles.default,
        className
      )}
      {...props}
    />
  );
}

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  switch (status) {
    case "APPLIED":
      return <Badge variant="info">Terkirim</Badge>;
    case "REVIEWING":
      return <Badge variant="warning">Ditinjau</Badge>;
    case "SHORTLISTED":
      return (
        <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
          Shortlist
        </Badge>
      );
    case "ACCEPTED":
      return <Badge variant="success">Diterima</Badge>;
    case "REJECTED":
      return <Badge variant="destructive">Ditolak</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export function JobTypeBadge({ jobType }: { jobType: JobType }) {
  switch (jobType) {
    case "FULL_TIME":
      return (
        <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300 border border-blue-200">
          Full Time
        </Badge>
      );
    case "PART_TIME":
      return (
        <Badge className="bg-teal-50 text-teal-700 dark:bg-teal-950/30 dark:text-teal-300 border border-teal-200">
          Part Time
        </Badge>
      );
    case "REMOTE":
      return (
        <Badge className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300 border border-indigo-200">
          Remote
        </Badge>
      );
    case "CONTRACT":
      return (
        <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300 border border-amber-200">
          Kontrak
        </Badge>
      );
    default:
      return <Badge variant="outline">{jobType}</Badge>;
  }
}

export default Badge;