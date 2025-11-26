import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Controller, useFormContext } from "react-hook-form"

type TCusUpload = {
  label: string
  name: string
  multiple?: boolean
  className?: string
}

const CusUpload = ({
  label,
  name,
  multiple = false,
  className,
}: TCusUpload) => {
  const {
    formState: { errors },
  } = useFormContext()

  const error = errors[name]?.message as string | undefined

  return (
    <div className={className}>
      <Controller
        name={name}
        render={({ field: { onChange, value, ...field } }) => (
          <div className="space-y-2">
            <Label>{label}</Label>
            <Input
              {...field}
              type="file"
              value={value?.fileName}
              multiple={multiple}
              onChange={(e) =>
                onChange(
                  multiple ? e.target.files : e.target.files?.[0] ?? null
                )
              }
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        )}
      />
    </div>
  )
}

export default CusUpload
