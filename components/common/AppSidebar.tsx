import {
  LayoutDashboard,
  UserCircle,
  GalleryHorizontalEnd,
  NotebookPen,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Separator } from "../ui/separator"

const items_1 = [
  {
    title: "Offers",
    url: "/offers",
  },
  {
    title: "Bazar Club",
    url: "/bazar-club",
  },
]

const items_2 = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserCircle,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: GalleryHorizontalEnd,
  },
  {
    title: "Blogs",
    url: "/blogs",
    icon: NotebookPen,
  },
]

const AppSidebar = async () => {
  const users = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
    method: "GET",
  })
  console.log({ users })
  return (
    <Sidebar className="border-none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items_1.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {items_2.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
