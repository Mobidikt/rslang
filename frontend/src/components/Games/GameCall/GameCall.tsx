import React, { useCallback, useEffect, useState } from 'react'
import Icon, { HeartFilled } from '@ant-design/icons'
import { Rate, Button } from 'antd'
import './GameCall.scss'
import '../Games.scss'
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
  const { level, countWordsGame } = useTypedSelector((state) => state.gameReducer)
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
  const [health, setHealth] = useState<number>(5)
  const [isloadingGame, setIsloadingGame] = useState(true)

  const escFunction = useCallback(() => {
    if (!document.fullscreenElement) {
      setFullScreen(false)
    }
  }, [])

  const handleFullScreen = () => {
    setFullScreen(!fullScreen)
  }
  useEffect(() => {
    if (fullScreen) {
      document.body.style.position = 'fixed'
    } else document.body.style.position = ''
  }, [fullScreen])

  const startGame = () => {
    setErrorWords([])
    setSuccessWords([])
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
          setHealth(health - 1)
        }
    },
    // eslint-disable-next-line
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
  }, [gameWords, indexWord, renderCurrentWord, renderAnswerWords])

  useEffect(() => {
    if (gameOver) {
      document.removeEventListener('keydown', handleKeyPress)
    } else document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress, gameOver])

  return (
    <div className={`game-call ${fullScreen ? 'full-screen' : ''} `}>
      {game ? (
        <div className="call">
          <Rate disabled value={health} character={<HeartFilled />} className="game-call__health" />
          <Button
            className="game__btn call__btn_play-sound"
            icon={<Icon className="sound-icon" component={volumeOnIcon} />}
            onClick={playWord}
          />
          <div className="call__wrapper-btn">
            {answerWords.map((word: WordType, i: number) => (
              <Button
                type="primary"
                className="game__btn"
                key={word.word}
                onClick={() => checkWord(word)}
              >
                {i + 1} {word.wordTranslate}
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
            <Statistics success={successWords} error={errorWords} back={() => setGameOver(false)} />
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
      <FullScreenBtn fullScreen={fullScreen} toggle={handleFullScreen} />
    </div>
  )
}

export default GameCall
