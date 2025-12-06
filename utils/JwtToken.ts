/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRole } from "@/lib/generated/prisma/enums"
import jwt, { TokenExpiredError } from "jsonwebtoken"

const JWT_SECRET_SESSION = process.env.JWT_SECRET_SESSION
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH
const JWT_SECRET_EXPIRES_IN = "1d"
const JWT_REFRESH_EXPIRES_IN = "7d"

export interface JwtPayload {
  id: string
  email: string
  role: UserRole
}

export type ReturnVerifyTokenType = {
  ok: boolean
  payload?: JwtPayload
  expired?: boolean
  error?: any
  message?: string
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

export const verifySessionToken = (
  token: string
): ReturnVerifyTokenType | undefined => {
  try {
    if (!JWT_SECRET_SESSION)
      throw new Error("JWT_SECRET_SESSION is not configured")

    const payload = jwt.verify(token, JWT_SECRET_SESSION) as JwtPayload
    return { ok: true, payload }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return { ok: false, expired: true, message: error?.message }
    } else {
      return { ok: false, error }
    }
  }
}

export const verifyRefreshToken = (
  token: string
): ReturnVerifyTokenType | undefined => {
  try {
    if (!JWT_SECRET_REFRESH)
      throw new Error("JWT_SECRET_REFRESH is not configured")

    const payload = jwt.verify(token, JWT_SECRET_REFRESH) as JwtPayload
    return { ok: true, payload }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return { ok: false, expired: true, message: error?.message }
    } else {
      return { ok: false, error }
    }
  }
}
