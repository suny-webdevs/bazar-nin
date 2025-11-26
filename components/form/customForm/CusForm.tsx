"use client"

import { ReactNode } from "react"
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form"

type TFormConfig<T extends FieldValues> = {
  defaultValues?: UseFormProps<T>["defaultValues"]
  resolver?: UseFormProps<T>["resolver"]
}

type TFormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>
  children: ReactNode
  className?: string
} & TFormConfig<T>

const CusForm = <T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  resolver,
  className,
}: TFormProps<T>) => {
  const formConfig: TFormConfig<T> = {}

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues
  }

  if (resolver) {
    formConfig["resolver"] = resolver
  }

  const form = useForm<T>(formConfig)

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data)
          form.reset()
        })}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  )
}

export default CusForm
