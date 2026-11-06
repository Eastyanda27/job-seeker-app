/// <reference types="node" />
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.applicationHistory.deleteMany();
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.companyProfile.deleteMany();
  await prisma.jobSeekerProfile.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1. Create Company 1
  const companyUser1 = await prisma.user.create({
    data: {
      email: "hr@techcorp.com",
      password: hashedPassword,
      name: "Tech Corp HR",
      role: "COMPANY",
      companyProfile: {
        create: {
          companyName: "TechCorp Solutions",
          description: "Leading tech company specializing in AI and cloud solutions.",
          location: "Jakarta, Indonesia",
          website: "https://techcorp.example.com",
        },
      },
    },
    include: { companyProfile: true },
  });

  // 2. Create Company 2
  const companyUser2 = await prisma.user.create({
    data: {
      email: "recruitment@indokreatif.id",
      password: hashedPassword,
      name: "Indo Kreatif Studio",
      role: "COMPANY",
      companyProfile: {
        create: {
          companyName: "PT Indo Kreatif Studio",
          description: "Digital design and software development agency.",
          location: "Bandung, Indonesia",
          website: "https://indokreatif.example.com",
        },
      },
    },
    include: { companyProfile: true },
  });

  // 3. Create Job Seeker 1
  const seekerUser1 = await prisma.user.create({
    data: {
      email: "budi@jobseeker.com",
      password: hashedPassword,
      name: "Budi Santoso",
      role: "JOB_SEEKER",
      jobSeekerProfile: {
        create: {
          phone: "081234567890",
          bio: "Experienced Full Stack Developer proficient in React & Node.js.",
          resumeUrl: "https://example.com/resumes/budi-santoso.pdf",
        },
      },
    },
  });

  // 4. Create Job Seeker 2
  await prisma.user.create({
    data: {
      email: "siti@jobseeker.com",
      password: hashedPassword,
      name: "Siti Rahma",
      role: "JOB_SEEKER",
      jobSeekerProfile: {
        create: {
          phone: "082345678901",
          bio: "Junior Frontend Developer eager to build scalable web applications.",
          resumeUrl: "https://example.com/resumes/siti-rahma.pdf",
        },
      },
    },
  });

  // 5. Seed Jobs
  const job1 = await prisma.job.create({
    data: {
      companyId: companyUser1.companyProfile!.id,
      title: "Senior Full Stack Developer",
      description:
        "Looking for an experienced Full Stack Developer with deep knowledge in Node.js, TypeScript, PostgreSQL, and React.",
      location: "Jakarta (Hybrid)",
      salary: 18000000,
      jobType: "FULL_TIME",
    },
  });

  const job2 = await prisma.job.create({
    data: {
      companyId: companyUser1.companyProfile!.id,
      title: "Backend Engineer (Node.js)",
      description: "Build robust REST APIs and microservices using Express, Prisma, and PostgreSQL.",
      location: "Jakarta (Remote)",
      salary: 14000000,
      jobType: "REMOTE",
    },
  });

  await prisma.job.create({
    data: {
      companyId: companyUser2.companyProfile!.id,
      title: "UI/UX Designer & Frontend Developer",
      description: "Design modern clean web interfaces in Figma and implement in React with Tailwind CSS.",
      location: "Bandung (Onsite)",
      salary: 9500000,
      jobType: "FULL_TIME",
    },
  });

  // 6. Seed Application & History
  const application1 = await prisma.application.create({
    data: {
      jobId: job1.id,
      seekerId: seekerUser1.id,
      status: "REVIEWING",
      coverLetter: "I have 4 years of experience building modern web apps with React and Node.js.",
      history: {
        createMany: {
          data: [
            {
              status: "APPLIED",
              notes: "Application submitted",
              changedByUserId: seekerUser1.id,
            },
            {
              status: "REVIEWING",
              notes: "Candidate profile passed initial screening",
              changedByUserId: companyUser1.id,
            },
          ],
        },
      },
    },
  });

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
