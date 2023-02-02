import { Typography } from '@mui/material'
import { useNavigation } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { NavigationLoader } from '../components/NavigationLoader'
import { getSignedInUserInSessionStorage } from '../helpers'

export const Home = () => {
  const { state: navigationState } = useNavigation()
  const signedInUser = getSignedInUserInSessionStorage()

  if (navigationState === 'loading') return <NavigationLoader />
  return (
    <Layout>
      <Typography component="h2" variant="h5">
        {`Hello, ${signedInUser?.firstName}!`}
      </Typography>
    </Layout>
  )
}
