import { useNavigate, useNavigation } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link
} from '@mui/material'

import { addSignedUpUser } from '../helpers'
import { User } from '../types'
import { NavigationLoader } from '../components/NavigationLoader'

export const SignUp = () => {
  const { state: navigationState } = useNavigation()
  const navigate = useNavigate()
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    
    const data = new FormData(e.currentTarget)
    const submittedUserData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password')
    }
    
    if (!submittedUserData.email || !submittedUserData.password || !submittedUserData.firstName) {
      alert('Please fill all the required fields to sign up')
      return
    }
    
    addSignedUpUser(submittedUserData as User)
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
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        
        <TextField
          autoComplete="given-name"
          name="firstName"
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
        />

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
        {/* TODO */}
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Link href="sign-in" variant="body2">
            Already have an account? Sign in
          </Link>
        </Box>
      </Box>
    </Container>
  )
}
