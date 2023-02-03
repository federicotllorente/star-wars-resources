import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { Layout } from '../components/Layout'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <Typography component="h2" variant="h5">
        Sorry, we couldn&apos;t find this page
      </Typography>
      <Typography component="span" variant="body1" sx={{ paddingTop: 2 }}>
        Please try again with another one
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        sx={{ width: 'fit-content', marginTop: 2 }}
      >
        Return to the Homepage
      </Button>
    </Layout>
  )
}
