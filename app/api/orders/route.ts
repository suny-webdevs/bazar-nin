import prisma from "@/lib/prisma"
import { ResCreated, ResError, ResOk } from "@/utils"

export const POST = async (request: Request) => {
  try {
    const payload = await request.json()
    const res = await prisma.order.create({ data: payload })
    return ResCreated("Order created successfully", res)
  } catch (error) {
    return ResError(error)
  }
}

export const GET = async () => {
  try {
    const res = await prisma.order.findMany()
    ResOk("Orders fetched successfully", res)
  } catch (error) {
    return ResError(error)
  }
}
