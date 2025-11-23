import bcrypt from "bcryptjs"

export const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 12)
  return hash
}

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const comparePassword = await bcrypt.compare(password, hashedPassword)
  return comparePassword
}
