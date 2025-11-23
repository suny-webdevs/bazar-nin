import { Prisma, User } from "@/lib/generated/prisma/client"
import prisma from "@/lib/prisma"
import { hashPassword, ResCreated, ResError, ResGlobal, ResOk } from "@/utils"
import HSC from "http-status-codes"

export const POST = async (request: Request) => {
  try {
    const payload: Pick<User, "name" | "email" | "password" | "phone"> =
      await request.json()

    const isUserExist = await prisma.user.findUnique({
      where: { email: payload.email },
    })

    if (isUserExist) {
      return ResGlobal(HSC.CONFLICT, false, "User already exist")
    }

    const newHashedPassword = await hashPassword(payload.password)

    const finalPayload: Prisma.UserCreateInput = {
      ...payload,
      password: newHashedPassword,
    }

    const res = await prisma.user.create({
      data: finalPayload,
    })
    return ResCreated("User created successfully", res)
  } catch (error) {
    return ResError("Something went wrong", error)
  }
}

export const GET = async () => {
  try {
    const res = await prisma.user.findMany()
    return ResOk("Users fetched successfully", res)
  } catch (error) {
    return ResError("Something went wrong", error)
  }
}
