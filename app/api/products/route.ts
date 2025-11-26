/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma"
import {
  ResCreated,
  ResError,
  ResGlobal,
  ResOk,
  UploadFilesToCloudinary,
} from "@/utils"

export const POST = async (request: Request) => {
  try {
    const form = await request.formData()

    const rawFiles = form.getAll("files")
    const files = rawFiles.filter((file): file is File => file instanceof File)

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

    if (files) {
      const photos = await UploadFilesToCloudinary(files)
      payload.images = photos.map((photo) => photo.secure_url)
      payload.imagesPublicId = photos.map((photo) => photo.public_id)
    }

    const res = await prisma.product.create({ data: payload })
    return ResCreated("Product created successfully", res)
  } catch (error) {
    return ResError(error)
  }
}

export const GET = async () => {
  try {
    const res = await prisma.product.findMany()
    ResOk("Products fetched successfully", res)
  } catch (error) {
    return ResError(error)
  }
}
