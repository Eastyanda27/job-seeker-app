import { api, type ApiResponse } from "@/libs/api";
import type { CreateJobInput, Job, JobFilters } from "../types/job-types";
const unwrap = <T>(response: unknown) => (response as ApiResponse<T>).data;
export const getJobs = async (filters: JobFilters = {}) => unwrap<Job[]>(await api.get("/jobs", { params: filters }));
export const getJob = async (id: string) => unwrap<Job>(await api.get(`/jobs/${id}`));
export const createJob = async (payload: CreateJobInput) => unwrap<Job>(await api.post("/jobs", payload));
export const getCompanyJobs = async () => unwrap<Job[]>(await api.get("/jobs/company/my-jobs"));