import { LoginForm } from "@/components/form/login-form"
import { GalleryVerticalEnd } from "lucide-react"
import Link from "next/link"

const LoginPage = () => {
  return (
    <div className="bg-transparent flex h-full flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Bazar Nin
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
