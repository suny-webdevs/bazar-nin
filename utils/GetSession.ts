import { cookies } from "next/headers"
import { cache } from "react"
import { verifySessionToken } from "./JwtToken"
import { fetchGET } from "@/lib/fetch-data"
import { JwtPayload } from "jsonwebtoken"
import { User } from "@/lib/generated/prisma/client"

export type ServerSession = {
  session: JwtPayload
  user: User
}

export const getServerSession = cache(
  async (): Promise<ServerSession | null> => {
    const cookieStore = await cookies()

    const token = cookieStore.get("session-token")?.value
    if (token) {
      const jwtPayload = verifySessionToken(token!)
      if (jwtPayload?.ok) {
        const user = await fetchGET(`users/${jwtPayload?.payload?.id}`)
        return { session: jwtPayload, user }
      }
    }
    return null
  }
)
