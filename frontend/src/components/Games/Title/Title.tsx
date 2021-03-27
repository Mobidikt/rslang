import React from 'react'
import { Button } from 'antd'
import './Title.scss'

type TitleTypes = {
  title: string,
  description: string[],
  settings: string[],
}

const Title: React.FC<TitleTypes> = ({ title, description, settings }: TitleTypes) => {
  return (
    <div className="title-game">
      <h2 className="title-game__title">{title}</h2>
      <p className="title-game__text">{description[0]}</p>
      <p className="title-game__text">{description[1]}</p>
      <p className="title-game__text">{settings[0]}</p>
      <p className="title-game__text">{settings[1]}</p>
      <Button type="primary" danger className="title-game__btn" onClick={() => console.log(1)}>
        START
      </Button>
    </div>
  )
}

export default Title
