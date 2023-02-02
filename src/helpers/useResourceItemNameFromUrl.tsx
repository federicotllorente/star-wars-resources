import { useEffect, useState } from 'react'
import { Resource } from '../types'
import { getResourcesFromCustomUrl } from './getResources'

export const useResourceItemNameFromUrl = (url: string): {
  nameFromUrl: string | null
  isLoading: boolean
} => {
  const [nameFromUrl, setNameFromUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getResourceItemNameFromUrl = async (url: string) => {
    setIsLoading(true)
    const results = await getResourcesFromCustomUrl(url) as Resource
    try {
      setIsLoading(false)
      if (results?.name) setNameFromUrl(results?.name as string)
      if (results?.title) setNameFromUrl(results?.title as string)
      return undefined
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getResourceItemNameFromUrl(url)
  }, [])

  return { nameFromUrl, isLoading }
}
