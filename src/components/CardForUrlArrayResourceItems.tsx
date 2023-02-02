import { CircularProgress } from '@mui/material'
import { FunctionComponent } from 'react'
import { getResourceDetailsPageUrlFromApiUrl, useResourceItemNameFromUrl } from '../helpers'
import { ResourceCard } from './ResourceCard'

export const CardForUrlArrayResourceItems: FunctionComponent<{ url: string }> = ({
  url
}) => {
  const {
    nameFromUrl,
    isLoading
  } = useResourceItemNameFromUrl(url)

  if (isLoading) return <CircularProgress />
  if (!nameFromUrl) return null
  return (
    <ResourceCard
      title={nameFromUrl}
      detailsPageUrl={getResourceDetailsPageUrlFromApiUrl(url)}
    />
  )
}
