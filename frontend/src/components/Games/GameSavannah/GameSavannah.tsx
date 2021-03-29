import React, { useState, useEffect } from 'react'
import { Switch, Rate, Button } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { HeartFilled } from '@ant-design/icons'
import { WordType } from '../../../store/types/lesson'
import SoundComponent from '../SoundComponent/SoundComponent'
import './GameSavannah.scss'
import randomArr from '../utils/randomArr'

type GameSavannahType = {
  words: Array<WordType>,
}

type WordForGameType = {
  answer: WordType,
  wrongAnswers: Array<WordType>,
}

const GameSavannah: React.FC<GameSavannahType> = ({ words }) => {
  const [helth, setHelth] = useState<number>(5)
  const [isEN, setIsEN] = useState<boolean>(true)
  const [isLoos, setIsLoos] = useState<boolean>(false)
  const [currentWordIdx, setCurrentWordIdx] = useState<number>(-1)
  const [wordsForGame, setWordsForGame] = useState<Array<WordForGameType>>([])
  const [results, setResults] = useState<Array<boolean>>([])
  const [isFinish, setIsFinish] = useState<boolean>(false)

  const [mixedCurrentWords, setMixedCurrentWords] = useState<Array<WordType>>([])
  // console.log(randomArr(words, 4, rigthWords[0].id))

  const mixArr = (arr: Array<WordType>) => {
    return arr.sort(() => Math.random() - 0.5)
  }

  useEffect(() => {
    setWordsForGame(
      randomArr(words, 10, '').map((word) => {
        return {
          answer: word,
          wrongAnswers: randomArr(words, 4, word.id),
        }
      }),
    )
    setCurrentWordIdx(0)
  }, [setWordsForGame, words])

  useEffect(() => {
    if (currentWordIdx >= 0) {
      const { answer, wrongAnswers } = wordsForGame[currentWordIdx]
      setMixedCurrentWords(mixArr([answer, ...wrongAnswers]))
    }

    // eslint-disable-next-line
  }, [currentWordIdx])

  const isGameOver = () => {
    return helth === 0
  }

  const handleWrongAnswer = () => {
    setHelth((prev) => prev - 1)
    if (isGameOver()) {
      setIsLoos(true)
    }
  }

  const handleAnswerClick = (wordText: string) => {
    if (!setIsFinish) return
    if (wordText === wordsForGame[currentWordIdx].answer.word) {
      setResults((prev) => [...prev, true])
    } else {
      handleWrongAnswer()
      setResults((prev) => [...prev, false])
    }
    if (currentWordIdx === 9) setIsFinish(true)
    if (currentWordIdx !== 9) {
      setCurrentWordIdx((prev) => prev + 1)
    }
  }

  return (
    <div className="game-savannah">
      <div className="game-savannah-header">
        <div className="game-savannah-header-settings">
          <SoundComponent />
          <Switch
            checkedChildren="EN"
            unCheckedChildren="RU"
            onChange={() => setIsEN((prev) => !prev)}
            defaultChecked
          />
        </div>
        <Rate disabled value={helth} character={<HeartFilled />} style={{ fontSize: '25px' }} />
      </div>
      <div className="game-savannah-field">
        <div className="game-savannag-field-droppedWord">
          {currentWordIdx >= 0 ? wordsForGame[currentWordIdx].answer.wordTranslate : null}
        </div>
        <div className="game-savannah-field-answers">
          {mixedCurrentWords.map((word) => (
            <Button
              className="game-savannah-field-answers__btn"
              key={word.id}
              onClick={() => handleAnswerClick(word.word)}
            >
              {word.word}
            </Button>
          ))}
          <div className="game-savannah-field-answers-results">
            {results.map((result) => (
              <div
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                key={uuidv4()}
                className={
                  result
                    ? 'game-savannah-field-answers-results--true'
                    : 'game-savannah-field-answers-results--false'
                }
              >
                {result ? '+' : '-'}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameSavannah
