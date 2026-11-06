import { BriefcaseBusiness, FileCheck2, LayoutDashboard, Search, Settings, UserRound, UsersRound } from "lucide-react";
import type { ComponentType } from "react";
import type { UserRole } from "@/types/auth";

export type NavIcon = ComponentType<{ className?: string }>;
export type NavItem = { label: string; path?: string; icon?: NavIcon; roles?: UserRole[]; type?: "section" };

export const MENU_LINKS: NavItem[] = [
  { label: "Main Menu", type: "section" },
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, roles: ["JOB_SEEKER"] },
  { label: "Cari Lowongan", path: "/", icon: Search },
  { label: "Lamaran Saya", path: "/applications", icon: FileCheck2, roles: ["JOB_SEEKER"] },
  { label: "Lowongan Saya", path: "/company/jobs", icon: BriefcaseBusiness, roles: ["COMPANY"] },
  { label: "Pelamar", path: "/company/applicants", icon: UsersRound, roles: ["COMPANY"] },
  { label: "Account", type: "section" },
  { label: "Profil Saya", path: "/profile", icon: UserRound },
  { label: "Pengaturan", path: "/settings", icon: Settings },
];

export const isNavVisible = (item: NavItem, role?: UserRole) => !item.roles || (!!role && item.roles.includes(role));
