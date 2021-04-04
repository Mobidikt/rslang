import React from 'react'
import { Button } from 'antd'
import './Title.scss'
import '../Games.scss'
import SettingsGame from '../Settings/Settings'
import useTypedSelector from '../../../hooks/useTypedSelector'

type TitleTypes = {
  title: string,
  description: string[],
  settings: string[],
  startGame: () => void,
  loading: boolean,
}

const Title: React.FC<TitleTypes> = ({
  title,
  description,
  settings,
  startGame,
  loading,
}: TitleTypes) => {
  const { fromCurrentGroup } = useTypedSelector((state) => state.lessonReducer)
  return (
    <div className="title-game">
      <h2 className="title-game__title">{title}</h2>
      {description.map((item) => (
        <p className="title-game__text" key={item}>
          {item}
        </p>
      ))}
      {settings.map((setting) => (
        <p className="title-game__text" key={setting}>
          {setting}
        </p>
      ))}
      <Button
        type="primary"
        className="game__btn"
        onClick={startGame}
        loading={loading}
        disabled={loading}
      >
        START
      </Button>
      {fromCurrentGroup ? null : <SettingsGame />}
    </div>
  )
}

export default Title
