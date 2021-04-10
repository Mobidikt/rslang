import React from 'react'
import { useIntl } from 'react-intl'
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

const Title: React.FC<TitleTypes> = ({ title, description, settings, startGame, loading }) => {
  const intl = useIntl()
  const { fromCurrentGroup } = useTypedSelector((state) => state.lessonReducer)
  return (
    <div className="title-game">
      <h2 className="title-game__title">{intl.formatMessage({ id: title })}</h2>
      {description.map((item) => (
        <p className="title-game__text" key={item}>
          {intl.formatMessage({ id: item })}
        </p>
      ))}
      {settings.map((setting) => (
        <p className="title-game__text" key={setting}>
          {intl.formatMessage({ id: setting })}
        </p>
      ))}
      <Button
        type="primary"
        className="game__btn"
        onClick={startGame}
        loading={loading}
        disabled={loading}
      >
        {intl.formatMessage({ id: 'start' })}
      </Button>
      {fromCurrentGroup ? null : <SettingsGame />}
    </div>
  )
}

export default Title
