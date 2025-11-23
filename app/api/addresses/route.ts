import prisma from "@/lib/prisma"
import { ResCreated, ResError, ResOk } from "@/utils"

export const POST = async (request: Request) => {
  try {
    const payload = await request.json()
    const res = await prisma.address.create({ data: payload })
    return ResCreated("Address created successfully", res)
  } catch (error) {
    return ResError(error)
  }
}

export const GET = async () => {
  try {
    const res = await prisma.address.findMany()
    ResOk("Addresses fetched successfully", res)
  } catch (error) {
    return ResError(error)
  }
}
