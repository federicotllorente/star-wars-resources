import { useLoaderData, useNavigate } from 'react-router-dom'
import { Box, Button, Divider } from '@mui/material'
import { ResourceSearchList } from '../types'
import { Layout } from '../components/Layout'
import { ResourceCardGrid } from '../components/ResourceCardGrid'

export const ResourceSearchOverview = () => {
  const {
    resources: resourceSearchList,
    searchInput
  } = useLoaderData() as {
    resources: ResourceSearchList
    searchInput: string
  }

  const navigate = useNavigate()

  if (!resourceSearchList) return null
  return (
    <Layout>
      {Object.keys(resourceSearchList).map((resourceType, idx) =>
        resourceSearchList[resourceType].results.length > 0
          ? (
            <Box key={resourceType}>
              {idx !== 0 && (
                <Divider sx={{ marginTop: 4, marginBottom: 4 }} />
              )}
              <ResourceCardGrid
                title={`${resourceType.charAt(0).toUpperCase()}${resourceType.slice(1)}`}
                resourceList={resourceSearchList[resourceType].results}
              />
              <Button
                variant="contained"
                onClick={() => navigate(`/search/${resourceType}/${searchInput}`)}
                sx={{ width: 'fit-content' }}
              >
                Search more
              </Button>
            </Box>
          )
          : null
      )}
    </Layout>
  )
}
