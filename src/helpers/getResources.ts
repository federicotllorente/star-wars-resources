import { ResourceList, ResourceTypeList } from '../types'

export const getResourceTypeList = async (): Promise<
  ResourceTypeList | undefined
> => {
  const res = await fetch('https://swapi.dev/api/')
  try {
    const data: ResourceTypeList = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

export const getResourceList = async (
  resourceType: string
): Promise<ResourceList | undefined> => {
  const res = await fetch(`https://swapi.dev/api/${resourceType}/`)
  try {
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

export const searchResource = async (
  resourceType: string,
  searchInput: string
): Promise<ResourceList | undefined> => {
  const res = await fetch(`https://swapi.dev/api/${resourceType}/?search=${searchInput}`)
  try {
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

export const getResourceListFromCustomUrl = async (
  url: string
): Promise<ResourceList | undefined> => {
  const res = await fetch(url)
  try {
    const data: ResourceList = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}
