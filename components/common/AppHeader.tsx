import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { SidebarTrigger } from "../ui/sidebar"
import { ModeToggle } from "./ModeToggle"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import Link from "next/link"
import { getServerSession } from "@/utils"
import { authLogout } from "@/lib/actions/auth"
import { ResponsiveSearch } from "./ResponsiveSearchBar"
import { ShoppingBag } from "lucide-react"

const menuItems: {
  admin: { label: string; url: string }[]
  customer: { label: string; url: string }[]
} = {
  admin: [
    {
      label: "Profile",
      url: "/profile",
    },
    {
      label: "Products",
      url: "/products",
    },
    {
      label: "Orders",
      url: "/orders",
    },
  ],
  customer: [
    {
      label: "Profile",
      url: "/profile",
    },
    {
      label: "Orders",
      url: "/orders",
    },
    {
      label: "Payment History",
      url: "/payment-history",
    },
    {
      label: "Payment Methods",
      url: "/payment-methods",
    },
  ],
}

const AppHeader = async () => {
  const session = await getServerSession()

  return (
    <div className="px-5 py-3 grid grid-cols-2 lg:grid-cols-4 items-center bg-primary text-white backdrop-blur-xl sticky top-0 left-0 z-50">
      <div className="h-5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          {/* Sidebar trigger */}
          <SidebarTrigger className="text-white" />
          {/* Header title */}
          <Link
            href={"/"}
            className="text-3xl font-bold flex items-center gap-2"
          >
            <ShoppingBag className="size-8" /> BazarNin
          </Link>
        </div>
      </div>
      {/* Header search bar */}
      <div className="lg:col-span-2 hidden lg:flex size-full items-center justify-center">
        <ResponsiveSearch />
      </div>
      <div className="flex items-center justify-end gap-2">
        <ModeToggle />
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="border">
                <AvatarImage
                  src={session?.user?.image as string}
                  alt={session?.user?.name?.charAt(0)}
                />
                <AvatarFallback>
                  {session?.user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56"
              align="start"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {session?.session?.role === "ADMIN"
                  ? menuItems.admin.map((item, index) => (
                      <DropdownMenuItem
                        className="cursor-pointer"
                        key={index}
                        asChild
                      >
                        <Link href={item.url}>{item.label}</Link>
                      </DropdownMenuItem>
                    ))
                  : menuItems.customer.map((item, index) => (
                      <DropdownMenuItem
                        className="cursor-pointer"
                        key={index}
                        asChild
                      >
                        <Link href={item.url}>{item.label}</Link>
                      </DropdownMenuItem>
                    ))}
                <DropdownMenuItem onClick={authLogout}>Logout</DropdownMenuItem>
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
        )}
      </div>
    </div>
  )
}

export default AppHeader
