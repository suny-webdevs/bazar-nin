import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { Calendar, ShieldUser, User } from "lucide-react"
import { headers } from "next/headers"
import Image from "next/image"
import { unauthorized } from "next/navigation"

const ProfilePage = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user

  if (!user) unauthorized()

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold tracking-wide">Profile</h1>
        <p className="text-muted-foreground font-mono">
          Welcome back! Here&apos;s your account overview
        </p>
      </div>
      <Card className="mt-10 overflow-hidden">
        <CardHeader>
          <p className="flex items-center gap-2 text-xl font-bold">
            <User className="size-5" /> Profile Information
          </p>
          <p className="text-muted-foreground text-sm">
            Your account details and current status
          </p>
        </CardHeader>
        <CardContent className="flex items-center gap-5">
          <div className="size-[100px] flex flex-col justify-center items-center gap-2">
            <Image
              src={
                "https://res.cloudinary.com/dzarjul50/image/upload/v1763924353/bazar-nin/01760491633%20b.jpg"
              }
              alt="alt"
              width={500}
              height={500}
              className="object-cover object-top size-full rounded-full border"
            />
            <div className="flex flex-col justify-center gap-0">
              <Badge>
                <ShieldUser /> Admin
              </Badge>
              <Badge
                variant={"secondary"}
                className="hidden"
              >
                <ShieldUser className="size-4" /> Customer
              </Badge>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-medium">{user?.name}</h1>
            <p className="text-xl text-muted-foreground">{user?.email}</p>
            <p className="flex items-center gap-2 text-sm">
              <Calendar className="size-4" /> Member since
            </p>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  )
}

export default ProfilePage
