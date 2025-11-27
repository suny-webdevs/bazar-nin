import { UserRole } from "@/lib/generated/prisma/enums"
import jwt from "jsonwebtoken"

const JWT_SECRET_SESSION = process.env.JWT_SECRET_SESSION
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH
const JWT_SECRET_EXPIRES_IN = "1d"
const JWT_REFRESH_EXPIRES_IN = "7d"

export interface JwtPayload {
  id: string
  email: string
  role: UserRole
}

export const generateSessionToken = (payload: JwtPayload): string => {
  if (!JWT_SECRET_SESSION)
    throw new Error("JWT_SECRET_SESSION is not configured")

  return jwt.sign(payload, JWT_SECRET_SESSION, {
    expiresIn: JWT_SECRET_EXPIRES_IN,
    algorithm: "HS256",
  })
}

export const generateRefreshToken = (payload: JwtPayload): string => {
  if (!JWT_SECRET_REFRESH)
    throw new Error("JWT_SECRET_REFRESH is not configured")

  return jwt.sign(payload, JWT_SECRET_REFRESH, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
    algorithm: "HS256",
  })
}

export const verifySessionToken = <T = JwtPayload>(token: string): T => {
  if (!JWT_SECRET_SESSION)
    throw new Error("JWT_SECRET_SESSION is not configured")

  return jwt.verify(token, JWT_SECRET_SESSION) as T
}

export const verifyRefreshToken = <T = JwtPayload>(token: string): T => {
  if (!JWT_SECRET_REFRESH)
    throw new Error("JWT_SECRET_REFRESH is not configured")

  return jwt.verify(token, JWT_SECRET_REFRESH) as T
}
