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
/* eslint-disable */
// @ts-ignore
const GameCall: React.FC = () => {
  const { level } = useTypedSelector((state) => state.gameReducer)
  const [startGame, setStartGame] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)
  const [words, setWords] = useState<any>()
  const [gameWords, setGameWords] = useState<any>()
  const [arrGameWord, setArrGameWord] = useState<any>()
  const [currentWord, setCurrentWord ] = useState<any>()
  const [answerWords, setAnswerWords ] = useState<any>()

  const handleFullScreen = useFullScreenHandle()

  const escFunction = useCallback(() => {
    if (!document.fullscreenElement) {
      setFullScreen(false)
    }
  }, [])

  /**
   * Загружаем все слова из категории
   */
  useEffect(() => {
    let result: any = []
    wordApi.getByGroupAndPage(level - 1, 0).then((res) => {
      result = res.data
      wordApi.getByGroupAndPage(level - 1, 1).then((res) => {
        result = result.concat(res.data)
        wordApi.getByGroupAndPage(level - 1, 2).then((res) => {
          result = result.concat(res.data)
          wordApi.getByGroupAndPage(level - 1, 3).then((res) => {
            result = result.concat(res.data)
            wordApi.getByGroupAndPage(level - 1, 4).then((res) => {
              result = result.concat(res.data)
              wordApi.getByGroupAndPage(level - 1, 5).then((res) => {
                result = result.concat(res.data)
                setWords(result)
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
      let arrGame = arr.splice(0, 20)
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
    if (currentWord.word === word.word) {
      return console.log('ура')
    }
    return console.log('err')
  }


  const renderAnswerWords = (index: number) => {
    let answerWords: any = []
    answerWords.push(gameWords[index])
    answerWords.push(arrGameWord[index*2])
    answerWords.push(arrGameWord[index*2+1])
    answerWords.push(arrGameWord[index*2+2])
    answerWords.push(arrGameWord[index*2+3])
    answerWords = randomArr(answerWords, 5)
    setAnswerWords(answerWords)
  }

  useEffect(() => {
  const renderCurrentWord = (index: number) => {
    setCurrentWord(gameWords[index])
  }
  if (gameWords) {
    console.log('test')
    renderCurrentWord(0)
    renderAnswerWords(0)
  }
  },[gameWords])

console.log(answerWords)


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
              {answerWords?.map((word: any) => (
                <Button type="primary" className="game__btn" key={word.word} onClick={()=>checkWord(word)}>
                  {word.wordTranslate}
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
