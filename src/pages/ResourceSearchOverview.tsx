import { useMemo } from 'react'
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom'
import { Box, Button, Divider, Typography, useMediaQuery } from '@mui/material'

import { ResourceSearchList } from '../types'
import { Layout } from '../components/Layout'
import { ResourceCardGrid } from '../components/ResourceCardGrid'
import { NavigationLoader } from '../components/NavigationLoader'

export const ResourceSearchOverview = () => {
  const {
    resources: resourceSearchList,
    searchInput
  } = useLoaderData() as {
    resources: ResourceSearchList
    searchInput: string
  }

  const { state: navigationState } = useNavigation()
  const navigate = useNavigate()

  const isMobileOrLarger = useMediaQuery('(min-width:425px)')

  const acumulatedFoundResources = useMemo(
    () =>
      Object.keys(resourceSearchList).reduce(
        (acumulatedQty, currentKey) =>
          acumulatedQty + resourceSearchList[currentKey].results.length,
        0
      ),
    [resourceSearchList]
  )

  if (navigationState === 'loading') return <NavigationLoader />
  if (!resourceSearchList) return null
  return (
    <Layout>
      {acumulatedFoundResources == 0
        ? (
          <>
            <Typography component="h2" variant="h5">
              {`Sorry, there were no matching results for '${searchInput}'`}
            </Typography>
            <Typography component="span" variant="body1" sx={{ paddingTop: 2 }}>
              Please try again with other keywords
            </Typography>
          </>
        ) : (
          <>
            <Typography
              component="span"
              variant="body1"
              sx={{
                paddingBottom: 4,
                ...(isMobileOrLarger && { textAlign: 'right' })
              }}
            >
              {`Showing ${acumulatedFoundResources} results for '${searchInput}'`}
            </Typography>
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
          </>
        )}
    </Layout>
  )
}
