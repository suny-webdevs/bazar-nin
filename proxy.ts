import { NextRequest, NextResponse } from "next/server"
import { verifyRefreshToken, verifySessionToken } from "./utils"

export async function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get("session-token")?.value
  const refreshToken = request.cookies.get("refresh-token")?.value
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  const verifiedSession = verifySessionToken(sessionToken)!

  if (verifiedSession?.ok) {
    return NextResponse.next()
  }

  if (verifiedSession?.expired && refreshToken) {
    const verifiedRefresh = verifyRefreshToken(refreshToken)!

    if (!verifiedRefresh?.ok) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
  }
  return NextResponse.redirect(new URL("/", request.url))
}

export const config = {
  matcher: [
    "/profile",
    "/products",
    "/orders",
    "/payment-history",
    "/payment-methods",
  ],
}
