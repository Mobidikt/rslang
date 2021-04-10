/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Switch, Rate, Button } from 'antd'
import { HeartFilled } from '@ant-design/icons'
import { WordType } from '../../../store/types/lesson'
import SoundComponent from '../SoundComponent/SoundComponent'
import { playSoundError, playSoundSuccess } from '../utils/soundEffect'
import './GameSavannah.scss'
import '../Games.scss'
import Statistics from '../Statistics/Statistics'
import randomArr from '../utils/randomArr'
import useTypedSelector from '../../../hooks/useTypedSelector'
import Result from '../Result/Result'

type GameSavannahType = {
  words: Array<WordType>,
  onRestart: () => void,
  calcBackgroundY: (count: number) => void,
}

type WordForGameType = {
  answer: WordType,
  wrongAnswers: Array<WordType>,
}

const GameSavannah: React.FC<GameSavannahType> = ({ words, onRestart, calcBackgroundY }) => {
  const [helth, setHelth] = useState<number>(5)
  const [isEN, setIsEN] = useState<boolean>(true)
  const [currentWordIdx, setCurrentWordIdx] = useState<number>(-1)
  const [wordsForGame, setWordsForGame] = useState<Array<WordForGameType>>([])
  const [isFinish, setIsFinish] = useState<boolean>(false)
  const droppedWordRef = useRef<HTMLDivElement>(null)
  const initialTopWordRef = useRef<number>(190)
  const wrongAnswersArr = useRef<Array<WordType>>([])
  const trueAnswersArr = useRef<Array<WordType>>([])

  const [mixedCurrentWords, setMixedCurrentWords] = useState<Array<WordType>>([])

  const { isMute, countWordsGame } = useTypedSelector((state) => state.gameReducer)

  const handleAnimation = (el: HTMLButtonElement, ans: string): void => {
    el?.classList.add(`savannah-${ans}`)
    el.addEventListener('transitionend', () => el.classList.remove(`savannah-${ans}`))
  }

  const handleWrongAnswer = useCallback(() => {
    setHelth((prev) => prev - 1)
    initialTopWordRef.current = 190
    wrongAnswersArr.current.push(wordsForGame[currentWordIdx].answer)
    if (!isMute) {
      playSoundError()
    }
  }, [isMute, wordsForGame, currentWordIdx])

  const handleTrueAnswer = useCallback(
    () => {
      initialTopWordRef.current = 190
      trueAnswersArr.current.push(wordsForGame[currentWordIdx].answer)
      calcBackgroundY(trueAnswersArr.current.length)
      if (!isMute) {
        playSoundSuccess()
      }
    },
    // eslint-disable-next-line
    [isMute, wordsForGame, currentWordIdx, calcBackgroundY],
  )

  useEffect(() => {
    const interval = setInterval(() => {
      if (isFinish) clearInterval(interval)
      if (initialTopWordRef.current === 360) {
        clearInterval(interval)
        handleWrongAnswer()
        if (currentWordIdx !== countWordsGame - 1) {
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
      randomArr(words, countWordsGame, '').map((word) => {
        return {
          answer: word,
          wrongAnswers: randomArr(words, 4, word.id),
        }
      }),
    )
    setCurrentWordIdx(0)
  }, [setWordsForGame, words, countWordsGame])

  useEffect(() => {
    if (currentWordIdx >= 0) {
      const { answer, wrongAnswers } = wordsForGame[currentWordIdx]
      setMixedCurrentWords(mixArr([answer, ...wrongAnswers]))
    }

    // eslint-disable-next-line
  }, [currentWordIdx])

  useEffect(() => {
    if (helth === 0) {
      setIsFinish(true)
    }
  }, [helth])

  const handleAnswerClick = useCallback(
    (wordText: string) => {
      if (isFinish) return

      if (wordText === wordsForGame[currentWordIdx].answer.word) {
        handleTrueAnswer()
      } else {
        handleWrongAnswer()
      }
      if (currentWordIdx === countWordsGame - 1) setIsFinish(true)
      if (currentWordIdx !== countWordsGame - 1) {
        setCurrentWordIdx((prev) => prev + 1)
      }
    },
    [currentWordIdx, handleTrueAnswer, handleWrongAnswer, isFinish, wordsForGame, countWordsGame],
  )

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          handleAnswerClick(mixedCurrentWords[parseInt(event.key, 10) - 1].word)
          break
        default:
      }
    },
    [handleAnswerClick, mixedCurrentWords],
  )

  useEffect(() => {
    if (isFinish) {
      document.removeEventListener('keydown', handleKeyPress)
    } else document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress, isFinish])

  return (
    <>
      {isFinish ? (
        <Statistics
          success={trueAnswersArr.current}
          error={wrongAnswersArr.current}
          currentGame="savannah"
          back={onRestart}
        />
      ) : (
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
              <div className="game__wrapper-btn">
                {mixedCurrentWords.map((word, i) => (
                  <Button
                    type="primary"
                    className="game__btn"
                    key={word.id}
                    onClick={() => handleAnswerClick(word.word)}
                  >
                    {i + 1} {isEN ? word.word : word.wordTranslate}
                  </Button>
                ))}
              </div>
              <Result
                successWords={trueAnswersArr.current}
                countWordsGame={countWordsGame}
                errorWords={wrongAnswersArr.current}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GameSavannah
