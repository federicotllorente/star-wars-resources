import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

export type UserCredentials = {
  email: string
  password: string
}

export type User = UserCredentials & {
  firstName: string
  lastName?: string
}

export type AppBarProps = MuiAppBarProps & {
  open?: boolean
}

export type ResourceTypeList = {
  [key: string]: string
}

export type Resource = unknown // TODO

export type ResourceList = {
  count: number
  next: string | null
  previous: string | null
  resourceId: string
  results: Resource[]
}
