import { Loader } from "lucide-react"

const Loading = () => {
  return (
    <div className="absolute bg-primary-foreground w-full h-screen z-10">
      <Loader className="size-10 animate-spin" />
    </div>
  )
}

export default Loading
