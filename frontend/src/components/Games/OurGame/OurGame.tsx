/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
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
  let gameImage = null
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

  const gameplay = useCallback((array: Array<WordType>) => {
    try {
      const item = array[Math.floor(Math.random() * array.length)]
      const phrase = item.textExample.replace(/'<b>'/g, ' <b>')
      setCurrentWord(item)
      setCurrentPhrase(phrase)
      getImages(array)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const start = () => {
    setIsLoading(false)
    setGame(true)
    setRightWords([])
    setWrongWords([])
    setRounds(0)
  }

  const checkWord = useCallback(
    (element: any, word: string) => {
      console.log(currentWord?.word)
      console.log(word)
      if (currentWord)
        if (currentWord?.word === word) {
          playSoundSuccess()
          setRightWords([...rightWords, currentWord])
          // eslint-disable-next-line
          element?.classList.add('game-ourgame-right')
          // eslint-disable-next-line
          element?.addEventListener('transitionend', function () {
            // eslint-disable-next-line
            element?.classList.remove('game-ourgame-right')
          })
          console.log(rightWords)
        } else {
          playSoundError()
          setWrongWords([...wrongWords, currentWord])
          // eslint-disable-next-line
          element.classList.add('game-ourgame-wrong')
          // eslint-disable-next-line
          element?.addEventListener('transitionend', function () {
            // eslint-disable-next-line
            element?.classList.remove('game-ourgame-wrong')
          })
          setHealth(health - health / words.length / countWordsGame)
          console.log(wrongWords)
        }
    },
    // eslint-disable-next-line
    [currentWord, wrongWords, rightWords, health],
  )

  const handleAnswer = useCallback(
    (event: any = null, value: string, element = null): void => {
      if (rounds < 4) {
        // eslint-disable-next-line
        event !== null ? checkWord(event.target, value) : checkWord(element, value)
        const arrGame = words.splice(0, countWordsGame)
        const arr = randomArr(arrGame, countWordsGame, '')
        setGameWords(arrGame)
        setArrGameWord(arr)
        console.log(arrGameWord)
        console.log(arrGame)
        setTimeout(() => {
          gameplay(arr)
        }, 2000)
        setRounds(rounds + 1)
      } else {
        setGame(false)
        setFinish(true)
      }
    },
    [arrGameWord, checkWord, countWordsGame, gameplay, rounds, words],
  )

  useEffect(() => {
    setGame(false)
    setIsLoading(true)
    init()
    // eslint-disable-next-line
  }, [level])

  useEffect(() => {
    if (words.length > 0) {
      const arrGame = words.splice(0, countWordsGame)
      const arr = randomArr(arrGame, countWordsGame, '')
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
    gameplay(arrGameWord)
  }

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const element = document.querySelectorAll('.game-image')
      // eslint-disable-next-line
      const num: number = Number(event.key)
      switch (event.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          handleAnswer(null, answer[parseInt(event.key, 10) - 1], element[num - 1])
          break
        default:
          console.log('default')
      }
    },
    // eslint-disable-next-line
    [answer, handleAnswer],
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
                  // eslint-disable-next-line
                  ref={(btn) => (gameImage = btn)}
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
