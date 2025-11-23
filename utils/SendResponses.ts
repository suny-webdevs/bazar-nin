/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { NextResponse } from "next/server"
import HSC from "http-status-codes"

export const ResOk = async (message: string, data: Record<string, any>) => {
  return NextResponse.json({ success: true, message, data }, { status: HSC.OK })
}

export const ResCreated = async (
  message: string,
  data: Record<string, any>
) => {
  return NextResponse.json(
    { success: true, message, data: data },
    { status: HSC.CREATED }
  )
}

export const ResError = async (error: any) => {
  return NextResponse.json(
    { success: false, message: "Something went wrong", error },
    { status: HSC.INTERNAL_SERVER_ERROR }
  )
}

export const ResGlobal = async (
  statusCode: number,
  success: boolean,
  message: string,
  data?: [Record<string, any>] | Record<string, any>
) => {
  return NextResponse.json({ success, message, data }, { status: statusCode })
}
