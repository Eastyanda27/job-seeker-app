import { prisma } from "@/libs/prisma";
import { JobRepository, JobWithCompany } from "@/domain/service/job-repository";
import { CreateJobDto, JobFilterDto } from "@/dto/job-dto";

export class JobPrismaRepository implements JobRepository {
  async findAll(filters?: JobFilterDto): Promise<JobWithCompany[]> {
    const whereClause: any = { isClosed: false };

    if (filters?.search) {
      whereClause.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        { company: { companyName: { contains: filters.search, mode: "insensitive" } } },
      ];
    }

    if (filters?.jobType) {
      whereClause.jobType = filters.jobType;
    }

    if (filters?.location) {
      whereClause.location = { contains: filters.location, mode: "insensitive" };
    }

    if (filters?.minSalary !== undefined || filters?.maxSalary !== undefined) {
      whereClause.salary = {};
      if (filters.minSalary !== undefined) {
        whereClause.salary.gte = filters.minSalary;
      }
      if (filters.maxSalary !== undefined) {
        whereClause.salary.lte = filters.maxSalary;
      }
    }

    let orderBy: any = { createdAt: "desc" };
    if (filters?.sortBy === "salary_asc") {
      orderBy = { salary: "asc" };
    } else if (filters?.sortBy === "salary_desc") {
      orderBy = { salary: "desc" };
    }

    return prisma.job.findMany({
      where: whereClause,
      include: {
        company: {
          select: {
            id: true,
            companyName: true,
            location: true,
            website: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy,
    });
  }

  async findById(id: string): Promise<JobWithCompany | null> {
    return prisma.job.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            companyName: true,
            description: true,
            location: true,
            website: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
    });
  }

  async create(companyId: string, data: CreateJobDto) {
    return prisma.job.create({
      data: {
        companyId,
        title: data.title,
        description: data.description,
        location: data.location,
        salary: data.salary,
        jobType: data.jobType,
      },
      include: {
        company: true,
      },
    });
  }

  async findByCompanyId(companyId: string) {
    return prisma.job.findMany({
      where: { companyId },
      include: {
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findCompanyProfileByUserId(userId: string) {
    return prisma.companyProfile.findUnique({
      where: { userId },
    });
  }
}
