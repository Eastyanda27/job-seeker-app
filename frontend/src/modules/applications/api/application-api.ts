import { api, type ApiResponse } from "@/libs/api";
import type { Application, ApplyJobInput, UpdateApplicationStatusInput } from "../types/application-types";
const unwrap = <T>(response: unknown) => (response as ApiResponse<T>).data;
export const applyJob = async (payload: ApplyJobInput) => unwrap<Application>(await api.post("/applications/apply", payload));
export const getMyApplications = async () => unwrap<Application[]>(await api.get("/applications/my-applications"));
export const getCompanyApplicants = async (jobId?: string) => unwrap<Application[]>(await api.get("/applications/company/applicants", { params: jobId ? { jobId } : undefined }));
export const getJobApplicants = async (jobId: string) => unwrap<Application[]>(await api.get(`/applications/job/${jobId}/applicants`));
export const updateApplicationStatus = async ({ id, ...payload }: UpdateApplicationStatusInput & { id: string }) => unwrap<Application>(await api.patch(`/applications/${id}/status`, payload));
export const getApplicationHistory = async (id: string) => unwrap<unknown[]>(await api.get(`/applications/${id}/history`));