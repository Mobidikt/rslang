/* eslint-disable */
import React from 'react'
import './Games.scss'
import { Card } from 'antd'
import { useNavigate } from 'react-router'
import sprintPhoto from '../../assets/image/sprint.png'

const { Meta } = Card

const Games: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="games">
      <Card className="sprint__card" cover={<img alt="example" src={sprintPhoto} />}
            onClick={() => navigate('/games/sprint')}>
        <Meta title="Sprint" />
      </Card>
    </div>
  )
}

export default Games
