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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const defaultValues = {
    email: "",
    password: "",
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
            onSubmit={async (data) => console.log(data)}
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
