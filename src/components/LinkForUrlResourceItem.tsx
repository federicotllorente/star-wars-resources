import { FunctionComponent } from 'react'
import { CircularProgress, Link } from '@mui/material'
import { getResourceDetailsPageUrlFromApiUrl, useResourceItemNameFromUrl } from '../helpers'

export const LinkForUrlResourceItem: FunctionComponent<{
  keyName: string
  url: string
}> = ({
  keyName,
  url
}) => {
  const {
    nameFromUrl,
    isLoading
  } = useResourceItemNameFromUrl(url)

  if (isLoading) return <CircularProgress />
  if (!nameFromUrl) return null
  return (
    <p>
      <strong>{keyName}:</strong>
      {' '}
      <Link href={getResourceDetailsPageUrlFromApiUrl(url)}>
        {nameFromUrl}
      </Link>
    </p>
  )
}
