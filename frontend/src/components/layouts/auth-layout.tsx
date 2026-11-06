import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F0F4F8] dark:bg-gray-900 transition-colors">
      {/* Top Navbar */}
      <header className="w-full flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>

      {/* Centered Auth Card */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo & Header */}
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-md">
                IK
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                IndoKerja
              </span>
            </Link>
            {title && (
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-400 dark:text-gray-500">
        &copy; {new Date().getFullYear()} IndoKerja. Seluruh hak cipta dilindungi.
      </footer>
    </div>
  );
}

export default AuthLayout;