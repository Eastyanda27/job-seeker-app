import { Settings as SettingsIcon, UserRound } from "lucide-react";
import { AppLayout } from "@/components/layouts/app-layout";
import ProtectedRoute from "@/components/auth/protected-route";
import TitlePage from "@/components/ui/title-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="max-w-3xl space-y-6">
          <TitlePage title="Pengaturan" subtitle="Sesuaikan pengalaman penggunaan aplikasi Anda." icon={<SettingsIcon className="w-7 h-7 text-primary" />} />
          <Card>
            <CardHeader><CardTitle>Preferensi Tampilan</CardTitle></CardHeader>
            <CardContent>
              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <span>
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">Mode Gelap</span>
                  <span className="block text-xs text-gray-500 mt-1">Gunakan tema gelap untuk tampilan yang lebih nyaman.</span>
                </span>
                <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} className="h-5 w-5 accent-primary" />
              </label>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Status Akun</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <UserRound className="w-5 h-5 text-primary" /> {user?.email} · {user?.role === "COMPANY" ? "Perusahaan" : "Pencari Kerja"}
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
