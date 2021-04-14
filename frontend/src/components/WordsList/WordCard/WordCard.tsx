import { Card } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'
import useTypedSelector from '../../../hooks/useTypedSelector'
import { WordType } from '../../../store/types/lesson'

import './WordCard.scss'

type WordCardType = {
  word: WordType,
  isDifficult: boolean,
}

const WordCard: React.FC<WordCardType> = ({ word, isDifficult }) => {
  const { isTranslationWordVisible } = useTypedSelector((state) => state.lessonReducer)
  const navigate = useNavigate()
  return (
    <Card
      className="word__card"
      title={`${word.word}${isDifficult ? ' (hard)' : ''}`}
      hoverable
      onClick={() => navigate(`/tutorial/${word.group}/${word.id}`)}
    >
      {isTranslationWordVisible ? word.wordTranslate : null}
    </Card>
  )
}

export default WordCard
