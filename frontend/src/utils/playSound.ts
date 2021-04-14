import config from '../config'

const playSound = (path: string): void => {
  const audio = new Audio(`${config.API_URL}/${path}`)
  audio
    .play()
    .then(() => {})
    .catch(() => {})
}

export default playSound
