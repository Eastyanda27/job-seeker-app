import React from "react";
import { NavLink } from "react-router-dom";
import { MENU_LINKS, isNavVisible, type NavItem } from "./sidebar-constant";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  collapsed: boolean;
  setCollapsed?: (collapsed: boolean) => void;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const { user } = useAuth();
  const role = user?.role;

  const filteredNavItems = MENU_LINKS.filter((item) => isNavVisible(item, role));

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 shell:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Drawer Sidebar */}
      <aside
        className={`
        fixed shell:hidden z-40 h-full flex flex-col bg-[#0D1B2E] transition-transform duration-300 w-64
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="h-16 flex items-center px-5 border-b border-white/10 shrink-0 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg">
              IK
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-bold leading-tight">IndoKerja</p>
              <p className="text-[#4E8FD9] text-xs">Job Seeker Platform</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-3 pt-2 pb-5 space-y-0.5">
          {filteredNavItems.map((item, idx) =>
            item.type === "section" ? (
              <div key={`section-mobile-${idx}`} className="flex items-center gap-2 px-3 my-3">
                <span className="text-[#3D5A7A] text-[10px] font-semibold uppercase tracking-widest">
                  {item.label}
                </span>
                <span className="flex-1 h-px bg-[#3D5A7A]/40" />
              </div>
            ) : (
              <NavLink
                key={`item-mobile-${idx}`}
                to={item.path || "#"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#1F5AA6] text-white"
                      : "text-[#7A9BBE] hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {item.icon && <item.icon className="w-5 h-5 shrink-0" />}
                <span>{item.label}</span>
              </NavLink>
            )
          )}
        </div>
        <div className="p-4 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-2 px-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <p className="text-[#3D5A7A] text-xs">System Online</p>
            <span className="ml-auto text-[#3D5A7A] text-xs">v1.0</span>
          </div>
        </div>
      </aside>

      {/* Desktop Persistent Sidebar */}
      <aside
        className={`
        hidden shell:fixed shell:inset-y-0 shell:left-0 shell:flex z-30 h-dvh flex-col bg-[#0D1B2E] transition-all duration-300 shrink-0
        ${collapsed ? "w-17" : "w-64"}
      `}
      >
        <div className="h-16 flex items-center px-5 border-b border-white/10 shrink-0 justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg shrink-0">
              IK
            </div>
            {!collapsed && (
              <div className="min-w-0 transition-opacity duration-200">
                <p className="text-white text-sm font-bold leading-tight truncate">IndoKerja</p>
                <p className="text-[#4E8FD9] text-xs truncate">Job Seeker</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pt-2 pb-5 space-y-0.5">
          {filteredNavItems.map((item, idx) =>
            item.type === "section" ? (
              !collapsed && (
                <div key={`section-desk-${idx}`} className="flex items-center gap-2 px-3 my-3">
                  <span className="text-[#3D5A7A] text-[10px] font-semibold uppercase tracking-widest truncate">
                    {item.label}
                  </span>
                  <span className="flex-1 h-px bg-[#3D5A7A]/40" />
                </div>
              )
            ) : (
              <NavLink
                key={`item-desk-${idx}`}
                to={item.path || "#"}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#1F5AA6] text-white"
                      : "text-[#7A9BBE] hover:text-white hover:bg-white/5"
                  } ${collapsed ? "justify-center px-0" : ""}`
                }
              >
                {item.icon && <item.icon className="w-5 h-5 shrink-0" />}
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            )
          )}
        </div>

        <div className="p-4 border-t border-white/10 shrink-0">
          <div className={`flex items-center gap-2 ${collapsed ? "justify-center" : "px-3"}`}>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
            {!collapsed && <p className="text-[#3D5A7A] text-xs truncate">System Online</p>}
          </div>
        </div>
      </aside>
    </>
  );
}