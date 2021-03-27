import React from 'react'
import SettingsGame from '../../components/Games/Settings/Settings'
import './CallGamePage.scss'

const CallGame: React.FC = () => {
  return (
    <div className="game-call">
      <h1>CallGame</h1>
      <SettingsGame />
    </div>
  )
}

export default CallGame
