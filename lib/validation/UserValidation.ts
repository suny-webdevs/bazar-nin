import z from "zod"

const CreateUser = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  phone: z.string().min(1, "Phone is required"),
  image: z.file().optional(),
})

export const UserValidationSchema = { CreateUser }
