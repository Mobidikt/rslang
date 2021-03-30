/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react'
import './SprintGamePage.scss'
// @ts-ignore
import useInterval from '../../hooks/useInterval'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import Button from 'antd/es/button/button'
import { ArrowLeftOutlined, ArrowRightOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons/lib'
import Icon from '@ant-design/icons'
import { ReactComponent as volumeOnIcon } from '../../assets/icons/volume-on.svg'
import { ReactComponent as volumeOffIcon } from '../../assets/icons/no-sound.svg'
import SettingsGame from '../../components/Games/Settings/Settings'
import useTypedSelector from '../../hooks/useTypedSelector'
import { GAMES_INFO } from '../../components/Games/utils/gamesInfo'
import { playSoundSuccess, playSoundError } from '../../components/Games/utils/soundEffect'
import Title from '../../components/Games/Title/Title'
import getWordsForGame from '../../utils/getWordsForGame'
import { randomArr } from '../../utils/getWordsForGame'


const SprintGame: React.FC = () => {
  const { level } = useTypedSelector((state) => state.gameReducer)
  const [game, setGame] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const [timeSeconds, setTimerSeconds] = useState(60)
  const [circleDashArray, setCircleDashArray] = useState('283')
  const [fullScreen, setFullScreen] = useState(false)
  const [words, setWords] = useState<any[]>()
  const [isloadingGame, setIsloadingGame] = useState(true)
  const [englishWords, setEnglishWords] = useState<Array<{[key: string]: string}>>([])
  const [translateWords, setTranslateWords] = useState<Array<{[key: string]: string}>>([])
  const [wordIndex, setWordIndex] = useState(0)
  const [greenHighlight, setGreenHighlight] = useState(false)
  const [redHighlight, setRedHighlight] = useState(false)
  const [gameOver, setGameOver] = useState(true)

  const handleFullScreen = useFullScreenHandle()

  const FULL_DASH_ARRAY = 283
  const TIME_LIMIT = 60


  const calculateTimeFraction = (timeLeft: number) => {
    const rawTimeFraction = timeLeft / TIME_LIMIT
    const res = rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction)
    return res
  }

  const setCircle = (timeLeft: number) => {
    setCircleDashArray(`${(calculateTimeFraction(timeLeft) * FULL_DASH_ARRAY).toFixed(0)} 283`)
  }

  const escFunction = useCallback(() => {
    if (!document.fullscreenElement) {
      setFullScreen(false)
    }
  }, [])

  const getWords = async () => {
    let newWords = await getWordsForGame(0, 40)
    console.log(newWords)
    setIsloadingGame(false)
    setWords(newWords)
  }

  const createWordsForGame = () => {
    let englishWords: Array<{[key: string]: string}> = [],
        translateWords: Array<{[key: string]: string}> = []

    words?.forEach((wordInfo) => {
      englishWords.push( {id: wordInfo.id, word: wordInfo.word} )
      translateWords.push( {id: wordInfo.id, wordTranslate: wordInfo.wordTranslate})
    })

    let shuffleTranslateArr = randomArr(translateWords, translateWords.length),
        shuffleEnglishArr = randomArr(englishWords, englishWords.length)

    setEnglishWords(shuffleEnglishArr)
    setTranslateWords(shuffleTranslateArr)

    console.log(englishWords, translateWords)
  }

  const handleAnswerClick = (isRightClicked: boolean) => {
    if (isRightClicked ?
      englishWords[wordIndex].id === translateWords[wordIndex].id :
      englishWords[wordIndex].id !== translateWords[wordIndex].id) {

      if (soundOn) {
        playSoundSuccess()
      }

      setGreenHighlight(true)
      setTimeout(() => {
        setGreenHighlight(false);
      }, 300);
    } else {

      if (soundOn) {
        playSoundError()
      }

      setRedHighlight(true)
      setTimeout(() => {
        setRedHighlight(false);
      }, 300);
    }
    setWordIndex(wordIndex + 1)
  }

  useEffect(() => {
    getWords()
  }, [level])

  useEffect(() => {
    createWordsForGame()
  }, [words])

  useInterval(() => {
    if (game) {
      setTimerSeconds((timeSeconds) => {
        let timeLeft = timeSeconds - 1
        setCircle(timeLeft)
        return timeLeft
      })
    }
  }, gameOver ? 1000 : null)

  useEffect(() => {
    if (timeSeconds === 0) {
      setGameOver(false)
    }
  }, [timeSeconds])

  useEffect(() => {
    document.addEventListener('fullscreenchange', escFunction)

    return () => {
      document.removeEventListener('fullscreenchange', escFunction, false)
    }
  }, [fullScreen])

  return (
    <div className="sprint-game">
      {game ? (
        <div className="sprint-game-start">
          <FullScreen handle={handleFullScreen}>
            <div className={`sprint-game-start__inner ${greenHighlight ? "green-highlight" : "" ||
                                                        redHighlight ? "red-highlight" : ""}`}>
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
                      ></path>
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
                <p>{englishWords[wordIndex].word} - {translateWords[wordIndex].wordTranslate}</p>
              </div>
              <div className="sprint-game-start__buttons">
                <div className="button-wrapper">
                  <ArrowLeftOutlined className="arrow-icon" />
                  <Button type="primary" className="sprint-btn" onClick={() => handleAnswerClick(true)}>
                    RIGHT
                  </Button>
                </div>
                <div className="button-wrapper">
                  <Button type="primary" className="sprint-btn" onClick={() => handleAnswerClick(false)}>
                    WRONG
                  </Button>
                  <ArrowRightOutlined className="arrow-icon" />
                </div>
              </div>
            </div>
          </FullScreen>
          <div className="sprint-game-start__statistics" hidden={gameOver}>
            <h1>statistics</h1>
          </div>
        </div>
      ) : (
        <div className="sprint-game-rules">
          <Title
            title={GAMES_INFO.sprint.title}
            description={GAMES_INFO.sprint.description}
            settings={GAMES_INFO.sprint.settings}
            loading={isloadingGame}
            startGame={() => setGame(true)}
          />
          <SettingsGame />
        </div>
      )}
    </div>
  )
}

export default SprintGame
