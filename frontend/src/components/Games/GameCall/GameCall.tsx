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
/* eslint-disable */
// @ts-ignore
const GameCall: React.FC = () => {
  const { level } = useTypedSelector((state) => state.gameReducer)
  const [game, setGame] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)
  const [words, setWords] = useState<any>()
  const [gameWords, setGameWords] = useState<any>()
  const [arrGameWord, setArrGameWord] = useState<any>()
  const [currentWord, setCurrentWord] = useState<any>()
  const [answerWords, setAnswerWords] = useState<any>()
  const [successWords, setSuccessWords] = useState<any[]>([])
  const [errorWords, setErrorWords] = useState<any[]>([])
  const [indexWord, setIndexWord] = useState<number>(0)
  const [isloadingGame, setIsloadingGame] = useState(true)

  const handleFullScreen = useFullScreenHandle()
  const countWords = 5
  const escFunction = useCallback(() => {
    if (!document.fullscreenElement) {
      setFullScreen(false)
    }
  }, [])

  /**
   * Загружаем все слова из категории
   */
  useEffect(() => {
    setGame(false)
    setIsloadingGame(true)
    let result: any = []
    wordApi.getByGroupAndPage(level - 1, 0).then((res) => {
      result = res
      wordApi.getByGroupAndPage(level - 1, 1).then((res) => {
        result = result.concat(res)
        wordApi.getByGroupAndPage(level - 1, 2).then((res) => {
          result = result.concat(res)
          wordApi.getByGroupAndPage(level - 1, 3).then((res) => {
            result = result.concat(res)
            wordApi.getByGroupAndPage(level - 1, 4).then((res) => {
              result = result.concat(res)
              wordApi.getByGroupAndPage(level - 1, 5).then((res) => {
                result = result.concat(res)
                setWords(result)
                setIsloadingGame(false)
              })
            })
          })
        })
      })
    })
  }, [level])

  useEffect(() => {
    if (words) {
      console.log(words)
      let arr = randomArr(words, 100)
      let arrGame = arr.splice(0, countWords)
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

  const playWord = () => {
    playSound(currentWord.audio)
  }

  const playSoundError = (): void => {
    const audio = new Audio('../../../assets/sounds/error.mp3')
    audio
      .play()
      .then(() => {})
      .catch(() => {})
  }
  const checkWord = (word: any) => {
    setIndexWord((prev) => prev + 1)
    if (currentWord.word === word.word) {
      setSuccessWords([...successWords, currentWord])
    } else {
      playSoundError()
      setErrorWords([...errorWords, currentWord])
    }
  }
  const skipWord = () => {
    setIndexWord((prev) => prev + 1)
    setErrorWords([...errorWords, currentWord])
  }

  useEffect(() => {
    if (indexWord === countWords) {
      console.log(successWords, errorWords)
    } else {
      if (gameWords) {
        renderCurrentWord(indexWord)
        renderAnswerWords(indexWord)
      }
    }
  }, [indexWord])

  const renderAnswerWords = (index: number) => {
    let answerWords: any = []
    answerWords.push(gameWords[index])
    answerWords.push(arrGameWord[index * 4])
    answerWords.push(arrGameWord[index * 4 + 1])
    answerWords.push(arrGameWord[index * 4 + 2])
    answerWords.push(arrGameWord[index * 4 + 3])
    answerWords = randomArr(answerWords, 5)
    setAnswerWords(answerWords)
  }
  useEffect(() => {
    if (currentWord && game) setTimeout(() => playWord(), 300)
  }, [currentWord])
  const renderCurrentWord = (index: number) => {
    setCurrentWord(gameWords[index])
  }
  useEffect(() => {
    if (gameWords) {
      renderCurrentWord(indexWord)
      renderAnswerWords(indexWord)
    }
  }, [gameWords])

  const startGame = () => {
    setGame(true)
    setTimeout(() => playSound(currentWord.audio), 300)
  }
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
              {answerWords.map((word: any) => (
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
