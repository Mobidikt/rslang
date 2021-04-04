import React, { useCallback, useEffect, useState } from 'react'
import './SprintGame.scss'
import '../Games.scss'
/**
 * antd
 */
import { ArrowLeftOutlined, ArrowRightOutlined, HeartFilled } from '@ant-design/icons/lib'
import { Rate, Button } from 'antd'
/**
 * components
 */
import SettingsGame from '../Settings/Settings'
import Title from '../Title/Title'
import SoundComponent from '../SoundComponent/SoundComponent'
import Statistics from '../Statistics/Statistics'
/**
 * hooks
 */
import useTypedSelector from '../../../hooks/useTypedSelector'
/**
 * utils
 */
import { GAMES_INFO } from '../utils/gamesInfo'
import { playSoundSuccess, playSoundError } from '../utils/soundEffect'
import getWordsForGame from '../../../utils/getWordsForGame'
import randomArr from '../utils/randomArr'
import { WordType } from '../../../store/types/lesson'

const SprintGame: React.FC = () => {
  const { level } = useTypedSelector((state) => state.gameReducer)
  const { isMute } = useTypedSelector((state) => state.gameReducer)

  const [game, setGame] = useState(false)
  const [timeSeconds, setTimeSeconds] = useState(60)
  const [circleDashArray, setCircleDashArray] = useState('283')
  const [isloadingGame, setIsloadingGame] = useState(true)

  const [words, setWords] = useState<WordType[]>()

  const [gameWords, setGameWords] = useState<WordType[]>([])
  const [arrGameWord, setArrGameWord] = useState<WordType[]>([])
  const [answerWords, setAnswerWords] = useState<WordType[]>([])

  const [successWords, setSuccessWords] = useState<WordType[]>([])
  const [errorWords, setErrorWords] = useState<WordType[]>([])

  const [wordIndex, setWordIndex] = useState<number>(0)
  const [greenHighlight, setGreenHighlight] = useState(false)
  const [redHighlight, setRedHighlight] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [helth, setHelth] = useState<number>(5)

  const FULL_DASH_ARRAY = 283
  const TIME_LIMIT = 60
  const countWordsGame = 100

  const calculateTimeFraction = (timeLeft: number) => {
    const rawTimeFraction = timeLeft / TIME_LIMIT
    const res = rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction)
    return res
  }

  const setCircle = (timeLeft: number) => {
    setCircleDashArray(`${(calculateTimeFraction(timeLeft) * FULL_DASH_ARRAY).toFixed(0)} 283`)
  }

  const initGame = () => {
    getWordsForGame(level - 1, countWordsGame * 2)
      .then((data) => {
        const wordsFromResponse = data
        setWords(wordsFromResponse)
        setIsloadingGame(false)
      })
      .catch((err) => console.log(err))
  }

  const startGame = () => {
    setErrorWords([])
    setSuccessWords([])
    setGame(true)
  }

  useEffect(() => {
    if (words) {
      const arrGame = words.splice(0, countWordsGame)
      const arr = randomArr(words, countWordsGame, '')
      setGameWords(arrGame)
      setArrGameWord(arr)
      setWordIndex(0)
    }
  }, [words])

  const renderAnswerWords = useCallback(
    (index: number) => {
      if (gameWords.length !== 0 && arrGameWord.length !== 0) {
        const wordsAnswer: WordType[] = []
        const random = Math.round(Math.random())
        if (random) {
          wordsAnswer.push(gameWords[index])
          wordsAnswer.push(gameWords[index])
        } else {
          wordsAnswer.push(gameWords[index])
          wordsAnswer.push(arrGameWord[index])
        }
        setAnswerWords(wordsAnswer)
      }
    },
    [arrGameWord, gameWords],
  )

  const handleAnswerClick = useCallback(
    (isRightClicked: boolean) => {
      if (answerWords.length > 0) {
        if (
          isRightClicked
            ? answerWords[0].id === answerWords[1].id
            : answerWords[0].id !== answerWords[1].id
        ) {
          setSuccessWords((prev) => [...prev, answerWords[0]])

          if (!isMute) {
            playSoundSuccess()
          }

          setGreenHighlight(true)
          setTimeout(() => {
            setGreenHighlight(false)
          }, 300)
        } else {
          setErrorWords((prev) => [...prev, answerWords[0]])
          setHelth(helth - 1)

          if (!isMute) {
            playSoundError()
          }

          setRedHighlight(true)
          setTimeout(() => {
            setRedHighlight(false)
          }, 300)
        }
        renderAnswerWords(wordIndex + 1)
        setWordIndex((prev) => prev + 1)
      }
    },
    // eslint-disable-next-line
    [words, answerWords],
  )

  const handleBackClick = useCallback(() => {
    setGameOver(false)
    setHelth(5)
    setGame(false)
    setErrorWords([])
    setSuccessWords([])
  }, [])

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          handleAnswerClick(true)
          break
        case 'ArrowRight':
          handleAnswerClick(false)
          break
        default:
      }
    },
    [handleAnswerClick],
  )

  useEffect(() => {
    if (game) {
      document.addEventListener('keydown', handleKeyPress)
    } else document.removeEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress, game])

  useEffect(() => {
    setIsloadingGame(true)
    setGame(false)
    initGame()
    setHelth(5)
    // eslint-disable-next-line
  }, [level])

  useEffect(() => {
    const interval = setInterval(() => {
      if (game) {
        setTimeSeconds((prev) => {
          const timeLeft = prev - 1
          setCircle(timeLeft)
          return timeLeft
        })
      }
    }, 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [game])

  useEffect(() => {
    if (helth === 0 || timeSeconds === 0) {
      setTimeSeconds(60)
      setGame(false)
      setGameOver(true)
      initGame()
      setHelth(5)
    }
    // eslint-disable-next-line
  }, [helth, timeSeconds])

  useEffect(() => {
    if (wordIndex === countWordsGame) {
      setTimeSeconds(60)
      setGame(false)
      setGameOver(true)
      initGame()
      setHelth(5)
    } else if (gameWords) {
      renderAnswerWords(wordIndex)
    }
    // eslint-disable-next-line
  }, [wordIndex, gameWords])

  return (
    <div className="sprint-game">
      {game ? (
        <>
          <Rate disabled value={helth} character={<HeartFilled />} className="game__health" />
          <div
            className={`sprint-game-start__inner ${greenHighlight ? 'green-highlight' : ''} ${
              redHighlight ? 'red-highlight' : ''
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
                    />
                  </g>
                </svg>
              </div>
              <SoundComponent />
            </div>
            <div className="sprint-game-start__words">
              <p>
                {answerWords[0].word} - {answerWords[1].wordTranslate}
              </p>
            </div>
            <div className="sprint-game-start__buttons">
              <Button type="primary" className="game__btn" onClick={() => handleAnswerClick(true)}>
                <ArrowLeftOutlined className="arrow-icon" />
                RIGHT
              </Button>
              <Button type="primary" className="game__btn" onClick={() => handleAnswerClick(false)}>
                WRONG
                <ArrowRightOutlined className="arrow-icon" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="sprint-game-start">
          {gameOver ? (
            <div className="sprint-game-start__statistics">
              <Statistics
                success={successWords}
                error={errorWords}
                currentGame="sprint"
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
                startGame={() => startGame()}
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
