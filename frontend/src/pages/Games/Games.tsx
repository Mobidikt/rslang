import React from 'react'
import GameCard from './GameCard'
import './Games.scss'

import gameCall from '../../assets/image/gameCall.png'
import gameOur from '../../assets/image/gameOur.png'
import gameSavannah from '../../assets/image/gameSavannah.png'
import gameSprint from '../../assets/image/gameSprint.png'

const Games: React.FC = () => {
  return (
    <div className="games">
      <div className="games-container">
        <GameCard url="/games/savannah" img={gameSavannah} title="savannah" />
        <GameCard url="/games/call" img={gameCall} title="audiocall" />
        <GameCard url="/games/sprint" img={gameSprint} title="sprint" />
        <GameCard url="/games/our-game" img={gameOur} title="gameOur" />
      </div>
    </div>
  )
}

export default Games
