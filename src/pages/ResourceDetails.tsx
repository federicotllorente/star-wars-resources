import { useCallback, useMemo } from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom'
import { Box, Typography, Grid, useMediaQuery } from '@mui/material'

import { Resource } from '../types'
import { Layout } from '../components/Layout'
import { LinkForUrlResourceItem } from '../components/LinkForUrlResourceItem'
import { CardForUrlArrayResourceItems } from '../components/CardForUrlArrayResourceItems'
import { NavigationLoader } from '../components/NavigationLoader'

export const ResourceDetails = () => {
  const { state: navigationState } = useNavigation()
  const resource = useLoaderData() as Resource

  const isMobileOrLarger = useMediaQuery('(min-width:425px)')
  const isTabletOrLarger = useMediaQuery('(min-width:768px)')

  const isKeyToIgnore = useCallback(
    (key: string): boolean =>
      key !== 'name' && key !== 'title' && key !== 'url' && key !== 'created' && key !== 'edited',
    [resource]
  )

  const urlResourceItems = useMemo(() => Object.keys(resource).filter(key =>
    isKeyToIgnore(key) && !Array.isArray(resource[key]) && `${resource[key]}`.startsWith('https://')
  ), [resource])

  const urlArrayResourceItems = useMemo(() => Object.keys(resource).filter(key =>
    isKeyToIgnore(key) && Array.isArray(resource[key])
  ), [resource])

  const restResourceItems = useMemo(() => Object.keys(resource).filter(key =>
    isKeyToIgnore(key) && !Array.isArray(resource[key]) && !`${resource[key]}`.startsWith('https://')
  ), [resource])

  if (navigationState === 'loading') return <NavigationLoader />
  if (!resource) return null
  return (
    <Layout>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {(resource.name || resource.title) && (
          <Typography component="h2" variant="h5" sx={{ paddingBottom: 2 }}>
            {resource.name || resource.title}
          </Typography>
        )}
        {restResourceItems.length > 0 && restResourceItems.map(key => (
          <Typography key={key} component="span" variant="body1">
            <strong>{`${key.charAt(0).toUpperCase()}${key.slice(1).split('_').join(' ')}`}:</strong>
            {' '}
            {resource[key] && (
              <span>{`${`${resource[key]}`.charAt(0).toUpperCase()}${`${resource[key]}`.slice(1)}`}</span>
            )}
          </Typography>
        ))}
        {urlResourceItems.length > 0 && urlResourceItems.map(key => (
          <LinkForUrlResourceItem
            key={key}
            keyName={`${key.charAt(0).toUpperCase()}${key.slice(1).split('_').join(' ')}`}
            url={resource[key] as string}
          />
        ))}
        {urlArrayResourceItems.length > 0 && urlArrayResourceItems.map(key =>
          (resource[key] as string[]).length > 0
            ? (
              <Box key={key}>
                <Typography component="span" variant="body1">
                  <strong>{`${key.charAt(0).toUpperCase()}${key.slice(1).split('_').join(' ')}`}:</strong>
                </Typography>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    paddingTop: 2
                  }}
                >
                  {(resource[key] as string[]).map((url: string) => (
                    <Grid
                      key={url}
                      item
                      xs={isMobileOrLarger ? isTabletOrLarger ? 3 : 4 : 12}
                      sx={{
                        padding: 1
                      }}
                    >
                      <CardForUrlArrayResourceItems url={url} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )
            : null
        )}
      </Box>
    </Layout>
  )
}
