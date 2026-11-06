import type { ReactNode } from "react";

interface TitlePageProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export function TitlePage({ title, subtitle, icon }: TitlePageProps) {
  return (
    <div>
      <div className="flex gap-2.5 items-center">
        {icon}
        <h1 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold">
          {title}
        </h1>
      </div>
      {subtitle && (
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{subtitle}</p>
      )}
    </div>
  );
}

export default TitlePage;
