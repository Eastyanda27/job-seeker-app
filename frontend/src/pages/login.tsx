import { AuthLayout } from "@/components/layouts/auth-layout";
import LoginForm from "@/modules/auth/components/login-form";

export default function LoginPage() {
  return (
    <AuthLayout title="Masuk ke Akun" subtitle="Pencari Kerja IndoKerja">
      <LoginForm registerUrl="/register" dashboardUrl="/dashboard" expectedRole="JOB_SEEKER" />
    </AuthLayout>
  );
}
