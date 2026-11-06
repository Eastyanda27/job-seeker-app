import { AuthLayout } from "@/components/layouts/auth-layout";
import RegisterJobSeekerForm from "@/modules/auth/components/register-job-seeker-form";

export default function RegisterPage() {
  return (
    <AuthLayout title="Daftar Pencari Kerja" subtitle="Mulai karier impianmu bersama IndoKerja">
      <RegisterJobSeekerForm />
    </AuthLayout>
  );
}
