import { getSignedInUserInSessionStorage } from '../helpers'

export const Home = () => {
  const signedInUser = getSignedInUserInSessionStorage()

  return <div>Home</div>
}
