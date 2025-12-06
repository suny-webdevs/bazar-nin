type UniqueResponse<T> = {
  success: boolean
  message: string
  data: T
}

type ManyResponse<T> = {
  success: boolean
  message: string
  data: T[]
}

export type TResponse<T> = {
  unique: UniqueResponse<T>
  many: ManyResponse<T>
}
