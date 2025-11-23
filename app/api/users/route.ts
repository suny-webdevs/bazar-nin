import { User } from "@/lib/generated/prisma/client"
import prisma from "@/lib/prisma"
import {
  hashPassword,
  ResCreated,
  ResError,
  ResGlobal,
  ResOk,
  UploadFileToCloudinary,
} from "@/utils"
import HSC from "http-status-codes"

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData()

    const data = formData.get("data") as string
    const file = formData.get("file") as File

    const payload: Pick<
      User,
      "name" | "email" | "password" | "phone" | "image" | "imagePublicId"
    > = JSON.parse(data)

    const isUserExist = await prisma.user.findUnique({
      where: { email: payload.email },
    })

    if (isUserExist) {
      return ResGlobal(HSC.CONFLICT, false, "User already exist")
    }

    const { public_id, secure_url } = await UploadFileToCloudinary(file)
    const newHashedPassword = await hashPassword(payload.password)

    const finalPayload = {
      ...payload,
      password: newHashedPassword,
      image: secure_url || null,
      imagePublicId: public_id || null,
    }

    const res = await prisma.user.create({
      data: finalPayload,
    })
    return ResCreated("User created successfully", res)
  } catch (error) {
    return ResError(error)
  }
}

export const GET = async () => {
  try {
    const res = await prisma.user.findMany()
    return ResOk("Users fetched successfully", res)
  } catch (error) {
    return ResError(error)
  }
}
