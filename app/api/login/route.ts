import prisma from "@/lib/prisma"
import {
  ResError,
  ResGlobal,
  verifyPassword,
  generateRefreshToken,
  generateSessionToken,
  ResOk,
} from "@/utils"
import HSC from "http-status-codes"

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return ResGlobal(HSC.UNAUTHORIZED, false, "Invalid credentials")
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return ResGlobal(HSC.UNAUTHORIZED, false, "User not found")
    }

    const isPasswordCorrect = await verifyPassword(
      password,
      user.password as string
    )

    if (!isPasswordCorrect) {
      return ResGlobal(HSC.UNAUTHORIZED, false, "Incorrect password")
    }

    const jwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role!,
    }

    const sessionToken = generateSessionToken(jwtPayload)
    const refreshToken = generateRefreshToken(jwtPayload)

    const res = { sessionToken, refreshToken }
    return ResOk("Successfully logged in", res)
  } catch (error) {
    return ResError(error)
  }
}
