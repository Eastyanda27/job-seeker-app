import { prisma } from "@/libs/prisma";
import { UserRepository } from "@/domain/service/user-repository";
import { RegisterDto } from "@/dto/auth-dto";

export class UserPrismaRepository implements UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        companyProfile: true,
        jobSeekerProfile: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        companyProfile: true,
        jobSeekerProfile: true,
      },
    });
  }

  async createWithProfile(data: RegisterDto, hashedPassword: string) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        ...(data.role === "COMPANY"
          ? {
              companyProfile: {
                create: {
                  companyName: data.companyName || data.name,
                  description: data.description,
                  location: data.location,
                },
              },
            }
          : {
              jobSeekerProfile: {
                create: {
                  phone: data.phone,
                },
              },
            }),
      },
      include: {
        companyProfile: true,
        jobSeekerProfile: true,
      },
    });
  }
}
