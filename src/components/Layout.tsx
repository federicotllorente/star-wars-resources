import { FunctionComponent, ReactNode } from 'react'
import {
  Container,
  Box,
  CssBaseline,
  useMediaQuery
} from '@mui/material'
import { BurgerMenu } from '../components/BurgerMenu'

export const Layout: FunctionComponent<{
  children: ReactNode | ReactNode[]
}> = ({
  children
}) => {
  const isTabletOrLarger = useMediaQuery('(min-width:768px)')

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <BurgerMenu />
      <Container component="main">
        <Box
          sx={{
            marginTop: isTabletOrLarger ? 12 : 10,
            marginBottom: 4,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  )
}
