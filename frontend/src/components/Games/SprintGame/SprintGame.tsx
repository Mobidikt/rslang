/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react'
import './SprintGame.scss'
// @ts-ignore
//hooks
import useInterval from '../../../hooks/useInterval'
import useTypedSelector from '../../../hooks/useTypedSelector'
//components
import SettingsGame from '../Settings/Settings'
import Title from '../Title/Title'
import SoundComponent from '../SoundComponent/SoundComponent'
import Statistics from '../Statistics/Statistics'
//antd
import Button from 'antd/es/button/button'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  HeartFilled,
} from '@ant-design/icons/lib'
import { Rate } from 'antd'
//libs
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
//utils
import { GAMES_INFO } from '../utils/gamesInfo'
import { playSoundSuccess, playSoundError } from '../utils/soundEffect'
import getWordsForGame from '../../../utils/getWordsForGame'
import { randomArr } from '../../../utils/getWordsForGame'
import { WordType } from '../../../store/types/lesson'

const SprintGame: React.FC = () => {
  const { level } = useTypedSelector((state) => state.gameReducer)
  const { isMute } = useTypedSelector((state) => state.gameReducer)

  const [startGame, setStartGame] = useState(false)
  const [timeSeconds, setTimeSeconds] = useState(60)
  const [circleDashArray, setCircleDashArray] = useState('283')
  const [fullScreen, setFullScreen] = useState(false)
  const [isloadingGame, setIsloadingGame] = useState(true)

  const [words, setWords] = useState<any[]>()
  const [englishWords, setEnglishWords] = useState<WordType[]>([])
  const [translateWords, setTranslateWords] = useState<WordType[]>([])
  const [successWords, setSuccessWords] = useState<WordType[]>([])
  const [errorWords, setErrorWords] = useState<WordType[]>([])

  const [wordIndex, setWordIndex] = useState(0)
  const [greenHighlight, setGreenHighlight] = useState(false)
  const [redHighlight, setRedHighlight] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [helth, setHelth] = useState<number>(5)

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
    let englishWords: Array<WordType> = [],
      translateWords: Array<WordType> = []

    words?.forEach((word) => {
      englishWords.push(word)
      translateWords.push(word)
    })

    let shuffleTranslateArr = randomArr(translateWords, translateWords.length)

    setEnglishWords(englishWords)
    setTranslateWords(shuffleTranslateArr)

    console.log(englishWords, translateWords)
  }

  const handleAnswerClick = (isRightClicked: boolean) => {
    if (
      isRightClicked
        ? englishWords[wordIndex].id === translateWords[wordIndex].id
        : englishWords[wordIndex].id !== translateWords[wordIndex].id
    ) {
      setSuccessWords([...successWords, englishWords[wordIndex]])

      if (!isMute) {
        playSoundSuccess()
      }

      setGreenHighlight(true)
      setTimeout(() => {
        setGreenHighlight(false)
      }, 300)
    } else {
      setErrorWords([...errorWords, englishWords[wordIndex]])
      setHelth(helth - 1)

      if (!isMute) {
        playSoundError()
      }

      setRedHighlight(true)
      setTimeout(() => {
        setRedHighlight(false)
      }, 300)
    }
    setWordIndex(wordIndex + 1)
  }

  const handleBackClick = () => {
    setGameOver(false)
    setHelth(5)
    setStartGame(false)
  }

  const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          handleAnswerClick(true)
          break
        case 'ArrowRight':
          handleAnswerClick(false)
      }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  useEffect(() => {
    getWords()
  }, [level])

  useEffect(() => {
    createWordsForGame()
  }, [words])

  useInterval(
    () => {
      if (startGame) {
        setTimeSeconds((timeSeconds) => {
          let timeLeft = timeSeconds - 1
          setCircle(timeLeft)
          return timeLeft
        })
      }
    },
    gameOver ? null : 1000,
  )

  useEffect(() => {
    if (helth === 0 || timeSeconds === 0) {
      setTimeSeconds(60)
      setStartGame(false)
      setGameOver(true)
    }
  }, [helth, timeSeconds])

  useEffect(() => {
    document.addEventListener('fullscreenchange', escFunction)

    return () => {
      document.removeEventListener('fullscreenchange', escFunction, false)
    }
  }, [fullScreen])

  return (
    <div className="sprint-game">
      {startGame ? (
        <div className="sprint-game-start">
          <FullScreen handle={handleFullScreen}>
            <div className="rate-wrapper">
              <Rate
                disabled
                value={helth}
                character={<HeartFilled />}
                style={{ fontSize: '25px' }}
              />
            </div>
            <div
              className={`sprint-game-start__inner ${
                greenHighlight ? 'green-highlight' : '' || redHighlight ? 'red-highlight' : ''
              }`}
            >
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
                  <SoundComponent />
                </div>
                <div className="full-screen">
                  <Button
                    type="text"
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
                <p>
                  {englishWords[wordIndex].word} - {translateWords[wordIndex].wordTranslate}
                </p>
              </div>
              <div className="sprint-game-start__buttons">
                <div className="button-wrapper">
                  <ArrowLeftOutlined className="arrow-icon" />
                  <Button type="primary" className="sprint-btn" onClick={() => handleAnswerClick(true)} >
                    RIGHT
                  </Button>
                </div>
                <div className="button-wrapper">
                  <Button type="primary" className="sprint-btn" onClick={() => handleAnswerClick(false)} >
                    WRONG
                  </Button>
                  <ArrowRightOutlined className="arrow-icon" />
                </div>
              </div>
            </div>
          </FullScreen>
        </div>
      ) : (
        <div className="sprint-game-start">
          {gameOver ? (
            <div className="sprint-game-start__statistics">
              <Statistics
                success={successWords}
                error={errorWords}
                back={() => handleBackClick()}
              />
            </div>
          ) : (
            <div className="sprint-game-rules">
              <Title
                title={GAMES_INFO.sprint.title}
                description={GAMES_INFO.sprint.description}
                settings={GAMES_INFO.sprint.settings}
                loading={isloadingGame}
                startGame={() => setStartGame(true)}
              />
              <SettingsGame />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SprintGame
