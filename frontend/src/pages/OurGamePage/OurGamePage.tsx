import React, { useState } from 'react'
import './OurGamePage.scss'
import OurGame from '../../components/Games/OurGame/OurGame'
import FullScreenBtn from '../../components/Games/FullScreenBtn/FullScreenBtn'

const GameOur: React.FC = () => {
  const [fullScreen, setFullScreen] = useState(false)

  return (
    <div className={`ourgame-game ${fullScreen ? 'full-screen' : ''} `}>
      <OurGame />
      <FullScreenBtn fullScreen={fullScreen} setFullScreen={setFullScreen} />
    </div>
  )
}

export default GameOur
