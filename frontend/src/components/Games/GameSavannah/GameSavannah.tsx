/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react'
import { Switch, Rate, Button } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { HeartFilled } from '@ant-design/icons'
import { WordType } from '../../../store/types/lesson'
import SoundComponent from '../SoundComponent/SoundComponent'
import { playSoundError, playSoundSuccess } from '../utils/soundEffect'
import './GameSavannah.scss'
import randomArr from '../utils/randomArr'
import useTypedSelector from '../../../hooks/useTypedSelector'

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
  const [currentWordIdx, setCurrentWordIdx] = useState<number>(-1)
  const [wordsForGame, setWordsForGame] = useState<Array<WordForGameType>>([])
  const [results, setResults] = useState<Array<boolean>>([])
  const [isFinish, setIsFinish] = useState<boolean>(false)
  const droppedWordRef = useRef<HTMLDivElement>(null)
  const initialTopWordRef = useRef<number>(190)
  const wrongAnswersArr = useRef<Array<WordType>>([])
  const trueAnswersArr = useRef<Array<WordType>>([])

  const [mixedCurrentWords, setMixedCurrentWords] = useState<Array<WordType>>([])

  const { isMute } = useTypedSelector((state) => state.gameReducer)

  const handleWrongAnswer = () => {
    setHelth((prev) => prev - 1)
    initialTopWordRef.current = 190
    setResults((prev) => [...prev, false])
    wrongAnswersArr.current.push(wordsForGame[currentWordIdx].answer)
    if (!isMute) {
      playSoundError()
    }
  }

  const handleTrueAnswer = () => {
    setResults((prev) => [...prev, true])
    initialTopWordRef.current = 190
    trueAnswersArr.current.push(wordsForGame[currentWordIdx].answer)
    if (!isMute) {
      playSoundSuccess()
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isFinish) clearInterval(interval)
      if (initialTopWordRef.current === 360) {
        clearInterval(interval)
        handleWrongAnswer()
        if (currentWordIdx !== 9) {
          setCurrentWordIdx((prev) => prev + 1)
        }
      }

      if (initialTopWordRef.current !== 360) {
        initialTopWordRef.current += 1
        if (droppedWordRef.current) {
          droppedWordRef.current.style.top = `+${initialTopWordRef.current}px`
        }
      }
    }, 50)
    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line
  }, [currentWordIdx, isFinish])

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

  const onFinish = () => {
    console.log(wrongAnswersArr, trueAnswersArr)
  }

  useEffect(() => {
    if (helth === 0) {
      setIsFinish(true)
      onFinish()
    }
  }, [helth])

  const handleAnswerClick = (wordText: string) => {
    if (isFinish) {
      onFinish()
      return
    }
    if (wordText === wordsForGame[currentWordIdx].answer.word) {
      handleTrueAnswer()
    } else {
      handleWrongAnswer()
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
        <div ref={droppedWordRef} className="game-savannah-field__droppedWord">
          {currentWordIdx >= 0
            ? isEN
              ? wordsForGame[currentWordIdx].answer.wordTranslate
              : wordsForGame[currentWordIdx].answer.word
            : null}
        </div>
        <div className="game-savannah-field-answers">
          <div>
            {mixedCurrentWords.map((word) => (
              <button
                type="button"
                className="game-savannah-field-answers__btn"
                key={word.id}
                onClick={() => handleAnswerClick(word.word)}
              >
                {isEN ? word.word : word.wordTranslate}
              </button>
            ))}
          </div>

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
