import { FunctionComponent } from 'react'
import { Typography, Grid, useMediaQuery } from '@mui/material'
import { Resource } from '../types'
import { getResourceDetailsPageUrlFromApiUrl } from '../helpers'
import { ResourceCard } from '../components/ResourceCard'

type ResourceCardGridProps = {
  title: string
  resourceList: Resource[]
}

export const ResourceCardGrid: FunctionComponent<ResourceCardGridProps> = ({
  title,
  resourceList
}) => {
  const isMobileOrLarger = useMediaQuery('(min-width:425px)')
  const isTabletOrLarger = useMediaQuery('(min-width:768px)')

  if (!resourceList) return null
  return (
    <>
      <Typography component="h2" variant="h5">
        {title}
      </Typography>
      <Grid
        container
        spacing={1}
        sx={{
          paddingTop: 2,
          paddingBottom: 4
        }}
      >
        {resourceList.map((i: Resource) => (
          <Grid
            key={(i.name || i.title) as string}
            item
            xs={isMobileOrLarger ? isTabletOrLarger ? 3 : 4 : 12}
            sx={{
              padding: 1
            }}
          >
            <ResourceCard
              title={(i.name || i.title) as string}
              description={'TODO Description'}
              detailsPageUrl={getResourceDetailsPageUrlFromApiUrl(i.url as string)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
