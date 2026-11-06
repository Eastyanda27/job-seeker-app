import type { ReactNode } from "react";
import { Building2, FileText, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { AppLayout } from "@/components/layouts/app-layout";
import ProtectedRoute from "@/components/auth/protected-route";
import TitlePage from "@/components/ui/title-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

function ProfileField({ icon, label, value }: { icon: ReactNode; label: string; value?: string | null }) {
  return (
    <div className="flex gap-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <div className="mt-0.5 text-primary">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="mt-1 text-sm text-gray-900 dark:text-white break-words">{value || "Belum diisi"}</p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();
  const isCompany = user?.role === "COMPANY";
  const company = user?.companyProfile;
  const seeker = user?.jobSeekerProfile;

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="max-w-3xl space-y-6">
          <TitlePage
            title="Profil Saya"
            subtitle="Informasi akun dan profil Anda."
            icon={<UserRound className="w-7 h-7 text-primary" />}
          />
          <Card>
            <CardHeader><CardTitle>Informasi Akun</CardTitle></CardHeader>
            <CardContent>
              <ProfileField icon={<UserRound className="w-4 h-4" />} label="Nama" value={user?.name} />
              <ProfileField icon={<Mail className="w-4 h-4" />} label="Email" value={user?.email} />
              <ProfileField icon={isCompany ? <Building2 className="w-4 h-4" /> : <UserRound className="w-4 h-4" />} label="Tipe Akun" value={isCompany ? "Perusahaan" : "Pencari Kerja"} />
            </CardContent>
          </Card>
          {isCompany ? (
            <Card>
              <CardHeader><CardTitle>Profil Perusahaan</CardTitle></CardHeader>
              <CardContent>
                <ProfileField icon={<Building2 className="w-4 h-4" />} label="Nama Perusahaan" value={company?.companyName} />
                <ProfileField icon={<MapPin className="w-4 h-4" />} label="Lokasi" value={company?.location} />
                <ProfileField icon={<FileText className="w-4 h-4" />} label="Deskripsi" value={company?.description} />
                <ProfileField icon={<Mail className="w-4 h-4" />} label="Website" value={company?.website} />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader><CardTitle>Profil Pencari Kerja</CardTitle></CardHeader>
              <CardContent>
                <ProfileField icon={<Phone className="w-4 h-4" />} label="Nomor Telepon" value={seeker?.phone} />
                <ProfileField icon={<FileText className="w-4 h-4" />} label="Bio" value={seeker?.bio} />
                <ProfileField icon={<FileText className="w-4 h-4" />} label="Resume" value={seeker?.resumeUrl} />
              </CardContent>
            </Card>
          )}
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
