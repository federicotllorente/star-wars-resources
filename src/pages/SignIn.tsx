import { useNavigate, useNavigation } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link
} from '@mui/material'

import { getSignedUpUser, setSignedInUser } from '../helpers'
import { UserCredentials } from '../types'
import { NavigationLoader } from '../components/NavigationLoader'

export const SignIn = () => {
  const { state: navigationState } = useNavigation()
  const navigate = useNavigate()
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    
    const data = new FormData(e.currentTarget)
    const submittedCredentials = {
      email: data.get('email'),
      password: data.get('password')
    }
    
    if (!submittedCredentials.email || !submittedCredentials.password) {
      alert('Please fill all the required fields to sign in')
      return
    }
    
    const existentUser = getSignedUpUser(submittedCredentials as UserCredentials)
    if (!existentUser) {
      alert('The credentials you entered are not valid. Please retry or create a new account')
      return
    }
    
    setSignedInUser(submittedCredentials as UserCredentials)
    navigate('/')
  }
  
  if (navigationState === 'loading') return <NavigationLoader />
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Link href="sign-up" variant="body2">
            {'Don\'t have an account? Sign Up'}
          </Link>
        </Box>
      </Box>
    </Container>
  )
}
