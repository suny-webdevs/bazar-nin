import prisma from "@/lib/prisma"
import { ResError, ResOk } from "@/utils"
import { NextRequest } from "next/server"

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const res = await prisma.user.findUnique({ where: { id } })
    return ResOk("User fetched successfully", res!)
  } catch (error) {
    return ResError(error)
  }
}
