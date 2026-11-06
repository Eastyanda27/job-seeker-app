import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/use-api-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import type { UserRole } from "../types/auth-types";

interface LoginFormProps {
  expectedRole?: UserRole;
  registerUrl: string;
  dashboardUrl: string;
}

export function LoginForm({ expectedRole, registerUrl, dashboardUrl }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loginMutation = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email || !password) {
      setFormError("Email dan password wajib diisi");
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (expectedRole && data.user.role !== expectedRole) {
            setFormError(
              expectedRole === "COMPANY"
                ? "Akun Anda bukan akun perusahaan. Silakan login sebagai pencari kerja."
                : "Akun Anda adalah akun perusahaan. Silakan login di portal perusahaan."
            );
            return;
          }
          navigate(dashboardUrl);
        },
        onError: (err: any) => {
          const msg = err.response?.data?.message || err.message || "Gagal masuk. Periksa email dan password Anda.";
          setFormError(msg);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <div className="relative">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            required
            className="pl-9 h-11 rounded-xl"
          />
          <Mail className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Kata Sandi
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan kata sandi"
            required
            className="pl-9 pr-10 h-11 rounded-xl"
          />
          <Lock className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full h-11 rounded-xl text-base font-medium shadow-md mt-2"
      >
        {loginMutation.isPending ? "Memproses..." : "Masuk"}
      </Button>

      <div className="text-center pt-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Belum memiliki akun?{" "}
          <Link to={registerUrl} className="text-primary font-semibold hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;