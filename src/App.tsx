import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom'

import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Home } from './pages/Home'
import { getSignedInUserInSessionStorage } from './helpers'

const defaultLoader = async () => {
  const signedInUser = getSignedInUserInSessionStorage()
  if (signedInUser) throw redirect('/')
  return null
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <div>Error 404</div>,
      loader: async () => {
        const signedInUser = getSignedInUserInSessionStorage()
        if (!signedInUser) throw redirect('/sign-in')
        return null
      }
    },
    {
      path: '/sign-in',
      element: <SignIn />,
      loader: defaultLoader
    },
    {
      path: '/sign-up',
      element: <SignUp />,
      loader: defaultLoader
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
