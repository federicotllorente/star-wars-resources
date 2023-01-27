export type UserCredentials = {
  email: string
  password: string
}

export type User = UserCredentials & {
  firstName: string
  lastName?: string
}
