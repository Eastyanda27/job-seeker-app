import { useState } from "react";
import { Eye, LoaderCircle, Mail, Phone, Users } from "lucide-react";
import { AppLayout } from "@/components/layouts/app-layout";
import ProtectedRoute from "@/components/auth/protected-route";
import TitlePage from "@/components/ui/title-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useCompanyApplicants, useUpdateApplicationStatus } from "@/modules/applications/hooks/use-applications";
import type { Application, ApplicationStatus } from "@/modules/applications/types/application-types";
import { formatDate } from "@/utils/format";

export default function AllCompanyApplicantsPage() {
  const { data: applicants = [], isLoading } = useCompanyApplicants();
  const updateStatusMutation = useUpdateApplicationStatus();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  return (
    <ProtectedRoute allowedRoles={["COMPANY"]} redirectTo="/company/login">
      <AppLayout>
        <div className="space-y-6">
          <TitlePage
            title="Semua Pelamar"
            subtitle={`Total ${applicants.length} kandidat melamar ke lowongan perusahaan Anda.`}
            icon={<Users className="w-7 h-7 text-primary" />}
          />
          <Card>
            <CardHeader><CardTitle>Daftar Seluruh Pelamar</CardTitle></CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="py-16 flex justify-center"><LoaderCircle className="w-7 h-7 animate-spin text-primary" /></div>
              ) : applicants.length === 0 ? (
                <div className="py-16 text-center text-gray-500">Belum ada pelamar yang terdaftar.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Pelamar</TableHead>
                      <TableHead>Posisi / Lowongan</TableHead>
                      <TableHead>Kontak</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ubah Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicants.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-semibold">{app.seeker?.name || "Pelamar"}</TableCell>
                        <TableCell className="text-primary font-medium">{app.job?.title || "-"}</TableCell>
                        <TableCell>
                          <div className="space-y-1 text-xs text-gray-500">
                            {app.seeker?.email && <p className="flex items-center gap-1"><Mail className="w-3 h-3" />{app.seeker.email}</p>}
                            {app.seeker?.jobSeekerProfile?.phone && <p className="flex items-center gap-1"><Phone className="w-3 h-3" />{app.seeker.jobSeekerProfile.phone}</p>}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-gray-500">{formatDate(app.createdAt)}</TableCell>
                        <TableCell><StatusBadge status={app.status} /></TableCell>
                        <TableCell>
                          <select
                            disabled={updateStatusMutation.isPending}
                            value={app.status}
                            onChange={(e) => updateStatusMutation.mutate({ id: app.id, status: e.target.value as ApplicationStatus })}
                            className="h-8 rounded-lg border border-border bg-background px-2 text-xs focus:ring-1 focus:ring-ring"
                          >
                            <option value="APPLIED">Terkirim</option>
                            <option value="REVIEWING">Ditinjau</option>
                            <option value="SHORTLISTED">Shortlist</option>
                            <option value="ACCEPTED">Diterima</option>
                            <option value="REJECTED">Ditolak</option>
                          </select>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => setSelectedApp(app)}><Eye className="w-3.5 h-3.5 mr-1" />Detail</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          <Modal open={!!selectedApp} onClose={() => setSelectedApp(null)} title="Detail Lamaran">
            {selectedApp && (
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <p className="font-bold">{selectedApp.seeker?.name}</p>
                    <p className="text-xs text-primary">{selectedApp.job?.title}</p>
                  </div>
                  <StatusBadge status={selectedApp.status} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">Cover Letter</p>
                  <p className="text-sm mt-1 whitespace-pre-wrap">{selectedApp.coverLetter || "Tidak ada cover letter."}</p>
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
