import { useEffect, useMemo, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Button } from '@mui/material'
import { Resource, ResourceList } from '../types'
import { getResourcesFromCustomUrl } from '../helpers'
import { Layout } from '../components/Layout'
import { ResourceCardGrid } from '../components/ResourceCardGrid'

export const ResourceOverview = () => {
  const resourceList = useLoaderData() as ResourceList & { searchInput?: string }

  const [isNextPageAvailable, setIsNextPageAvailable] = useState<boolean>(false)
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null)
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false)
  const [acumulatedResourceList, setAcumulatedResourceList] = useState<Resource[]>([])

  const resourceTypeWithInitialInUpperCase = useMemo(
    () => `${resourceList.resourceType.charAt(0).toUpperCase()}${resourceList.resourceType.slice(1)}`,
    [resourceList.resourceType]
  )

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

    const results = await getResourcesFromCustomUrl(nextPageUrl) as ResourceList
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
      <ResourceCardGrid
        title={
          resourceList.searchInput
            ? `Results with '${resourceList.searchInput}' in ${resourceTypeWithInitialInUpperCase}`
            : resourceTypeWithInitialInUpperCase
        }
        resourceList={acumulatedResourceList}
      />
      {isNextPageAvailable && (
        <Button
          variant="contained"
          onClick={handleLoadMore}
          sx={{ width: 'fit-content' }}
        >
          {/* TODO */}
          {isNextPageLoading ? 'Loading...' : 'Load more'}
        </Button>
      )}
    </Layout>
  )
}
