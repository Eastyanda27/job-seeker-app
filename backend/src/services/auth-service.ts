import bcrypt from "bcryptjs";
import { UserRepository } from "@/domain/service/user-repository";
import { RegisterDto, LoginDto } from "@/dto/auth-dto";
import { generateToken, TokenPayload } from "@/libs/jwt";
import { AppError } from "@/libs/exceptions";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(input: RegisterDto) {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      throw new AppError("Email already registered", 400);
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await this.userRepository.createWithProfile(input, hashedPassword);

    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      companyId: user.companyProfile?.id,
    };

    const token = generateToken(tokenPayload);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyProfile: user.companyProfile,
        jobSeekerProfile: user.jobSeekerProfile,
      },
      token,
    };
  }

  async login(input: LoginDto) {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      companyId: user.companyProfile?.id,
    };

    const token = generateToken(tokenPayload);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyProfile: user.companyProfile,
        jobSeekerProfile: user.jobSeekerProfile,
      },
      token,
    };
  }

  async getMe(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      companyProfile: user.companyProfile,
      jobSeekerProfile: user.jobSeekerProfile,
    };
  }
}

