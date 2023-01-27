import { User, UserCredentials } from '../types'
import { getSignedUpUser } from './localStorage'

const getSignedInUserInSessionStorage = (): User | undefined => {
  const allSignedUpUsersStr = sessionStorage.getItem('currentSignedInUser') ?? ''
  return allSignedUpUsersStr ? JSON.parse(allSignedUpUsersStr) : undefined
}

const setSignedInUserInSessionStorage = (user: User): void => {
  sessionStorage.setItem('currentSignedInUser', JSON.stringify(user))
}

export const setSignedInUser = (credentials: UserCredentials) => {
  if (getSignedInUserInSessionStorage()) throw new Error('Already signed in')

  const signedUpUser = getSignedUpUser(credentials)
  
  if (signedUpUser) {
    setSignedInUserInSessionStorage(signedUpUser)
  } else {
    throw new Error('User not found')
  }
}
