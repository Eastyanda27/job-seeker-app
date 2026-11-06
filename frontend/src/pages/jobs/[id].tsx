import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BriefcaseBusiness, Building2, LoaderCircle, MapPin, Send } from "lucide-react";
import { PublicLayout } from "@/components/layouts/public-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobTypeBadge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useAuth } from "@/contexts/AuthContext";
import { useJob } from "@/modules/jobs/hooks/use-jobs";
import { useApplyJob } from "@/modules/applications/hooks/use-applications";
import { formatCurrency, formatDate } from "@/utils/format";

export default function JobDetailPage() {
  const { id } = useParams();
  const jobQuery = useJob(id);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const applyMutation = useApplyJob();
  const [applyOpen, setApplyOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [applyError, setApplyError] = useState<string | null>(null);

  if (jobQuery.isLoading) return <PublicLayout><div className="py-24 flex justify-center"><LoaderCircle className="w-8 h-8 animate-spin text-primary" /></div></PublicLayout>;
  if (jobQuery.isError || !jobQuery.data) return <PublicLayout><Card className="mt-8"><CardContent className="p-10 text-center"><h1 className="text-xl font-bold">Lowongan tidak ditemukan</h1><Link className="text-primary inline-flex items-center gap-1 mt-4" to="/"><ArrowLeft className="w-4 h-4" /> Kembali ke lowongan</Link></CardContent></Card></PublicLayout>;

  const job = jobQuery.data;
  const openApply = () => {
    if (!isAuthenticated) { navigate("/login", { state: { from: `/jobs/${job.id}` } }); return; }
    if (user?.role !== "JOB_SEEKER") return;
    setApplyOpen(true);
  };
  const submitApply = () => {
    setApplyError(null);
    applyMutation.mutate({ jobId: job.id, coverLetter: coverLetter || undefined }, { onSuccess: () => { setApplyOpen(false); setCoverLetter(""); }, onError: (err: any) => setApplyError(err.response?.data?.message || "Lamaran gagal dikirim.") });
  };

  return <PublicLayout>
    <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-5"><ArrowLeft className="w-4 h-4" /> Kembali ke lowongan</Link>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      <Card><CardContent className="p-6 sm:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div className="flex gap-4"><div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><BriefcaseBusiness className="w-7 h-7" /></div><div><h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{job.title}</h1><p className="text-primary font-semibold mt-1">{job.company?.companyName || "Perusahaan"}</p><p className="text-sm text-gray-500 flex items-center gap-1 mt-2"><MapPin className="w-4 h-4" /> {job.location}</p></div></div><JobTypeBadge jobType={job.jobType} /></div><div className="grid grid-cols-2 gap-3 my-8 py-5 border-y border-gray-100 dark:border-gray-700"><div><p className="text-xs text-gray-500">Gaji</p><p className="font-semibold text-gray-900 dark:text-white mt-1">{formatCurrency(job.salary)}</p></div><div><p className="text-xs text-gray-500">Dipublikasikan</p><p className="font-semibold text-gray-900 dark:text-white mt-1">{formatDate(job.createdAt)}</p></div></div><h2 className="text-lg font-bold text-gray-900 dark:text-white">Deskripsi Pekerjaan</h2><p className="mt-3 whitespace-pre-wrap leading-7 text-gray-600 dark:text-gray-300">{job.description}</p></CardContent></Card>
      <aside><Card className="sticky top-22"><CardHeader><CardTitle>Siap Melamar?</CardTitle></CardHeader><CardContent><p className="text-sm text-gray-500 mb-5">Kirim lamaranmu sekarang dan ambil langkah baru dalam kariermu.</p>{user?.role === "COMPANY" ? <p className="text-sm text-amber-600">Akun perusahaan tidak dapat melamar lowongan.</p> : <Button className="w-full" disabled={job.isClosed} onClick={openApply}><Send className="w-4 h-4 mr-2" />{job.isClosed ? "Lowongan Ditutup" : "Lamar Sekarang"}</Button>}<div className="mt-5 pt-5 border-t text-xs text-gray-500 flex gap-2"><Building2 className="w-4 h-4 shrink-0" />{job.company?.companyName || "Perusahaan terverifikasi"}</div></CardContent></Card></aside>
    </div>
    <Modal open={applyOpen} onClose={() => setApplyOpen(false)} title="Kirim Lamaran" description={`Lamar posisi ${job.title}`}><div className="space-y-4"><label className="block text-sm font-medium">Cover Letter <span className="text-gray-400">(opsional)</span></label><textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} rows={6} placeholder="Ceritakan mengapa Anda cocok untuk posisi ini..." className="w-full rounded-lg border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring resize-y" />{applyError && <p className="text-sm text-red-600">{applyError}</p>}<div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setApplyOpen(false)}>Batal</Button><Button onClick={submitApply} disabled={applyMutation.isPending}>{applyMutation.isPending ? "Mengirim..." : "Kirim Lamaran"}</Button></div></div></Modal>
  </PublicLayout>;
}
