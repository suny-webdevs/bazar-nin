import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "./utils"

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("session-token")
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  const session = await getServerSession()
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
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
