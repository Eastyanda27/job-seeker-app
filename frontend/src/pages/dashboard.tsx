import { Link } from "react-router-dom";
import { Briefcase, CheckCircle2, Clock, FileText, XCircle, ArrowRight, LoaderCircle } from "lucide-react";
import { AppLayout } from "@/components/layouts/app-layout";
import ProtectedRoute from "@/components/auth/protected-route";
import TitlePage from "@/components/ui/title-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useMyApplications } from "@/modules/applications/hooks/use-applications";
import { formatDate } from "@/utils/format";

export default function JobSeekerDashboardPage() {
  const { user } = useAuth();
  const { data: applications = [], isLoading } = useMyApplications();

  const total = applications.length;
  const inReview = applications.filter((a) => a.status === "REVIEWING" || a.status === "APPLIED").length;
  const shortlisted = applications.filter((a) => a.status === "SHORTLISTED").length;
  const accepted = applications.filter((a) => a.status === "ACCEPTED").length;
  const rejected = applications.filter((a) => a.status === "REJECTED").length;

  return (
    <ProtectedRoute allowedRoles={["JOB_SEEKER"]}>
      <AppLayout>
        <div className="space-y-6">
          <TitlePage
            title={`Selamat Datang, ${user?.name || "Pelamar"}`}
            subtitle="Pantau status lamaran pekerjaan dan temukan peluang baru."
            icon={<Briefcase className="w-7 h-7 text-primary" />}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">Total Lamaran</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{total}</h3>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 rounded-xl"><FileText className="w-6 h-6" /></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">Dalam Proses</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{inReview}</h3>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-600 rounded-xl"><Clock className="w-6 h-6" /></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">Diterima</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{accepted}</h3>
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">Ditolak</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{rejected}</h3>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-600 rounded-xl"><XCircle className="w-6 h-6" /></div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Lamaran Terbaru</CardTitle>
              <Link to="/applications">
                <Button variant="outline" size="sm" className="gap-1">Lihat Semua <ArrowRight className="w-4 h-4" /></Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="py-12 flex justify-center"><LoaderCircle className="w-6 h-6 animate-spin text-primary" /></div>
              ) : applications.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  <p>Anda belum melamar pekerjaan apapun.</p>
                  <Link to="/" className="inline-block mt-3"><Button size="sm">Cari Pekerjaan Sekarang</Button></Link>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Posisi Pekerjaan</TableHead>
                      <TableHead>Perusahaan</TableHead>
                      <TableHead>Tanggal Melamar</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.slice(0, 5).map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-semibold">{app.job?.title || "Lowongan Pekerjaan"}</TableCell>
                        <TableCell>{app.job?.company?.companyName || "-"}</TableCell>
                        <TableCell>{formatDate(app.createdAt)}</TableCell>
                        <TableCell><StatusBadge status={app.status} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
