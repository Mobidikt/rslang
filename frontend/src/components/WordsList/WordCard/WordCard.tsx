import { Card } from 'antd'
import React from 'react'
import { WordType } from '../../../store/types/lesson'
import './WordCard.scss'

type WordCardType = {
  word: WordType,
}

const WordCard: React.FC<WordCardType> = ({ word }) => {
  return (
    <Card className="word__card" title={word.word} hoverable>
      {word.wordTranslate}
    </Card>
  )
}

export default WordCard
