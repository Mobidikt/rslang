import React from 'react'
import { useIntl } from 'react-intl'
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
  const intl = useIntl()
  const { title, bgColor, idx } = lesson
  const navigate = useNavigate()
  const { setCurrentPage, setSelectedSection } = useActions()
  const handleNavigate = () => {
    setCurrentPage(0)
    navigate(`/tutorial/${idx}`)
    setSelectedSection(`Lessons_Lesson_${idx + 1}`)
  }
  return (
    <Card
      className="lesson__card"
      style={{ background: bgColor }}
      hoverable
      onClick={handleNavigate}
    >
      <h3>{intl.formatMessage({ id: title })}</h3>
    </Card>
  )
}

export default LessonCard
