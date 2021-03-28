import React, { useCallback, useEffect, useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import Button from 'antd/es/button/button'
import Icon, { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import './GameCall.scss'
import wordApi from '../../../services/WordApi'
import useTypedSelector from '../../../hooks/useTypedSelector'
import { ReactComponent as volumeOnIcon } from '../../../assets/icons/volume-on.svg'
import { ReactComponent as volumeOffIcon } from '../../../assets/icons/no-sound.svg'
import Title from '../Title/Title'
import { GAMES_INFO } from '../utils/gamesInfo'
import playSound from '../../../utils/playSound'
/* eslint-disable */
// @ts-ignore
const GameCall: React.FC = () => {
  const { level } = useTypedSelector((state) => state.gameReducer)
  const [startGame, setStartGame] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)
  const [words, setWords] = useState<any>()
  const [currentWord, setCurrentWord ] = useState<any>()

  const handleFullScreen = useFullScreenHandle()

  const escFunction = useCallback(() => {
    if (!document.fullscreenElement) {
      setFullScreen(false)
    }
  }, [])

  useEffect(() => {
    wordApi.getByGroup(level - 1).then((res) => {
      setWords(res.data)
    })
  }, [level])
  
  useEffect(() => {
    document.addEventListener('fullscreenchange', escFunction)
    return () => {
      document.removeEventListener('fullscreenchange', escFunction, false)
    }
  }, [fullScreen, escFunction])
  
  const playWord = () => {
    setCurrentWord(words[0])
    playSound(words[0].audio)
    playSoundError()
  }

  const playSoundError = (): void => {
    const audio = new Audio('../../../assets/sounds/error.mp3')
    audio
      .play()
      .then(() => {})
      .catch(() => {})
  }
  const checkWord = (word: any) => {
    if (words[0].word === word.word) {
      return console.log('ура')
    }
    return console.log('err')
  }

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
              onClick={playWord}
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
              {words.map((word: any) => (
                <Button type="primary" className="game__btn" key={word.word} onClick={()=>checkWord(word)}>
                  {word.word}
                </Button>
              ))}
            </div>
            <Button type="primary" className="game__btn">
              Пропустить
            </Button>
          </div>
        ) : (
          <Title
            title={GAMES_INFO.call.title}
            description={GAMES_INFO.call.description}
            settings={GAMES_INFO.call.settings}
            startGame={() => setStartGame(true)}
          />
        )}
      </>
    </FullScreen>
  )
}

export default GameCall
