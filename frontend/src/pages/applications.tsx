import { useState } from "react";
import { Eye, FileText, Filter, LoaderCircle, MapPin, Search } from "lucide-react";
import { AppLayout } from "@/components/layouts/app-layout";
import ProtectedRoute from "@/components/auth/protected-route";
import TitlePage from "@/components/ui/title-page";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useMyApplications } from "@/modules/applications/hooks/use-applications";
import type { Application } from "@/modules/applications/types/application-types";
import { formatCurrency, formatDate } from "@/utils/format";

export default function MyApplicationsPage() {
  const { data: applications = [], isLoading } = useMyApplications();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.job?.title.toLowerCase().includes(search.toLowerCase()) ||
      app.job?.company?.companyName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <ProtectedRoute allowedRoles={["JOB_SEEKER"]}>
      <AppLayout>
        <div className="space-y-6">
          <TitlePage title="Lamaran Saya" subtitle="Daftar seluruh lamaran pekerjaan yang telah Anda ajukan." icon={<FileText className="w-7 h-7 text-primary" />} />
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <Input placeholder="Cari posisi atau perusahaan..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-10 rounded-xl border border-border bg-background px-3 py-2 text-sm">
                    <option value="ALL">Semua Status</option>
                    <option value="APPLIED">Terkirim</option>
                    <option value="REVIEWING">Ditinjau</option>
                    <option value="SHORTLISTED">Shortlist</option>
                    <option value="ACCEPTED">Diterima</option>
                    <option value="REJECTED">Ditolak</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="py-16 flex justify-center"><LoaderCircle className="w-7 h-7 animate-spin text-primary" /></div>
              ) : filteredApps.length === 0 ? (
                <div className="py-16 text-center text-gray-500">Tidak ada lamaran yang sesuai filter.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Posisi & Perusahaan</TableHead>
                      <TableHead>Lokasi & Gaji</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApps.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>
                          <p className="font-bold text-gray-900 dark:text-white">{app.job?.title || "Lowongan"}</p>
                          <p className="text-xs text-primary font-medium mt-0.5">{app.job?.company?.companyName}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1"><MapPin className="w-3 h-3 text-gray-400" /> {app.job?.location || "-"}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{formatCurrency(app.job?.salary)}</p>
                        </TableCell>
                        <TableCell className="text-xs text-gray-500">{formatDate(app.createdAt)}</TableCell>
                        <TableCell><StatusBadge status={app.status} /></TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setSelectedApp(app)}><Eye className="w-3.5 h-3.5" /> Detail</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Modal open={!!selectedApp} onClose={() => setSelectedApp(null)} title="Detail Lamaran" description={`Informasi lamaran untuk posisi ${selectedApp?.job?.title}`}>
            {selectedApp && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3 border-gray-100 dark:border-gray-700">
                  <div>
                    <h4 className="font-bold text-base text-gray-900 dark:text-white">{selectedApp.job?.title}</h4>
                    <p className="text-sm text-primary">{selectedApp.job?.company?.companyName}</p>
                  </div>
                  <StatusBadge status={selectedApp.status} />
                </div>
                <div>
                  <h5 className="text-xs font-semibold uppercase text-gray-500 mb-1">Cover Letter</h5>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/60 text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300">{selectedApp.coverLetter || "Tidak menyertakan cover letter."}</div>
                </div>
                <div>
                  <h5 className="text-xs font-semibold uppercase text-gray-500 mb-1">Riwayat Pengajuan</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Dikirim pada {formatDate(selectedApp.createdAt)} • Diperbarui pada {formatDate(selectedApp.updatedAt)}</p>
                </div>
                <div className="flex justify-end pt-3"><Button variant="outline" onClick={() => setSelectedApp(null)}>Tutup</Button></div>
              </div>
            )}
          </Modal>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
