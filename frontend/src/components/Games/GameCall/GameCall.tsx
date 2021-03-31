import React, { useCallback, useEffect, useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import Button from 'antd/es/button/button'
import Icon from '@ant-design/icons'
import './GameCall.scss'
import useTypedSelector from '../../../hooks/useTypedSelector'
import { ReactComponent as volumeOnIcon } from '../../../assets/icons/volume-on.svg'
import Title from '../Title/Title'
import { GAMES_INFO } from '../utils/gamesInfo'
import randomArr from '../utils/randomArr'
import playSound from '../../../utils/playSound'
import { WordType } from '../../../store/types/lesson'
import getWordsForGame from '../../../utils/getWordsForGame'
import renderArrAnswerWords from '../utils/renderArrAnswerWords'
import { playSoundSuccess, playSoundError } from '../utils/soundEffect'
import Statistics from '../Statistics/Statistics'
import FullScreenBtn from '../FullScreenBtn/FullScreenBtn'

const GameCall: React.FC = () => {
  const { level } = useTypedSelector((state) => state.gameReducer)
  const [game, setGame] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [words, setWords] = useState<WordType[]>([])
  const [gameWords, setGameWords] = useState<WordType[]>([])
  const [arrGameWord, setArrGameWord] = useState<WordType[]>([])
  const [currentWord, setCurrentWord] = useState<WordType>()
  const [answerWords, setAnswerWords] = useState<WordType[]>([])
  const [successWords, setSuccessWords] = useState<WordType[]>([])
  const [errorWords, setErrorWords] = useState<WordType[]>([])
  const [indexWord, setIndexWord] = useState<number>(0)
  const [isloadingGame, setIsloadingGame] = useState(true)

  const handleFullScreen = useFullScreenHandle()
  const countWords = 5

  const escFunction = useCallback(() => {
    if (!document.fullscreenElement) {
      setFullScreen(false)
    }
  }, [])

  const startGame = () => {
    setErrorWords([])
    setSuccessWords([])
    setGame(true)
  }
  const initGame = () => {
    getWordsForGame(level - 1, countWords * 5)
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
    // eslint-disable-next-line
  }, [level])

  useEffect(() => {
    if (words) {
      const arrGame = words.splice(0, countWords)
      const arr = randomArr(words, countWords * 4, '')
      setGameWords(arrGame)
      setArrGameWord(arr)
    }
  }, [words])

  useEffect(() => {
    document.addEventListener('fullscreenchange', escFunction)
    return () => {
      document.removeEventListener('fullscreenchange', escFunction, false)
    }
  }, [fullScreen, escFunction])

  const playWord = useCallback(() => {
    if (currentWord) playSound(currentWord.audio)
  }, [currentWord])

  const checkWord = useCallback(
    (word: WordType) => {
      setIndexWord((prev) => prev + 1)
      if (currentWord)
        if (currentWord.word === word.word) {
          playSoundSuccess()
          setSuccessWords([...successWords, currentWord])
        } else {
          playSoundError()
          setErrorWords([...errorWords, currentWord])
        }
    },
    [currentWord, errorWords, successWords],
  )
  const skipWord = () => {
    setIndexWord((prev) => prev + 1)
    if (currentWord) setErrorWords([...errorWords, currentWord])
  }

  useEffect(() => {
    if (currentWord && game) setTimeout(() => playWord(), 300)
  }, [currentWord, game, playWord])
  const renderCurrentWord = useCallback(
    (index: number) => {
      setCurrentWord(gameWords[index])
    },
    [gameWords],
  )

  useEffect(() => {
    if (indexWord === countWords) {
      setGame(false)
      setGameOver(true)
      initGame()
    } else if (gameWords) {
      renderCurrentWord(indexWord)
      renderAnswerWords(indexWord)
    }
    // eslint-disable-next-line
  }, [gameWords, indexWord, renderCurrentWord, renderAnswerWords])

  return (
    <FullScreen handle={handleFullScreen} className="fullscreen-call">
      <>
        {game ? (
          <div className="call">
            <Button
              className="call__btn_play-sound"
              icon={<Icon className="sound-icon" component={volumeOnIcon} />}
              onClick={playWord}
            />
            <div className="call__wrapper-btn">
              {answerWords.map((word: WordType) => (
                <Button
                  type="primary"
                  className="game__btn"
                  key={word.word}
                  onClick={() => checkWord(word)}
                >
                  {word.wordTranslate}
                </Button>
              ))}
            </div>
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
                back={() => setGameOver(false)}
              />
            ) : (
              <Title
                title={GAMES_INFO.call.title}
                description={GAMES_INFO.call.description}
                settings={GAMES_INFO.call.settings}
                loading={isloadingGame}
                startGame={() => startGame()}
              />
            )}
          </>
        )}
      </>
      <FullScreenBtn
        fullScreen={fullScreen}
        toggle={() => setFullScreen(!fullScreen)}
        handleFullScreen={handleFullScreen}
      />
    </FullScreen>
  )
}

export default GameCall
