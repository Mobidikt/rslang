import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { Card } from 'antd'

const { Meta } = Card

type GameCardTypes = {
  url: string,
  img: string,
  title: string,
}

const GameCard: React.FC<GameCardTypes> = ({ url, img, title }: GameCardTypes) => {
  const navigate = useNavigate()
  const handleClick = useCallback(() => {
    navigate(url)
  }, [navigate, url])

  return (
    <Card className="games__card" cover={<img alt="example" src={img} />} onClick={handleClick}>
      <Meta title={title} />
    </Card>
  )
}

export default GameCard
