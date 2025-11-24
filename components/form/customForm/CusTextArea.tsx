import { Controller, useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type TCusInput = {
  label?: string
  name: string
  placeholder: string
  className?: string
}

const CusTextArea = ({ label, name, placeholder, className }: TCusInput) => {
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
            <Textarea
              {...field}
              placeholder={placeholder}
              className="h-32"
              {...register(name)}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        )}
      />
    </div>
  )
}

export default CusTextArea
