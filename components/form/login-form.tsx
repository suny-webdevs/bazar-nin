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
import { FieldDescription, FieldGroup } from "@/components/ui/field"
import Link from "next/link"
import CusForm from "./customForm/CusForm"
import CusInput from "./customForm/CusInput"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { authLogin } from "@/lib/actions/auth"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const route = useRouter()

  const defaultValues = {
    email: "",
    password: "",
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await authLogin("login", data)

      if (res?.success) {
        route.push("/")
        toast.success(res?.message)
      } else {
        if (res?.error) {
          toast.warning(res?.error?.body?.message)
        } else {
          toast.warning(res?.message)
        }
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
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CusForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
          >
            <FieldGroup>
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
              <Button type="submit">Login</Button>
              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link href="/register">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </CusForm>
        </CardContent>
      </Card>
    </div>
  )
}
