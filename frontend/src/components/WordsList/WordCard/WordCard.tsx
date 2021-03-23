import { Card } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'
import { WordType } from '../../../store/types/lesson'
import './WordCard.scss'

type WordCardType = {
  word: WordType,
}

const WordCard: React.FC<WordCardType> = ({ word }) => {
  const navigate = useNavigate()
  return (
    <Card
      className="word__card"
      title={word.word}
      hoverable
      onClick={() => navigate(`/tutorial/${word.group}/${word.id}`)}
    >
      {word.wordTranslate}
    </Card>
  )
}

export default WordCard
