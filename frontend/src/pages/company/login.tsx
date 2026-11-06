import { AuthLayout } from "@/components/layouts/auth-layout";
import LoginForm from "@/modules/auth/components/login-form";

export default function CompanyLoginPage() {
  return (
    <AuthLayout title="Portal Perusahaan" subtitle="Masuk sebagai Perusahaan / Rekruter">
      <LoginForm registerUrl="/company/register" dashboardUrl="/company/jobs" expectedRole="COMPANY" />
    </AuthLayout>
  );
}
