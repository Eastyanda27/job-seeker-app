import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "indokerja-super-secret-jwt-key-2026";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export interface TokenPayload {
  userId: string;
  email: string;
  role: "JOB_SEEKER" | "COMPANY";
  name: string;
  companyId?: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
