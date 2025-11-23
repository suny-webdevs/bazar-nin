import prisma from "@/lib/prisma"
import { ResCreated, ResError, ResOk, UploadFilesToCloudinary } from "@/utils"

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData()

    const data = formData.get("data") as string
    const files = formData.getAll("files") as File[]

    const payload = JSON.parse(data)

    const photos = await UploadFilesToCloudinary(files)

    const finalPayload = {
      ...payload,
      images: [photos[0].secure_url],
      imagesPublicId: [photos[0].public_id],
    }

    const res = await prisma.product.create({ data: finalPayload })
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
