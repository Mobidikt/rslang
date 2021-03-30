import React from 'react'
import { Button } from 'antd'
import './Statistics.scss'
import { useNavigate } from 'react-router'
import Icon from '@ant-design/icons'
import { WordType } from '../../../store/types/lesson'
import { ReactComponent as volumeOnIcon } from '../../../assets/icons/volume-on.svg'
import useActions from '../../../hooks/useActions'
import playSound from '../../../utils/playSound'

type StatisticsTypes = {
  success: WordType[],
  error: WordType[],
  url: string,
}

const Statistics: React.FC<StatisticsTypes> = ({ success, error, url }) => {
  const { setSelectedSection } = useActions()
  const navigate = useNavigate()
  return (
    <section className="statistics-game">
      <h3 className="statistics-game__title">Game statistics</h3>
      {success.map((word) => (
        <div className="statistics-game__success">
          <Button
            type="primary"
            icon={<Icon className="sound-icon" component={volumeOnIcon} />}
            onClick={() => playSound(word.audio)}
          />
          <p className="statistics-game__text" key={word.id}>
            {word.word}
          </p>
        </div>
      ))}
      {error.map((word) => (
        <div className="statistics-game__error">
          <Button
            type="primary"
            className="statistics-game__play-sound"
            icon={<Icon className="sound-icon" component={volumeOnIcon} />}
            onClick={() => playSound(word.audio)}
          />
          <p className="statistics-game__text" key={word.id}>
            {word.word} - {word.wordTranslate}
          </p>
        </div>
      ))}

      <Button
        type="primary"
        danger
        className="statistics-game__btn"
        onClick={() => {
          navigate(url)
          setSelectedSection('Games')
        }}
      >
        Go back to the game page
      </Button>
    </section>
  )
}

export default Statistics
