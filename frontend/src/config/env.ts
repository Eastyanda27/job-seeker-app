import { z } from "zod";

const normalizeUrl = (raw?: string, defaultUrl = "http://localhost:5000/api") => {
  if (!raw || !raw.trim()) return defaultUrl;
  let url = raw.trim().replace(/^['"]+|['"]+$/g, "");
  // Prepend https:// if protocol is omitted
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }
  url = url.replace(/\/+$/, "");
  if (!url.endsWith("/api")) {
    url = `${url}/api`;
  }
  return url;
};

const schema = z.object({
  API_URL: z.string().optional().transform((val) => normalizeUrl(val, "http://localhost:5000/api")),
  APP_URL: z.string().default("http://localhost:5173"),
});

const values = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  APP_URL: import.meta.env.VITE_APP_URL || "http://localhost:5173",
};

export const env = schema.parse(values);

export const getStorageUrl = (path: string) => {
  if (!path || path === "-") return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${env.API_URL.replace(/\/api\/?$/, "")}/${path.replace(/^\//, "")}`;
};

export type Env = typeof env;


