import prisma from "@/lib/prisma"
import { ResCreated, ResError } from "@/utils"

export const POST = async (req: Request) => {
  try {
    const payload = await req.json()
    const res = await prisma.userProfile.create({ data: payload })
    return ResCreated("User profile created", res)
  } catch (error) {
    return ResError(error)
  }
}
