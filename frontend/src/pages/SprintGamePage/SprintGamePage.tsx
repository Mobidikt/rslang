/* eslint-disable */
import React, { useEffect, useState } from 'react'
import './SprintGamePage.scss'
// @ts-ignore
import useInterval from '../../hooks/useInterval'
import Button from 'antd/es/button/button'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons/lib'
import Icon from '@ant-design/icons'
import { ReactComponent as volumeOnIcon } from '../../assets/icons/volume-on.svg'
import { ReactComponent as volumeOffIcon } from '../../assets/icons/no-sound.svg'


const SprintGame: React.FC = () => {
  const [startGame, setStartGame] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const [timeSeconds, setTimerSeconds] = useState(60)
  const [circleDashArray, setCircleDashArray] = useState("283")

  const FULL_DASH_ARRAY = 283
  const TIME_LIMIT = 60

  const calculateTimeFraction = () => {
    const rawTimeFraction = timeSeconds / TIME_LIMIT
    const res = rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction)
    return res
  }

  const setCircle = () => {
    setCircleDashArray(`${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`)
  }

  useInterval(() => {
    if (startGame) {
      setTimerSeconds(timeSeconds => timeSeconds - 1)
      setCircle()
    }
  }, 1000)

  useEffect(() => {
    if (timeSeconds === 0) {
      setTimerSeconds(60)
    }
  }, [timeSeconds])

  return (
    <div className="sprint-game">
      {startGame ?
        <div className="sprint-game-start">
          <div className="sprint-game-start__inner">

            <div className="sprint-game-start__settings">
              <div className="timer">
                <div className="timer__number">{timeSeconds}</div>
                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <g className="base-timer__circle">
                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"/>
                    <path
                      id="base-timer-path-remaining"
                      strokeDasharray={circleDashArray}
                      className="base-timer__path-remaining"
                      d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                      "
                    ></path>
                  </g>
                </svg>
              </div>

              <div className="sound">
                <Button type="text" className="btn-sound"
                        icon={<Icon  className="sound-icon" component={soundOn ? volumeOnIcon : volumeOffIcon}/>}
                        onClick={() => setSoundOn(prev => !prev) } />
              </div>
            </div>
            <div className="sprint-game-start__words">
              <p>Cheetah - Гепард</p>
            </div>
            <div className="sprint-game-start__buttons">
              <div className="button-wrapper">
                <ArrowLeftOutlined className="arrow-icon"/>
                <Button type="primary" className="sprint-btn">RIGHT</Button>
              </div>
              <div className="button-wrapper">
                <Button type="primary" className="sprint-btn">WRONG</Button>
                <ArrowRightOutlined className="arrow-icon"/>
              </div>
            </div>
          </div>
        </div> :
        <div className="sprint-game-rules">
          <h1>SPRINT</h1>
          <p>After the start of the game, you will see word and translation.<br/> You need to choose is it right or wrong.</p>
          <p>1. Use mouse to choose.</p>
          <p>2. Use the keys Left and Right.</p>
          <Button type="primary" className="sprint-game-rules__btn" onClick={() => setStartGame(true) }>START</Button>
        </div>
      }
    </div>
  )
}

export default SprintGame
