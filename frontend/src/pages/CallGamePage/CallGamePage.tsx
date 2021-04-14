import React, { useState } from 'react'
import FullScreenBtn from '../../components/Games/FullScreenBtn/FullScreenBtn'
import GameCall from '../../components/Games/GameCall/GameCall'
import './CallGamePage.scss'

const CallGame: React.FC = () => {
  const [fullScreen, setFullScreen] = useState(false)

  return (
    <div className={`game-call ${fullScreen ? 'full-screen' : ''} `}>
      <GameCall />
      <FullScreenBtn fullScreen={fullScreen} setFullScreen={setFullScreen} />
    </div>
  )
}

export default CallGame
