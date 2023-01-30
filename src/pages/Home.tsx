import {
  Typography} from '@mui/material'
import { Layout } from '../components/Layout'
import { getSignedInUserInSessionStorage } from '../helpers'

export const Home = () => {
  const signedInUser = getSignedInUserInSessionStorage()

  return (
    <Layout>
      <Typography component="h2" variant="h5">
        {`Hello, ${signedInUser?.firstName}!`}
      </Typography>
    </Layout>
  )
}
