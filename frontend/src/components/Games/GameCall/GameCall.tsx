import React, { useCallback, useEffect, useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import Button from 'antd/es/button/button'
import Icon, {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FileTextOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from '@ant-design/icons'
import './GameCall.scss'
import useTypedSelector from '../../../hooks/useTypedSelector'
import { ReactComponent as volumeOnIcon } from '../../../assets/icons/volume-on.svg'
import { ReactComponent as volumeOffIcon } from '../../../assets/icons/no-sound.svg'
import Title from '../Title/Title'

const GameCall: React.FC = () => {
  const { level } = useTypedSelector((state) => state.gameReducer)
  const [startGame, setStartGame] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)

  const handleFullScreen = useFullScreenHandle()

  const escFunction = useCallback((event) => {
    if (!document.fullscreenElement) {
      setFullScreen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('fullscreenchange', escFunction)
    return () => {
      document.removeEventListener('fullscreenchange', escFunction, false)
    }
  }, [fullScreen, escFunction])

  return (
    <FullScreen handle={handleFullScreen} className="fullscreen-call">
      <>
        {startGame ? (
          <div className="call">
            <Button
              className="call__btn_play-sound"
              icon={
                <Icon className="sound-icon" component={soundOn ? volumeOnIcon : volumeOffIcon} />
              }
            />
            <div className="">
              <Button
                type="text"
                className="btn-sound"
                icon={
                  <Icon className="sound-icon" component={soundOn ? volumeOnIcon : volumeOffIcon} />
                }
                onClick={() => setSoundOn((prev) => !prev)}
              />
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
            <div className="call__wrapper-btn">
              <Button type="primary" className="game__btn">
                1
              </Button>
              <Button type="primary" className="game__btn">
                2
              </Button>
              <Button type="primary" className="game__btn">
                3
              </Button>
              <Button type="primary" className="game__btn">
                4
              </Button>
              <Button type="primary" className="game__btn">
                5
              </Button>
            </div>
            <Button type="primary" className="game__btn">
              Пропустить
            </Button>
          </div>
        ) : (
          <Title
            title="Аудиовызов"
            description={[
              'Мини-игра «Аудиовызов» - это тренировка, развивающая навыки речи и перевода.',
              'Вы слышите слово и видите 5 вариантов перевода. Выбрать правильный ответ можно двумя способами:',
            ]}
            settings={['1. Кликните по нему мышью.', '2. Используйте клавиши 1, 2, 3, 4, 5.']}
            startGame={() => setStartGame(true)}
          />
        )}
      </>
    </FullScreen>
  )
}

export default GameCall
