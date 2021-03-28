const playSoundError = (): void => {
  const audio = new Audio('../../../assets/sounds/error.mp3')
  audio
    .play()
    .then(() => {})
    .catch(() => {})
}

export default playSoundError
