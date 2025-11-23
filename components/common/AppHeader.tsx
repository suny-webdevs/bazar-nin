// import { Separator } from "@radix-ui/react-separator"
import { SidebarTrigger } from "../ui/sidebar"
import { ModeToggle } from "./ModeToggle"

const AppHeader = () => {
  return (
    <div className="px-5 py-3 flex items-center justify-between bg-primary text-white backdrop-blur-xl sticky top-0 left-0 z-50">
      <div className="h-5 flex items-center space-x-4">
        <SidebarTrigger />
        {/* <Separator orientation="vertical" /> */}
        <h1 className="text-3xl font-bold">BazarNin</h1>
      </div>
      <ModeToggle />
    </div>
  )
}

export default AppHeader
