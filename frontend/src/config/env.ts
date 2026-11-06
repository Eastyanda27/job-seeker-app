import { z } from "zod";

const schema = z.object({
  API_URL: z.string().default("http://localhost:5000/api"),
  APP_URL: z.string().default("http://localhost:5173"),
});

const values = {
  API_URL: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api",
  APP_URL: import.meta.env.VITE_APP_URL ?? "http://localhost:5173",
};

export const env = schema.parse(values);

export const getStorageUrl = (path: string) => {
  if (!path || path === "-") return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${env.API_URL.replace(/\/api\/?$/, "")}/${path.replace(/^\//, "")}`;
};

export type Env = typeof env;
