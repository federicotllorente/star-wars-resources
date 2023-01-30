export const getResourceTypeList = async () => {
  const res = await fetch('https://swapi.dev/api/')
  try {
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

export const getResourceList = async (resourceType: string) => {
  const res = await fetch(`https://swapi.dev/api/${resourceType}/`)
  try {
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}
