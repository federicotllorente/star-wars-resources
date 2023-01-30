import { Typography } from '@mui/material'
import { useLoaderData } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { ResourceList } from '../types'

export const ResourceOverview = () => {
  const resourceList = useLoaderData() as ResourceList
  console.log(resourceList)

  if (!resourceList) return null
  return (
    <Layout>
      <Typography component="h2" variant="h5">
        {`${resourceList.resourceId.charAt(0).toUpperCase()}${resourceList.resourceId.slice(1)}`}
      </Typography>
    </Layout>
  )
}
