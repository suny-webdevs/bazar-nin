import { Spinner } from "../ui/spinner"

const Loading = () => {
  return (
    <div className="flex items-center gap-2">
      <Spinner className="size-7" />{" "}
      <span className="text-xl font-semibold">Please wait...</span>
    </div>
  )
}

export default Loading
