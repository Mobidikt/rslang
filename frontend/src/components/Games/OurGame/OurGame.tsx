/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useState } from 'react'
import { Switch, Rate, Button } from 'antd'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { v4 as uuidv4 } from 'uuid'
import { WordType } from '../../../store/types/lesson'
import SoundComponent from '../SoundComponent/SoundComponent'
import { playSoundError, playSoundSuccess } from '../utils/soundEffect'
import getWordsForGame from '../../../utils/getWordsForGame'
// eslint-disable-next-line
import config from '../../../config'
import './OurGame.scss'
import Statistics from '../Statistics/Statistics'
import randomArr from '../utils/randomArr'
import useTypedSelector from '../../../hooks/useTypedSelector'
import FullScreenBtn from '../FullScreenBtn/FullScreenBtn'

const OurGame: React.FC = () => {
  const countWords = 5
  const { level, countWordsGame } = useTypedSelector((state) => state.gameReducer)
  const [words, setWords] = useState<WordType[]>([])
  const [game, setGame] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [isFinish, setFinish] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [rightWords, setRightWords] = useState<WordType[]>([])
  const [wrongWords, setWrongWords] = useState<WordType[]>([])
  const [health, setHealth] = useState(5)
  const [currentPhrase, setCurrentPhrase] = useState<string>()
  const [currentWord, setCurrentWord] = useState<WordType>()
  const [gameWords, setGameWords] = useState<WordType[]>([])
  const [arrGameWord, setArrGameWord] = useState<WordType[]>([])
  const [rounds, setRounds] = useState(0)
  const [answer, setAnswer] = useState('')

  const handleFullScreen = useFullScreenHandle()

  const getImages = (array: Array<WordType>): void => {
    const img: Array<string> = []
    // eslint-disable-next-line
    array.map((el) => img.push(el.image))
    setImages(img)
    console.log(array)
  }

  const init = () => {
    getWordsForGame(level - 1, countWordsGame * 5)
      .then((data) => {
        const wordsFromResponse = data
        setWords(wordsFromResponse)
        setIsLoading(false)
      })
      .catch((err) => console.log(err))
  }

  const gameplay = (array: Array<WordType>) => {
    try {
      const item = array[Math.floor(Math.random() * array.length)]
      const phrase = item.textExample.replace(/'<b>'/g, ' <b>')
      setCurrentWord(item)
      setCurrentPhrase(phrase)
      getImages(array)
      console.log(words)
    } catch (error) {
      console.log(error)
    }
  }

  const start = () => {
    setIsLoading(false)
    setGame(true)
    setRightWords([])
    setWrongWords([])
    setRounds(0)
    gameplay(arrGameWord)
  }

  const checkWord = useCallback(
    (element: HTMLElement, word: string) => {
      console.log(currentWord?.word)
      console.log(word)
      if (currentWord)
        if (currentWord?.word === word) {
          playSoundSuccess()
          setRightWords([...rightWords, currentWord])
          // eslint-disable-next-line
          element.classList.add('game-ourgame-right')
          element?.addEventListener('transitionend', () => {
            element.classList.remove('game-ourgame-right')
          })
          console.log(rightWords)
        } else {
          playSoundError()
          setWrongWords([...wrongWords, currentWord])
          // eslint-disable-next-line
          element.classList.add('game-ourgame-wrong')
          setHealth(health - health / words.length / countWordsGame)
          console.log(wrongWords)
        }
    },
    // eslint-disable-next-line
    [currentWord, wrongWords, rightWords, health],
  )

  const handleAnswer = (event: any, value: string, key = null): void => {
    if (rounds < 4) {
      // eslint-disable-next-line
      const idAnswer = event.target.id
      setAnswer(value)
      // eslint-disable-next-line
      checkWord(event.target, idAnswer || value || answer)
      const arrGame = words.splice(
        countWordsGame * rounds,
        countWordsGame * rounds + countWordsGame,
      )
      const arr = randomArr(words, countWordsGame, '')
      setGameWords(arrGame)
      setArrGameWord(arr)
      console.log(arrGameWord)
      gameplay(arr)
      setRounds(rounds + 1)
    } else {
      setGame(false)
      setFinish(true)
    }
  }

  useEffect(() => {
    setGame(false)
    setIsLoading(true)
    init()
    // eslint-disable-next-line
  }, [level])

  useEffect(() => {
    if (words.length > 0) {
      const arrGame = words.splice(0, countWordsGame)
      const arr = randomArr(words, countWordsGame, '')
      setGameWords(arrGame)
      setArrGameWord(arr)
      gameplay(arr)
    }
    // eslint-disable-next-line
  }, [words, countWordsGame])

  const onRestart = () => {
    start()
    // eslint-disable-next-line
    init()
  }

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const element = document.querySelectorAll('.game-ourgame-image')
      // eslint-disable-next-line
      const num: number = Number(event.key)
      switch (event.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          checkWord(element[num], answer[parseInt(event.key, 10) - 1])
          break
        default:
          console.log('default')
      }
    },
    [answer, checkWord],
  )
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <FullScreen handle={handleFullScreen} className="fullscreen-ourgame">
      <div className="game-ourgame">
        <div className="game-ourgame-header">
          <div className="game-ourgame-header-settings">
            <SoundComponent />
          </div>
          <Rate disabled value={health} style={{ fontSize: '25px', color: '#161616' }} />
        </div>
        <div className="game-ourgame-field">
          {currentPhrase && (
            // eslint-disable-next-line
            <h3 dangerouslySetInnerHTML={{ __html: currentPhrase }}></h3>
          )}
          <div className="game-images-wrapper">
            {arrGameWord &&
              arrGameWord.map((word: WordType) => (
                <button
                  className="game-ourgame-image"
                  // eslint-disable-next-line
                  key={word.word}
                  onClick={(event) => handleAnswer(event, word.word)}
                  type="button"
                >
                  <img src={`${config.API_URL}/${word.image}`} className="game-image" alt="" />
                </button>
              ))}
          </div>
        </div>
      </div>
      {isFinish ? <Statistics success={rightWords} error={wrongWords} back={onRestart} /> : null}
      <FullScreenBtn
        fullScreen={fullScreen}
        toggle={() => setFullScreen(!fullScreen)}
        handleFullScreen={handleFullScreen}
      />
    </FullScreen>
  )
}

export default OurGame
