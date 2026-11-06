import { AuthLayout } from "@/components/layouts/auth-layout";
import RegisterCompanyForm from "@/modules/auth/components/register-company-form";

export default function CompanyRegisterPage() {
  return (
    <AuthLayout title="Daftar Akun Perusahaan" subtitle="Temukan talenta terbaik untuk perusahaanmu">
      <RegisterCompanyForm />
    </AuthLayout>
  );
}
