import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Search, BriefcaseBusiness, ArrowRight, LoaderCircle } from "lucide-react";
import { PublicLayout } from "@/components/layouts/public-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JobTypeBadge } from "@/components/ui/badge";
import { useJobs } from "@/modules/jobs/hooks/use-jobs";
import type { JobFilters } from "@/modules/jobs/types/job-types";
import { formatCurrency, formatDate } from "@/utils/format";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState<JobFilters>({});
  const jobsQuery = useJobs(filters);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setFilters({ search: search.trim() || undefined, location: location.trim() || undefined });
  };

  return (
    <PublicLayout>
      <section className="rounded-3xl bg-[#0D1B2E] px-6 py-14 sm:px-12 sm:py-20 text-white overflow-hidden relative">
        <div className="relative z-10 max-w-3xl">
          <p className="text-[#4E8FD9] text-sm font-semibold uppercase tracking-widest mb-4">Platform Karier Indonesia</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">Temukan pekerjaan yang tepat untuk masa depanmu.</h1>
          <p className="mt-5 text-blue-100/80 max-w-xl">Cari lowongan kerja dari perusahaan terbaik dan mulai perjalanan kariermu bersama IndoKerja.</p>
          <form onSubmit={submitSearch} className="mt-8 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2 p-2 rounded-2xl bg-white shadow-xl">
            <div className="relative"><Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" /><Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Posisi atau kata kunci" className="border-0 pl-9 text-gray-900 focus:ring-0" /></div>
            <div className="relative"><MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" /><Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Kota atau lokasi" className="border-0 pl-9 text-gray-900 focus:ring-0" /></div>
            <Button type="submit" className="h-10 rounded-xl">Cari Lowongan</Button>
          </form>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4 mb-5"><div><p className="text-primary text-sm font-semibold">LOWONGAN TERBARU</p><h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">Peluang yang mungkin cocok untukmu</h2></div><span className="text-sm text-gray-500">{jobsQuery.data?.length ?? 0} lowongan</span></div>
        {jobsQuery.isLoading && <div className="flex justify-center py-16"><LoaderCircle className="w-7 h-7 text-primary animate-spin" /></div>}
        {jobsQuery.isError && <Card><CardContent className="p-6 text-center text-red-600">Gagal memuat lowongan. Silakan coba lagi.</CardContent></Card>}
        {!jobsQuery.isLoading && !jobsQuery.isError && jobsQuery.data?.length === 0 && <Card><CardContent className="p-10 text-center text-gray-500">Belum ada lowongan yang sesuai.</CardContent></Card>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobsQuery.data?.map((job) => <Card key={job.id} className="hover:shadow-md transition-shadow"><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><BriefcaseBusiness className="w-5 h-5" /></div><JobTypeBadge jobType={job.jobType} /></div><h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4">{job.title}</h3><p className="text-sm text-primary font-medium mt-1">{job.company?.companyName || "Perusahaan"}</p><div className="flex flex-wrap gap-3 mt-4 text-xs text-gray-500"><span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span><span>{formatCurrency(job.salary)}</span></div><div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-gray-700"><span className="text-xs text-gray-400">{formatDate(job.createdAt)}</span><Link to={`/jobs/${job.id}`} className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all">Lihat Detail <ArrowRight className="w-4 h-4" /></Link></div></CardContent></Card>)}
        </div>
      </section>
    </PublicLayout>
  );
}
