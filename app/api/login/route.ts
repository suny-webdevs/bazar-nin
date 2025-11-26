import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { ResError, ResGlobal, ResOk } from "@/utils"
import { headers } from "next/headers"

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json()
    const isUserExist = await prisma.user.findUnique({
      where: { email },
    })

    if (!isUserExist) {
      return ResGlobal(404, false, "User not found")
    }

    const res = await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    })

    return ResOk("Login successfully", res!)
  } catch (error) {
    return ResError(error)
  }
}
