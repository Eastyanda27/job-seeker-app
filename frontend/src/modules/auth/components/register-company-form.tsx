import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterCompany } from "../hooks/use-api-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, User, Mail, Phone, MapPin, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export function RegisterCompanyForm() {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const registerMutation = useRegisterCompany();
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
      {
        name,
        companyName,
        email,
        phone,
        location,
        password,
      },
      {
        onSuccess: () => {
          navigate("/company/jobs");
        },
        onError: (err: any) => {
          const msg =
            err.response?.data?.message ||
            err.message ||
            "Pendaftaran perusahaan gagal. Silakan periksa data yang dimasukkan.";
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
          Nama Perusahaan
        </label>
        <div className="relative">
          <Input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="PT. Inovasi Digital Jaya"
            required
            className="pl-9 h-11 rounded-xl"
          />
          <Building2 className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Nama PIC / Kontak
          </label>
          <div className="relative">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Lengkap PIC"
              required
              className="pl-9 h-11 rounded-xl"
            />
            <User className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Nomor Telepon
          </label>
          <div className="relative">
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08123456789"
              required
              className="pl-9 h-11 rounded-xl"
            />
            <Phone className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Email Perusahaan
          </label>
          <div className="relative">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hr@perusahaan.com"
              required
              className="pl-9 h-11 rounded-xl"
            />
            <Mail className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Lokasi / Kota
          </label>
          <div className="relative">
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Jakarta Selatan"
              required
              className="pl-9 h-11 rounded-xl"
            />
            <MapPin className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Kata Sandi
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 karakter"
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
            Konfirmasi Sandi
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ketik ulang"
              required
              className="pl-9 h-11 rounded-xl"
            />
            <Lock className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full h-11 rounded-xl text-base font-medium shadow-md mt-2"
      >
        {registerMutation.isPending ? "Mendaftarkan Perusahaan..." : "Daftar Akun Perusahaan"}
      </Button>

      <div className="text-center pt-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Sudah memiliki akun perusahaan?{" "}
          <Link to="/company/login" className="text-primary font-semibold hover:underline">
            Masuk Portal Perusahaan
          </Link>
        </p>
      </div>
    </form>
  );
}

export default RegisterCompanyForm;