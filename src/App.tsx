import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom'

import { getResourceList, getResourceTypeList, getSignedInUserInSessionStorage, searchResource } from './helpers'
import { ResourceSearchList } from './types'

import { Home } from './pages/Home'
import { ResourceOverview } from './pages/ResourceOverview'
import { ResourceSearchOverview } from './pages/ResourceSearchOverview'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

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
        
        const resources = await getResourceTypeList()
        return { resources: resources ? Object.keys(resources) : [] }
      }
    },
    {
      path: 'resources/:resourceId',
      element: <ResourceOverview />,
      errorElement: <div>Error 404</div>,
      loader: async ({ params }) => {
        if (!params.resourceId) throw new Error
        
        const resources = await getResourceList(params.resourceId)
        if (!resources) throw new Error
        
        return { ...resources, resourceId: params.resourceId }
      }
    },
    {
      path: 'search/:searchInput',
      element: <ResourceSearchOverview />,
      errorElement: <div>Error 404</div>,
      loader: async ({ params }) => {
        if (!params.searchInput) throw new Error
        
        const resourceTypes = await getResourceTypeList()
        if (!resourceTypes) throw new Error

        const totalResources: ResourceSearchList = {}
        for (let i = 0; i < Object.keys(resourceTypes).length; i++) {
          const resourceType = Object.keys(resourceTypes)[i]

          const resources = await searchResource(resourceType, params.searchInput ?? '')

          if (resources?.results) {
            totalResources[resourceType] = resources
          }
        }

        return { ...totalResources, searchInput: params.searchInput }
      }
    },
    {
      path: 'search/:resourceId/:searchInput',
      element: <ResourceOverview />,
      errorElement: <div>Error 404</div>,
      loader: async ({ params }) => {
        if (!params.resourceId || !params.searchInput) throw new Error
        
        const resources = await searchResource(params.resourceId, params.searchInput ?? '')
        if (!resources) throw new Error

        return { ...resources, resourceId: params.resourceId, searchInput: params.searchInput }
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
