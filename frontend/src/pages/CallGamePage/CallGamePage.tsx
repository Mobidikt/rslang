import React from 'react'
import GameCall from '../../components/Games/GameCall/GameCall'
import SettingsGame from '../../components/Games/Settings/Settings'
import './CallGamePage.scss'

const CallGame: React.FC = () => {
  return (
    <div className="game-call">
      <GameCall />
      <SettingsGame />
    </div>
  )
}

export default CallGame
