import { UserValidationSchema } from "@/lib/validation/UserValidation"
import z from "zod"

type createUser = z.infer<typeof UserValidationSchema.CreateUser>

export type TUser = {
  "create-user": createUser
}
