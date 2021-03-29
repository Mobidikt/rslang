import soundError from '../../../assets/sounds/error.mp3'
import soundSuccess from '../../../assets/sounds/success.mp3'

export const playSoundError = () => {
  const audio = new Audio(soundError)
  audio
    .play()
    .then(() => {})
    .catch(() => {})
}

export const playSoundSuccess = () => {
  const audio = new Audio(soundSuccess)
  audio
    .play()
    .then(() => {})
    .catch(() => {})
}
