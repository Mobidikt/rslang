import React from 'react'
import { Card } from 'antd'
import './LessonCard.scss'
import { useNavigate } from 'react-router-dom'
import useActions from '../../../hooks/useActions'

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
  const { setCurrentPage, setSelectedSection } = useActions()
  const handleNavigate = () => {
    setCurrentPage(0)
    navigate(`/tutorial/${idx}`)
    setSelectedSection(`Lessons - Lesson ${idx + 1}`)
  }
  return (
    <Card
      className="lesson__card"
      style={{ background: bgColor }}
      hoverable
      onClick={handleNavigate}
    >
      <h3>{title}</h3>
    </Card>
  )
}

export default LessonCard
