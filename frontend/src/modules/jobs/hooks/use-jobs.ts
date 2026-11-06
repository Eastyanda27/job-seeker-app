import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createJob, getCompanyJobs, getJob, getJobs } from "../api/job-api";
import { jobKeys } from "../constants/job-query";
import type { CreateJobInput, JobFilters } from "../types/job-types";
export const useJobs = (filters: JobFilters = {}) => useQuery({ queryKey: jobKeys.list(filters), queryFn: () => getJobs(filters) });
export const useJob = (id?: string) => useQuery({ queryKey: jobKeys.detail(id || ""), queryFn: () => getJob(id!), enabled: Boolean(id) });
export const useCompanyJobs = () => useQuery({ queryKey: jobKeys.company(), queryFn: getCompanyJobs });
export const useCreateJob = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (payload: CreateJobInput) => createJob(payload), onSuccess: () => { qc.invalidateQueries({ queryKey: jobKeys.all }); } }); };