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
import CusInput from "./form/customForm/CusInput"
import CusForm from "./form/customForm/CusForm"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
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
          <CusForm
            onSubmit={async (data) => console.log(data)}
            defaultValues={defaultValues}
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
                label="Confirm password"
                name="confirm-password"
                type="password"
                placeholder="*********"
              />
              <CusInput
                label="Confirm password"
                name="confirm-password"
                type="password"
                placeholder="*********"
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
