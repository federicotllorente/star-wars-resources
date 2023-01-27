import { User, UserCredentials } from '../types'

const getAllSignedUpUsers = (): User[] => {
  const allSignedUpUsersStr = localStorage.getItem('allSignedUpUsers') ?? ''
  return allSignedUpUsersStr ? JSON.parse(allSignedUpUsersStr) : []
}

const setAllSignedUpUsers = (users: User[]): void => {
  localStorage.setItem('allSignedUpUsers', JSON.stringify(users))
}

export const getSignedUpUser = (credentials: UserCredentials): User | undefined => {
  const allSignedUpUsers = getAllSignedUpUsers()

  if (allSignedUpUsers.length == 0) return undefined

  return allSignedUpUsers.find(({ email, password }) =>
    email === credentials.email && password === credentials.password
  )
}

export const addSignedUpUser = (user: User): void => {
  const allSignedUpUsers = getAllSignedUpUsers()
  const userAlreadyExists = getSignedUpUser({
    email: user.email,
    password: user.password
  })

  if (userAlreadyExists) throw new Error('User already exists. Please log in or try with other credentials')

  if (allSignedUpUsers.length == 0) {
    setAllSignedUpUsers([user])
  } else {
    setAllSignedUpUsers([...allSignedUpUsers, user])
  }
}
