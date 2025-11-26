/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import Link from "next/link"
import { FieldValues, SubmitHandler } from "react-hook-form"
import CusForm from "./customForm/CusForm"
import CusInput from "./customForm/CusInput"
import { toast } from "sonner"
import { fetchFormPOST } from "@/lib/fetch-data"
// import { signUp } from "@/lib/auth-client"
import CusUpload from "./customForm/CusUpload"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserValidationSchema } from "@/lib/validation/UserValidation"
import { TUser } from "@/types/User"
import { useRouter } from "next/navigation"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    image: undefined,
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const { image, email, name, password, phone } = data

      const formData = new FormData()

      if ((image !== undefined || null) && image instanceof File) {
        formData.append("file", image)
      }

      formData.append("data", JSON.stringify({ name, email, password, phone }))

      // const signingUp = await signUp.email({ name, email, password })
      // if (signingUp.error) {
      //   return toast.warning(signingUp.error.message)
      // }

      const res = await fetchFormPOST("users", formData)
      console.log({ res })
      if (res?.success) {
        router.push("/login")
        toast.success(res?.message)
      } else {
        toast.warning(res?.error?.body?.message)
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CusForm<TUser["create-user"]>
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            resolver={zodResolver(UserValidationSchema.CreateUser)}
          >
            <FieldGroup>
              <CusInput
                label="Name"
                name="name"
                type="text"
                placeholder="John Doe"
              />
              <CusInput
                label="Email"
                name="email"
                type="email"
                placeholder="m@example.com"
              />
              <CusInput
                label="Password"
                name="password"
                type="password"
                placeholder="*********"
              />
              <CusInput
                label="Phone"
                name="phone"
                type="text"
                placeholder="+88 01234 567890"
              />
              <CusUpload
                label="Upload Photo"
                name="image"
              />
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </CusForm>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
