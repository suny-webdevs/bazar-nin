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

const menuItems: { label: string; url: string }[] = [
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
  {
    label: "Payment History",
    url: "/payment-history",
  },
  {
    label: "Payment Methods",
    url: "/payment-methods",
  },
]

const AppHeader = async () => {
  const session = await getServerSession()

  return (
    <div className="px-5 py-3 grid grid-cols-12 items-center bg-primary text-white backdrop-blur-xl sticky top-0 left-0 z-50">
      <div className="col-span-10 h-5 flex items-center space-x-4">
        {/* Sidebar trigger */}

        <SidebarTrigger />
        {/* Header title */}
        <Link
          href={"/"}
          className="text-3xl font-bold"
        >
          BazarNin
        </Link>
        {/* Header search bar */}
        <input
          type="search"
          name="search"
          placeholder="Search products (e.g. eggs, milk, potato)"
          className="flex-1 px-5 py-2 bg-white text-gray-900 rounded-md placeholder:text-gray-500 focus:ring-0 focus:outline-0"
        />
      </div>
      <div className="col-span-2 flex items-center justify-end gap-2">
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
                {menuItems.map((item, index) => (
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
