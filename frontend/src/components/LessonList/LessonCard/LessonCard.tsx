import React, { useEffect } from 'react'
import { Card } from 'antd'
import './LessonCard.scss'
import { useNavigate } from 'react-router-dom'

type LessonCardType = {
  lesson: {
    title: string,
    idx: number,
    bgColor: string,
  },
}

const LessonCard: React.FC<LessonCardType> = ({ lesson }) => {
  const { title, bgColor, idx } = lesson
  const navigate = useNavigate()
  return (
    <Card
      className="lesson__card"
      style={{ background: bgColor }}
      hoverable
      onClick={() => navigate(`/tutorial/${idx}`)}
    >
      <h3>{title}</h3>
    </Card>
  )
}

export default LessonCard
