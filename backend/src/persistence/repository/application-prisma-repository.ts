import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { ApplicationRepository } from "@/domain/service/application-repository";
import { ApplyJobDto, UpdateApplicationStatusDto } from "@/dto/application-dto";

export class ApplicationPrismaRepository implements ApplicationRepository {
  async findExistingApplication(jobId: string, seekerId: string) {
    return prisma.application.findUnique({
      where: {
        jobId_seekerId: {
          jobId,
          seekerId,
        },
      },
    });
  }

  async createApplication(seekerId: string, data: ApplyJobDto) {
    return prisma.application.create({
      data: {
        jobId: data.jobId,
        seekerId,
        coverLetter: data.coverLetter,
        status: "APPLIED",
        history: {
          create: {
            status: "APPLIED",
            notes: "Application submitted by job seeker",
            changedByUserId: seekerId,
          },
        },
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
        history: true,
      },
    });
  }

  async findBySeekerId(seekerId: string) {
    return prisma.application.findMany({
      where: { seekerId },
      include: {
        job: {
          include: {
            company: {
              select: {
                id: true,
                companyName: true,
                location: true,
              },
            },
          },
        },
        history: {
          orderBy: { createdAt: "desc" },
          include: {
            changedBy: {
              select: { name: true, role: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findByJobId(jobId: string) {
    return prisma.application.findMany({
      where: { jobId },
      include: {
        job: {
          select: {
            id: true,
            title: true,
          },
        },
        seeker: {
          select: {
            id: true,
            name: true,
            email: true,
            jobSeekerProfile: true,
          },
        },
        history: {
          orderBy: { createdAt: "desc" },
          include: {
            changedBy: {
              select: { name: true, role: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findByCompanyId(companyId: string, jobId?: string) {
    const whereClause: any = {
      job: { companyId },
    };

    if (jobId) {
      whereClause.jobId = jobId;
    }

    return prisma.application.findMany({
      where: whereClause,
      include: {
        job: {
          select: {
            id: true,
            title: true,
            location: true,
            jobType: true,
            salary: true,
          },
        },
        seeker: {
          select: {
            id: true,
            name: true,
            email: true,
            jobSeekerProfile: true,
          },
        },
        history: {
          orderBy: { createdAt: "desc" },
          include: {
            changedBy: {
              select: { id: true, name: true, role: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.application.findUnique({
      where: { id },
      include: {
        job: {
          select: { companyId: true },
        },
      },
    });
  }

  async updateStatus(applicationId: string, companyUserId: string, data: UpdateApplicationStatusDto) {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const updated = await tx.application.update({
        where: { id: applicationId },
        data: { status: data.status },
      });

      await tx.applicationHistory.create({
        data: {
          applicationId,
          status: data.status,
          notes: data.notes || `Status updated to ${data.status}`,
          changedByUserId: companyUserId,
        },
      });

      return updated;
    });
  }

  async findHistory(applicationId: string) {
    return prisma.applicationHistory.findMany({
      where: { applicationId },
      include: {
        changedBy: {
          select: { id: true, name: true, role: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
