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
  back: () => void,
}

const Statistics: React.FC<StatisticsTypes> = ({ success, error, back }) => {
  return (
    <section className="statistics-game">
      <h3 className="statistics-game__title">Game statistics</h3>
      <div className="statistics-game__wrapper">
        <div className="statistics-game__success">
          {success.map((word) => (
            <div className="statistics-game__words-wrapper" key={word.id}>
              <div className="statistics-game__word">
                <Button
                  type="primary"
                  className="statistics-game__play-sound"
                  onClick={() => playSound(word.audio)}
                />
                <p className="statistics-game__text">{word.word}</p>
              </div>
              <i className="success-icon" />
            </div>
          ))}
        </div>
        <div className="statistics-game__error">
          {error.map((word) => (
            <div className="statistics-game__words-wrapper" key={word.id}>
              <div className="statistics-game__word">
                <Button
                  type="primary"
                  className="statistics-game__play-sound"
                  onClick={() => playSound(word.audio)}
                />
                <p className="statistics-game__text">
                  {word.word} - {word.wordTranslate}
                </p>
              </div>
              <i className="error-icon" />
            </div>
          ))}
        </div>
      </div>
      <Button type="primary" danger className="statistics-game__btn" onClick={back}>
        Go back
      </Button>
    </section>
  )
}

export default Statistics
