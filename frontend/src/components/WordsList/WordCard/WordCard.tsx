import { Card } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'
import { WordType } from '../../../store/types/lesson'

import './WordCard.scss'

type WordCardType = {
  word: WordType,
  isDifficult: boolean,
}

const WordCard: React.FC<WordCardType> = ({ word, isDifficult }) => {
  const navigate = useNavigate()
  return (
    <Card
      className="word__card"
      title={`${word.word}${isDifficult ? ' (hard)' : ''}`}
      hoverable
      onClick={() => navigate(`/tutorial/${word.group}/${word.id}`)}
    >
      {word.wordTranslate}
    </Card>
  )
}

export default WordCard
