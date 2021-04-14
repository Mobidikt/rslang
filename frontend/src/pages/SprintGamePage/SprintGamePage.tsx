import React, { useState } from 'react'
import './SprintGamePage.scss'
import SprintGame from '../../components/Games/SprintGame/SprintGame'
import FullScreenBtn from '../../components/Games/FullScreenBtn/FullScreenBtn'

const SprintGamePage: React.FC = () => {
  const [fullScreen, setFullScreen] = useState(false)

  return (
    <div className={`game-sprint ${fullScreen ? 'full-screen' : ''} `}>
      <SprintGame />
      <FullScreenBtn fullScreen={fullScreen} setFullScreen={setFullScreen} />
    </div>
  )
}

export default SprintGamePage
