import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Controller, useFormContext } from "react-hook-form"

type TCusInput = {
  label: string
  type?: "text" | "email" | "password" | "url"
  name: string
  placeholder: string
  className?: string
}

const CusInput = ({
  label,
  type = "text",
  name,
  placeholder,
  className,
}: TCusInput) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]?.message as string | undefined

  return (
    <div className={className}>
      <Controller
        name={name}
        render={({ field }) => (
          <div className="space-y-2">
            <Label>{label}</Label>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              {...register(name)}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        )}
      />
    </div>
  )
}

export default CusInput
