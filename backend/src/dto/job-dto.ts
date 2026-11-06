export interface CreateJobDto {
  title: string;
  description: string;
  location: string;
  salary: number;
  jobType: "FULL_TIME" | "PART_TIME" | "REMOTE" | "CONTRACT";
}

export interface JobFilterDto {
  search?: string;
  jobType?: string;
  location?: string;
  minSalary?: number;
  maxSalary?: number;
  sortBy?: "latest" | "salary_asc" | "salary_desc";
}
