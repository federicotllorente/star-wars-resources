import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom'

import { getResourceList, getResourceTypeList, getSignedInUserInSessionStorage } from './helpers'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Home } from './pages/Home'
import { ResourceOverview } from './pages/ResourceOverview'
import { ResourceList, ResourceTypeList } from './types'

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
        
        const resources: ResourceTypeList = await getResourceTypeList()
        console.log('resources', resources)
        return { resources: Object.keys(resources) }
      }
    },
    {
      path: 'resources/:resourceId',
      element: <ResourceOverview />,
      errorElement: <div>Error 404</div>,
      loader: async ({ params }) => {
        if (!params.resourceId) throw new Error
        
        const resources: ResourceList = await getResourceList(params.resourceId)
        if (!resources) throw new Error
        
        return { ...resources, resourceId: params.resourceId }
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
