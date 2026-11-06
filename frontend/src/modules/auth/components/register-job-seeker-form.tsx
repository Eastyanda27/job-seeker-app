import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterJobSeeker } from "../hooks/use-api-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export function RegisterJobSeekerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const registerMutation = useRegisterJobSeeker();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (password.length < 6) {
      setFormError("Kata sandi minimal 6 karakter");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Konfirmasi kata sandi tidak cocok");
      return;
    }

    registerMutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
        onError: (err: any) => {
          const msg =
            err.response?.data?.message ||
            err.message ||
            "Pendaftaran gagal. Periksa kembali data yang dimasukkan.";
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
          Nama Lengkap
        </label>
        <div className="relative">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Budi Santoso"
            required
            className="pl-9 h-11 rounded-xl"
          />
          <User className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
        </div>
      </div>

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
          Kata Sandi (Min. 6 Karakter)
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Buat kata sandi aman"
            required
            minLength={6}
            className="pl-9 pr-10 h-11 rounded-xl"
          />
          <Lock className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Konfirmasi Kata Sandi
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Ketik ulang kata sandi"
            required
            className="pl-9 h-11 rounded-xl"
          />
          <Lock className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
        </div>
      </div>

      <Button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full h-11 rounded-xl text-base font-medium shadow-md mt-2"
      >
        {registerMutation.isPending ? "Mendaftarkan..." : "Daftar Sebagai Pelamar"}
      </Button>

      <div className="text-center pt-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Sudah memiliki akun?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </form>
  );
}

export default RegisterJobSeekerForm;