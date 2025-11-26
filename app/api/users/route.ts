/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import {
  // hashPassword,
  ResCreated,
  ResError,
  ResGlobal,
  ResOk,
  UploadFileToCloudinary,
} from "@/utils"
import HSC from "http-status-codes"
import { headers } from "next/headers"

export const POST = async (req: Request) => {
  try {
    const form = await req.formData()

    const rawFile = form.get("file")
    const file = rawFile instanceof File ? rawFile : null

    const rawData = form.get("data")
    if (!rawData || typeof rawData !== "string") {
      return ResGlobal(400, false, "Invalid request payload")
    }

    let payload

    try {
      payload = JSON.parse(rawData)
    } catch (e: any) {
      return ResGlobal(400, false, "Invalid JSON body", e)
    }

    const isUserExist = await prisma.user.findUnique({
      where: { email: payload.email },
    })

    if (isUserExist) {
      return ResGlobal(HSC.CONFLICT, false, "User already exist")
    }
    if (file) {
      const { secure_url } = await UploadFileToCloudinary(file)
      payload.image = secure_url
    }

    const res = await auth.api.signUpEmail({
      body: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      },
      headers: await headers(),
    })

    return ResCreated("Successfully registered", res)
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
