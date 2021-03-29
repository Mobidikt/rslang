/* eslint-disable */
// @ts-ignore
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
import randomArr from '../utils/randomArr'
import playSound from '../../../utils/playSound'
import SettingsGame from '../Settings/Settings'
import { WordType } from '../../../store/types/lesson'
import getWordsForGame from '../../../utils/getWordsForGame'
const GameCall: React.FC = () => {
  const { level } = useTypedSelector((state) => state.gameReducer)
  const [game, setGame] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
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
    setGame(true)
    if (currentWord) setTimeout(() => playSound(currentWord.audio), 300)
  }

  const getWords = useCallback(async () => {
    const wordsFromResponse = await getWordsForGame(level, 100)
    setWords(wordsFromResponse)
    setGame(false)
    setIsloadingGame(false)
    let result: any = []
  }, [level])

  const renderAnswerWords = useCallback(
    (index: number) => {
      if (gameWords.length !== 0 && arrGameWord.length !== 0) {
        let wordsAnswer: WordType[] = []
        wordsAnswer.push(gameWords[index])
        wordsAnswer.push(arrGameWord[index * 4])
        wordsAnswer.push(arrGameWord[index * 4 + 1])
        wordsAnswer.push(arrGameWord[index * 4 + 2])
        wordsAnswer.push(arrGameWord[index * 4 + 3])

        wordsAnswer = randomArr(wordsAnswer, 5, '')
        setAnswerWords(wordsAnswer)
      }
    },
    [arrGameWord, gameWords],
  )

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getWords()
  }, [getWords])

  useEffect(() => {
    if (indexWord === countWords) {
      setGame(false)
    } else if (gameWords) {
      setCurrentWord(gameWords[indexWord])
      renderAnswerWords(indexWord)
    }
  }, [gameWords, indexWord, renderAnswerWords])

  useEffect(() => {
    if (words) {
      const arr = randomArr(words, 100, '')
      const arrGame = arr.splice(0, countWords)
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

  const playSoundError = (): void => {
    const audio = new Audio('../../../assets/sounds/error.mp3')
    audio
      .play()
      .then(() => {})
      .catch(() => {})
  }
  const checkWord = useCallback(
    (word: WordType) => {
      setIndexWord((prev) => prev + 1)
      if (currentWord)
        if (currentWord.word === word.word) {
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
    } else if (gameWords) {
      renderCurrentWord(indexWord)
      renderAnswerWords(indexWord)
    }
  }, [gameWords, indexWord, renderCurrentWord, renderAnswerWords])

  useEffect(() => {
    if (indexWord === countWords) {
      setGame(false)
    } else if (gameWords) {
      renderCurrentWord(indexWord)
      renderAnswerWords(indexWord)
    }
  }, [indexWord, gameWords, renderAnswerWords, renderCurrentWord])

  return (
    <FullScreen handle={handleFullScreen} className="fullscreen-call">
      <>
        {game ? (
          <div className="call">
            <Button
              className="call__btn_play-sound"
              icon={
                <Icon className="sound-icon" component={soundOn ? volumeOnIcon : volumeOffIcon} />
              }
              onClick={playWord}
            />
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
          <Title
            title={GAMES_INFO.call.title}
            description={GAMES_INFO.call.description}
            settings={GAMES_INFO.call.settings}
            loading={isloadingGame}
            startGame={() => startGame()}
          />
        )}
      </>
      <SettingsGame />
    </FullScreen>
  )
}

export default GameCall