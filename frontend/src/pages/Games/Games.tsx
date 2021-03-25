/* eslint-disable */
import React from 'react'
import GameCard from './GameCard'
import './Games.scss'
import { Card } from 'antd'
import { useNavigate } from 'react-router'
import sprintPhoto from '../../assets/image/sprint.png'

const { Meta } = Card

import gameCall from '../../assets/image/gameCall.png'
import gameOur from '../../assets/image/gameOur.png'
import gameSavannah from '../../assets/image/gameSavannah.png'
import gameSprint from '../../assets/image/gameSprint.png'

const Games: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="games">
      <GameCard url="/games/savannah" img={gameSavannah} title="Savannah" />
      <GameCard url="/games/call" img={gameCall} title="Audiocall" />
      <GameCard url="/games/sprint" img={gameSprint} title="Sprint" />
      <GameCard url="/games/our-game" img={gameOur} title="gameOur" />
    </div>
  )
}

export default Games
