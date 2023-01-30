import { useLoaderData } from 'react-router-dom'
import { Typography, Button } from '@mui/material'
import { Layout } from '../components/Layout'
import { Resource, ResourceList } from '../types'
import { useEffect, useState } from 'react'
import { getResourceListFromCustomUrl } from '../helpers'

export const ResourceOverview = () => {
  const resourceList = useLoaderData() as ResourceList
  console.log(resourceList)

  const [isNextPageAvailable, setIsNextPageAvailable] = useState<boolean>(false)
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null)
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false)
  const [acumulatedResourceList, setAcumulatedResourceList] = useState<Resource[]>([])

  useEffect(() => {
    setAcumulatedResourceList(resourceList.results)
    if (resourceList.next) {
      setNextPageUrl(resourceList.next)
      setIsNextPageAvailable(true)
    } else {
      setNextPageUrl(null)
      setIsNextPageAvailable(false)
    }
    setIsNextPageLoading(false)
  }, [resourceList])

  const handleLoadMore = async () => {
    if (!nextPageUrl) return
    setIsNextPageLoading(true)

    const results = await getResourceListFromCustomUrl(nextPageUrl)
    setIsNextPageLoading(false)
    if (!results) {
      setNextPageUrl(null)
      setIsNextPageAvailable(false)
      return
    }

    setAcumulatedResourceList([...acumulatedResourceList, ...results.results])

    if (!results.next) {
      setNextPageUrl(null)
      setIsNextPageAvailable(false)
      return
    }

    setNextPageUrl(results.next)
  }

  if (!resourceList) return null
  return (
    <Layout>
      <Typography component="h2" variant="h5">
        {`${resourceList.resourceId.charAt(0).toUpperCase()}${resourceList.resourceId.slice(1)}`}
      </Typography>
      {acumulatedResourceList.map((i: any) => (
        <p key={i.name}>{i.name}</p>
      ))}
      {isNextPageAvailable && (
        <Button variant="contained" onClick={handleLoadMore}>
          {/* TODO */}
          {isNextPageLoading ? 'Loading...' : 'Load more'}
        </Button>
      )}
    </Layout>
  )
}
