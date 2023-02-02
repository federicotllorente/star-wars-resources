import { Box, CircularProgress } from '@mui/material'

export const NavigationLoader = () => (
  <Box
    sx={{
      width: '100%',
      marginTop: '50vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center' 
    }}
  >
    <CircularProgress />
  </Box>
)
