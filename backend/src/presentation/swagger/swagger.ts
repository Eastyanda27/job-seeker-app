import swaggerJSDoc from "swagger-jsdoc";

const port = process.env.PORT || 5000;

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Seeker App API Documentation",
      version: "1.0.0",
      description: "Swagger API Documentation following KRM architecture style for Job Seeker App backend.",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password", "role"],
          properties: {
            name: { type: "string", example: "John Doe" },
            email: { type: "string", format: "email", example: "john@example.com" },
            password: { type: "string", format: "password", example: "secret123" },
            role: { type: "string", enum: ["JOB_SEEKER", "COMPANY"], example: "JOB_SEEKER" },
            companyName: { type: "string", example: "Tech Corp" },
            location: { type: "string", example: "Jakarta" },
            description: { type: "string", example: "Software development agency" },
            phone: { type: "string", example: "08123456789" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "john@example.com" },
            password: { type: "string", format: "password", example: "secret123" },
          },
        },
        CreateJobRequest: {
          type: "object",
          required: ["title", "description", "location", "salary", "jobType"],
          properties: {
            title: { type: "string", example: "Senior Backend Developer" },
            description: { type: "string", example: "Build scalable TypeScript microservices" },
            location: { type: "string", example: "Jakarta" },
            salary: { type: "integer", example: 15000000 },
            jobType: { type: "string", enum: ["FULL_TIME", "PART_TIME", "REMOTE", "CONTRACT"], example: "FULL_TIME" },
          },
        },
        ApplyJobRequest: {
          type: "object",
          required: ["jobId"],
          properties: {
            jobId: { type: "string", format: "uuid" },
            coverLetter: { type: "string", example: "I am excited to apply for this role!" },
          },
        },
        UpdateStatusRequest: {
          type: "object",
          required: ["status"],
          properties: {
            status: { type: "string", enum: ["APPLIED", "REVIEWING", "SHORTLISTED", "REJECTED", "ACCEPTED"] },
            notes: { type: "string", example: "Candidate passed the initial interview" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "/api",
        description: "Current Host API",
      },
      {
        url: `http://localhost:${port}/api`,
        description: "Localhost",
      },
    ],
  },
  apis: ["./src/presentation/routes/*.ts", "./dist/presentation/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);

