/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidatePath } from "next/cache"
import { FieldValues } from "react-hook-form"

export const fetchPOST = async (
  url: string,
  payload: FieldValues,
  reValidPath?: string
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    const data = await res.json()

    if (data?.success && reValidPath) {
      revalidatePath(reValidPath)
    }

    return data
  } catch (error: any) {
    // throw new Error(error.message)
    console.log(error)
  }
}

export const fetchFormPOST = async (
  url: string,
  formData: FormData,
  reValidPath?: string
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`, {
      method: "POST",
      body: formData,
    })
    console.log({ res })
    const data = await res.json()
    console.log({ data })
    if (data?.success && reValidPath) {
      revalidatePath(reValidPath)
    }

    return data
  } catch (error: any) {
    // throw new Error(error.message)
    console.log(error)
  }
}
