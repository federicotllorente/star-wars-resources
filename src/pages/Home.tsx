import { Link, Typography } from '@mui/material'
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
      <Typography component="span" variant="body1" sx={{ paddingTop: 2 }}>
        Welcome to Star Wars Resources, a Star Wars encyclopedia where you can find interesting information about your favorite saga.
      </Typography>
      <Typography component="span" variant="body1" sx={{ paddingTop: 2 }}>
        This project was made by <Link href="https://federicotllorente.com/" target="_blank" rel="noreferrer">Federico Tejedor Llorente</Link>, using <Link href="https://reactjs.org/" target="_blank" rel="noreferrer">React</Link>, <Link href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">TypeScript</Link>, <Link href="https://mui.com/" target="_blank" rel="noreferrer">Material UI</Link> and the <Link href="https://swapi.dev/" target="_blank" rel="noreferrer">Star Wars API &apos;SWAPI&apos;</Link>. You can find the remote repository in GitHub <Link href="https://github.com/federicotllorente/star-wars-resources" target="_blank" rel="noreferrer">here</Link>.
      </Typography>
    </Layout>
  )
}
