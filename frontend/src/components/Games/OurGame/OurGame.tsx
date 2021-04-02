/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react'
import { Switch, Rate, Button } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { WordType } from '../../../store/types/lesson'
import SoundComponent from '../SoundComponent/SoundComponent'
import { playSoundError, playSoundSuccess } from '../utils/soundEffect'
import getWordsForGame from '../../../utils/getWordsForGame'
import './OurGame.scss'
import Statistics from '../Statistics/Statistics'
import randomArr from '../utils/randomArr'
import useTypedSelector from '../../../hooks/useTypedSelector'

const OurGame: React.FC = () => {
  const countWords = 5
  const { level } = useTypedSelector((state) => state.gameReducer)
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
  const [gameWords, setGameWords] = useState<WordType[]>([])
  const [arrGameWord, setArrGameWord] = useState<WordType[]>([])

  const getImages = (array: Array<WordType>): void => {
    const img = [...images]
    // eslint-disable-next-line
    array.map((el) => img.push(el.image))
    setImages(img)
    console.log(images)
  }

  const onRestart = () => {}

  const init = () => {
    getWordsForGame(level - 1, countWords * 5)
      .then((data) => {
        const wordsFromResponse = data
        setWords(wordsFromResponse)
        setIsLoading(false)
      })
      .catch((err) => console.log(err))
  }

  const gameplay = () => {
    const item = arrGameWord[Math.floor(Math.random() * arrGameWord.length)]
    const phrase = item.textExample.replace(/'<b>'/g, ' <b>')
    setCurrentPhrase(phrase)
    getImages(arrGameWord)
  }

  const start = () => {
    setIsLoading(false)
    setGame(true)
    setRightWords([])
    setWrongWords([])
    gameplay()
  }

  useEffect(() => {
    init()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (words) {
      start()
      const arrGame = words.splice(0, countWords)
      const arr = randomArr(words, countWords, '')
      setGameWords(arrGame)
      setArrGameWord(arr)
    }
    // eslint-disable-next-line
  }, [words])

  return (
    <>
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
            {images.map((el, index) => (
              <div
                className="game-ourgame-image"
                // eslint-disable-next-line
                key={`${index}img`}
                style={{ backgroundImage: el, width: '200px', height: '200px' }}
              />
            ))}
          </div>
        </div>
      </div>
      {isFinish ? <Statistics success={rightWords} error={wrongWords} back={onRestart} /> : null}
    </>
  )
}

export default OurGame
