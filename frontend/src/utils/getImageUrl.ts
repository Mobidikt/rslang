import config from '../config'

const getImgUrl = (path: string): string => {
  return `${config.API_URL}/${path}`
}

export default getImgUrl
