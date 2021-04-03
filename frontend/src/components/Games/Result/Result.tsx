import React from 'react'
import './Result.scss'
import { WordType } from '../../../store/types/lesson'

type StatisticsTypes = {
  successWords: WordType[],
  errorWords: WordType[],
  countWordsGame: number,
}

const Result: React.FC<StatisticsTypes> = ({ successWords, countWordsGame, errorWords }) => {
  return (
    <div className="game-result-board">
      {successWords.length ? (
        <div
          className="game-result-board__item--true"
          style={{ width: `${Math.ceil((successWords.length / countWordsGame) * 100)}%` }}
        >
          {successWords.length}
        </div>
      ) : null}
      {errorWords.length ? (
        <div
          className="game-result-board__item--false"
          style={{
            width: `${Math.ceil((errorWords.length / countWordsGame) * 100)}%`,
          }}
        >
          {errorWords.length}
        </div>
      ) : null}
    </div>
  )
}

export default Result
