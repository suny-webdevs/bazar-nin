"use client"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { SidebarTrigger } from "../ui/sidebar"
import { ModeToggle } from "./ModeToggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react"
import { Button } from "../ui/button"
import Link from "next/link"

const AppHeader = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="px-5 py-3 grid grid-cols-12 items-center bg-primary text-white backdrop-blur-xl sticky top-0 left-0 z-50">
      <div className="col-span-10 h-5 flex items-center space-x-4">
        {/* Sidebar trigger */}
        {!pathname.includes("login") && !pathname.includes("register") && (
          <SidebarTrigger />
        )}
        {/* Header title */}
        <Link
          href={"/"}
          className="text-3xl font-bold"
        >
          BazarNin
        </Link>
        {/* Header search bar */}
        {!pathname.includes("login") && !pathname.includes("register") && (
          <input
            type="search"
            name="search"
            placeholder="Search products (e.g. eggs, milk, potato)"
            className="flex-1 px-5 py-2 bg-white text-gray-900 rounded-md placeholder:text-gray-500 focus:ring-0 focus:outline-0"
          />
        )}
      </div>
      <div className="col-span-2 flex items-center justify-end gap-2">
        <ModeToggle />
        {!pathname.includes("login") &&
          !pathname.includes("register") &&
          (session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="start"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuItem>Payment History</DropdownMenuItem>
                  <DropdownMenuItem>Payment Methods</DropdownMenuItem>
                  <DropdownMenuItem>Change Password</DropdownMenuItem>
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href={"/login"}>
              <Button
                variant={"outline"}
                className="bg-white border-none text-primary font-bold"
              >
                Login
              </Button>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default AppHeader
