import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { Card } from 'antd'
import useActions from '../../hooks/useActions'

const { Meta } = Card

type GameCardTypes = {
  url: string,
  img: string,
  title: string,
}

const GameCard: React.FC<GameCardTypes> = ({ url, img, title }: GameCardTypes) => {
  const navigate = useNavigate()
  const { setFromCurrentGroup } = useActions()
  const handleClick = useCallback(() => {
    setFromCurrentGroup(false)
    navigate(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, url])

  return (
    <Card className="games__card" cover={<img alt="example" src={img} />} onClick={handleClick}>
      <Meta title={title} />
    </Card>
  )
}

export default GameCard
