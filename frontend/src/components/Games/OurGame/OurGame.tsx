/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { HeartFilled } from '@ant-design/icons'
import { Rate, Button } from 'antd'
import '../GameCall/GameCall.scss'
import '../Games.scss'
import './OurGame.scss'
import useTypedSelector from '../../../hooks/useTypedSelector'
import Title from '../Title/Title'
import { GAMES_INFO } from '../utils/gamesInfo'
import randomArr from '../utils/randomArr'
import { WordType } from '../../../store/types/lesson'
import getWordsForGame from '../../../utils/getWordsForGame'
import renderArrAnswerWords from '../utils/renderArrAnswerWords'
import { playSoundSuccess, playSoundError } from '../utils/soundEffect'
import Statistics from '../Statistics/Statistics'
import Result from '../Result/Result'
import config from '../../../config'

const OurGame: React.FC = () => {
  const { level, countWordsGame } = useTypedSelector((state) => state.gameReducer)
  const [game, setGame] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [words, setWords] = useState<WordType[]>([])
  const [gameWords, setGameWords] = useState<WordType[]>([])
  const [arrGameWord, setArrGameWord] = useState<WordType[]>([])
  const [currentWord, setCurrentWord] = useState<WordType>()
  const [answerWords, setAnswerWords] = useState<WordType[]>([])
  const [successWords, setSuccessWords] = useState<WordType[]>([])
  const [errorWords, setErrorWords] = useState<WordType[]>([])
  const [indexWord, setIndexWord] = useState<number>(0)
  const [health, setHealth] = useState<number>(5)
  const [isloadingGame, setIsloadingGame] = useState<boolean>(true)
  const textExampleRef = useRef<HTMLSpanElement>(null)

  const startGame = () => {
    setErrorWords([])
    setSuccessWords([])
    setHealth(5)
    setGame(true)
  }
  const initGame = () => {
    getWordsForGame(level - 1, countWordsGame * 5)
      .then((data) => {
        const wordsFromResponse = data
        setWords(wordsFromResponse)
        setIsloadingGame(false)
        setIndexWord(0)
      })
      .catch((err) => console.log(err))
  }
  const renderAnswerWords = useCallback(
    (index: number) => {
      if (gameWords.length !== 0 && arrGameWord.length !== 0) {
        const wordsAnswer = renderArrAnswerWords(gameWords, arrGameWord, index)
        setAnswerWords(randomArr(wordsAnswer, 5, ''))
      }
    },
    [arrGameWord, gameWords],
  )

  useEffect(() => {
    setGame(false)
    setIsloadingGame(true)
    initGame()
    setHealth(5)
    // eslint-disable-next-line
  }, [level])

  useEffect(() => {
    if (words) {
      const arrGame = words.splice(0, countWordsGame)
      const arr = randomArr(words, countWordsGame * 4, '')
      setGameWords(arrGame)
      setArrGameWord(arr)
    }
  }, [words, countWordsGame])

  const checkWord = useCallback(
    (word: WordType) => {
      setIndexWord((prev) => prev + 1)
      if (currentWord)
        if (currentWord.word === word.word) {
          playSoundSuccess()
          setSuccessWords((prev) => [...prev, currentWord])
        } else {
          playSoundError()
          setErrorWords((prev) => [...prev, currentWord])
          setHealth((prev) => prev - 1)
        }
    },
    [currentWord],
  )

  const handleAnimation = (event: any = null, value: string, element = null): void => {
    // eslint-disable-next-line
    event !== null ? checkWord(event.target, value) : checkWord(element, value)
    setTimeout(() => {
      const arrGame = words.splice(0, countWordsGame)
      const arr = randomArr(arrGame, countWordsGame / 2, '')
      setGameWords(arrGame)
      setArrGameWord(arr)
      console.log(arrGameWord)
      console.log(arrGame)
    }, 1000)
  }

  const skipWord = () => {
    setIndexWord((prev) => prev + 1)
    if (currentWord) {
      setErrorWords((prev) => [...prev, currentWord])
      setHealth((prev) => prev - 1)
    }
  }

  const renderCurrentWord = useCallback(
    (index: number) => {
      if (gameWords.length > 0) {
        setCurrentWord(gameWords[index])
      }
    },
    [gameWords],
  )

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          checkWord(answerWords[parseInt(event.key, 10) - 1])
          break
        default:
      }
    },
    [answerWords, checkWord],
  )
  useEffect(() => {
    if (indexWord === countWordsGame || health === 0) {
      setGame(false)
      setGameOver(true)
      initGame()
      setHealth(5)
    } else if (gameWords) {
      renderCurrentWord(indexWord)
      renderAnswerWords(indexWord)
    }
    // eslint-disable-next-line
  }, [gameWords, indexWord, renderCurrentWord, renderAnswerWords, countWordsGame, health])

  useEffect(() => {
    if (game) {
      document.addEventListener('keydown', handleKeyPress)
    } else document.removeEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress, game])
  useEffect(() => {
    console.log(textExampleRef)
    if (textExampleRef.current) {
      textExampleRef.current.innerHTML = gameWords[indexWord].textExample || ''
    }
    // eslint-disable-next-line
  }, [game, indexWord])
  return (
    <>
      {game ? (
        <div className="call">
          <Rate disabled value={health} character={<HeartFilled />} className="game__health" />
          <span className="word-info-text__example" ref={textExampleRef} />
          <div className="game-images-wrapper">
            {answerWords.map((word: WordType) => (
              <button
                type="button"
                className="game-ourgame-image"
                key={word.word}
                onClick={() => checkWord(word)}
              >
                <img
                  src={`${config.API_URL}/${word.image}`}
                  className="game-image"
                  id={word.word}
                  alt=""
                />
              </button>
            ))}
          </div>
          <Result
            successWords={successWords}
            countWordsGame={countWordsGame}
            errorWords={errorWords}
          />
          <Button type="primary" className="game__btn" onClick={skipWord}>
            Пропустить
          </Button>
        </div>
      ) : (
        <>
          {gameOver ? (
            <Statistics
              success={successWords}
              error={errorWords}
              currentGame="ourGame"
              back={() => setGameOver(false)}
            />
          ) : (
            <Title
              title={GAMES_INFO.ourgame.title}
              description={GAMES_INFO.ourgame.description}
              settings={GAMES_INFO.ourgame.settings}
              loading={isloadingGame}
              startGame={() => startGame()}
            />
          )}
        </>
      )}
    </>
  )
}

export default OurGame