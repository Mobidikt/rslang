import React, { useCallback, useEffect, useState } from 'react'
import './GameCall.scss'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import Button from 'antd/es/button/button'
import Icon, {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from '@ant-design/icons'
import useInterval from '../../../hooks/useInterval'
import { ReactComponent as volumeOnIcon } from '../../../assets/icons/volume-on.svg'
import { ReactComponent as volumeOffIcon } from '../../../assets/icons/no-sound.svg'
import Title from '../Title/Title'

const GameCall: React.FC = () => {
  const [startGame, setStartGame] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const [timeSeconds, setTimerSeconds] = useState(60)
  const [circleDashArray, setCircleDashArray] = useState('283')
  const [gameLevel, setGameLevel] = useState(1)
  const [fullScreen, setFullScreen] = useState(false)

  const handleFullScreen = useFullScreenHandle()

  const FULL_DASH_ARRAY = 283
  const TIME_LIMIT = 60

  const calculateTimeFraction = (timeLeft: number) => {
    const rawTimeFraction = timeLeft / TIME_LIMIT
    const res = rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction)
    return res
  }

  const setCircle = (timeLeft: number) => {
    setCircleDashArray(`${(calculateTimeFraction(timeLeft) * FULL_DASH_ARRAY).toFixed(0)} '283'`)
  }

  const handleLevelChange = (level: number) => {
    setGameLevel(level)
  }

  const escFunction = useCallback((event) => {
    if (!document.fullscreenElement) {
      setFullScreen(false)
    }
  }, [])

  useInterval(() => {
    if (startGame) {
      setTimerSeconds((time) => {
        const timeLeft = time - 1
        setCircle(timeLeft)
        return timeLeft
      })
    }
  }, 1000)

  useEffect(() => {
    if (timeSeconds === 0) {
      setTimerSeconds(60)
    }
  }, [timeSeconds])

  useEffect(() => {
    document.addEventListener('fullscreenchange', escFunction)
    return () => {
      document.removeEventListener('fullscreenchange', escFunction, false)
    }
  }, [fullScreen, escFunction])

  return (
    <>
      {startGame ? (
        <div className="sprint-game-start">
          <FullScreen handle={handleFullScreen}>
            <div className="sprint-game-start__inner">
              <div className="sprint-game-start__settings">
                <div className="timer">
                  <div className="timer__number">{timeSeconds}</div>
                  <svg
                    className="base-timer__svg"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g className="base-timer__circle">
                      <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
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
                      />
                    </g>
                  </svg>
                </div>

                <div className="sound">
                  <Button
                    type="text"
                    className="btn-sound"
                    icon={
                      <Icon
                        className="sound-icon"
                        component={soundOn ? volumeOnIcon : volumeOffIcon}
                      />
                    }
                    onClick={() => setSoundOn((prev) => !prev)}
                  />
                </div>
                <div className="full-screen">
                  <Button
                    type="text"
                    className="btn-full-screen"
                    onClick={() => setFullScreen(!fullScreen)}
                    icon={
                      fullScreen ? (
                        <FullscreenExitOutlined
                          className="full-screen-icon"
                          onClick={handleFullScreen.exit}
                        />
                      ) : (
                        <FullscreenOutlined
                          className="full-screen-icon"
                          onClick={handleFullScreen.enter}
                        />
                      )
                    }
                  />
                </div>
              </div>
              <div className="sprint-game-start__words">
                <p>Cheetah - Гепард</p>
              </div>
              <div className="sprint-game-start__buttons">
                <div className="button-wrapper">
                  <ArrowLeftOutlined className="arrow-icon" />
                  <Button type="primary" className="sprint-btn">
                    RIGHT
                  </Button>
                </div>
                <div className="button-wrapper">
                  <Button type="primary" className="sprint-btn">
                    WRONG
                  </Button>
                  <ArrowRightOutlined className="arrow-icon" />
                </div>
              </div>
            </div>
          </FullScreen>
        </div>
      ) : (
        <Title
          title="Аудиовызов"
          description={[
            'Мини-игра «Аудиовызов» - это тренировка, развивающая навыки речи и перевода.',
            'Вы слышите слово и видите 5 вариантов перевода. Выбрать правильный ответ можно двумя способами:',
          ]}
          settings={['1. Кликните по нему мышью.', '2. Используйте клавиши 1, 2, 3, 4, 5.']}
        />
      )}
    </>
  )
}

export default GameCall
