"use server"

import { FieldValues } from "react-hook-form"
import { fetchPOST } from "../fetch-data"
import { cookies } from "next/headers"

export const authLogin = async (url: string, payload: FieldValues) => {
  try {
    const res = await fetchPOST(url, payload)
    const cookieStore = await cookies()
    if (res?.success) {
      cookieStore.set("session-token", res?.data?.sessionToken)
      cookieStore.set("refresh-token", res?.data?.refreshToken)
    }
    return res
  } catch (error) {
    console.log(error)
  }
}

export const authLogout = async () => {
  try {
    const cookieStore = await cookies()
    if (cookieStore.get("session-token")) {
      cookieStore.delete("session-token")
    }
  } catch (error) {
    console.log(error)
  }
}
