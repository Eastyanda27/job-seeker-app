import { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Plus, Users, MapPin, LoaderCircle } from "lucide-react";
import { AppLayout } from "@/components/layouts/app-layout";
import ProtectedRoute from "@/components/auth/protected-route";
import TitlePage from "@/components/ui/title-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { JobTypeBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useCompanyJobs, useCreateJob } from "@/modules/jobs/hooks/use-jobs";
import type { JobType } from "@/modules/jobs/types/job-types";
import { formatCurrency, formatDate } from "@/utils/format";

function CreateJobModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const createJobMutation = useCreateJob();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobType: "FULL_TIME" as JobType,
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const salaryNumber = formData.salary ? Number(formData.salary) : undefined;
    createJobMutation.mutate(
      {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        jobType: formData.jobType,
        salary: salaryNumber,
      },
      {
        onSuccess: () => {
          onClose();
          setFormData({ title: "", description: "", location: "", salary: "", jobType: "FULL_TIME" });
        },
        onError: (err: any) => setErrorMsg(err.response?.data?.message || "Gagal membuat lowongan kerja."),
      }
    );
  };

  return (
    <Modal open={open} onClose={onClose} title="Pasang Lowongan Baru" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Judul Posisi *</label>
          <Input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="misal: Frontend Developer" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Tipe Pekerjaan *</label>
            <select value={formData.jobType} onChange={(e) => setFormData({ ...formData, jobType: e.target.value as JobType })} className="w-full h-10 rounded-xl border border-border bg-background px-3 py-2 text-sm">
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="REMOTE">Remote</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Lokasi Kerja *</label>
            <Input required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="misal: Jakarta" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Gaji Bulanan (IDR)</label>
          <Input type="number" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} placeholder="misal: 10000000" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Deskripsi *</label>
          <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Deskripsi pekerjaan..." className="w-full rounded-xl border border-border bg-background p-3 text-sm resize-y" />
        </div>
        {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
        <div className="flex items-center justify-end gap-3 pt-3">
          <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
          <Button type="submit" disabled={createJobMutation.isPending}>{createJobMutation.isPending ? "Menyimpan..." : "Publikasikan"}</Button>
        </div>
      </form>
    </Modal>
  );
}

export default function CompanyJobsPage() {
  const { data: jobs = [], isLoading } = useCompanyJobs();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <ProtectedRoute allowedRoles={["COMPANY"]} redirectTo="/company/login">
      <AppLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <TitlePage title="Kelola Lowongan" subtitle="Buat dan pantau seluruh lowongan pekerjaan yang dibuka perusahaan Anda." icon={<Briefcase className="w-7 h-7 text-primary" />} />
            <Button onClick={() => setCreateModalOpen(true)} className="gap-2"><Plus className="w-4 h-4" /> Pasang Lowongan Baru</Button>
          </div>
          <Card>
            <CardHeader><CardTitle>Daftar Lowongan ({jobs.length})</CardTitle></CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="py-16 flex justify-center"><LoaderCircle className="w-7 h-7 animate-spin text-primary" /></div>
              ) : jobs.length === 0 ? (
                <div className="py-16 text-center text-gray-500">
                  <p>Belum ada lowongan pekerjaan yang dibuat.</p>
                  <Button onClick={() => setCreateModalOpen(true)} size="sm" className="mt-4 gap-1"><Plus className="w-4 h-4" /> Buat Lowongan Pertama</Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Posisi Lowongan</TableHead>
                      <TableHead>Tipe & Lokasi</TableHead>
                      <TableHead>Gaji Ditawarkan</TableHead>
                      <TableHead>Pelamar</TableHead>
                      <TableHead>Tanggal Buka</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-semibold text-gray-900 dark:text-white">{job.title}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 items-start">
                            <JobTypeBadge jobType={job.jobType} />
                            <span className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-medium">{formatCurrency(job.salary)}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                            <Users className="w-3.5 h-3.5" /> {job._count?.applications ?? 0} Pelamar
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-gray-500">{formatDate(job.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <Link to={`/company/jobs/${job.id}/applicants`}>
                            <Button variant="outline" size="sm" className="gap-1.5"><Users className="w-3.5 h-3.5" /> Lihat Pelamar</Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          <CreateJobModal open={createModalOpen} onClose={() => setCreateModalOpen(false)} />
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
