export const getResourceDetailsPageUrlFromApiUrl = (url: string) =>
  `/resources/${url.split('/')[url.split('/').length - 3]}/${url.split('/')[url.split('/').length - 2]}`
