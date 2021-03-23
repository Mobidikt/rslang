import React from 'react'
import useTypedSelector from '../../hooks/useTypedSelector'
import LessonCard from './LessonCard/LessonCard'
import './LessonList.scss'

const LessonList: React.FC = () => {
  const { lessons } = useTypedSelector((state) => state.lessonReducer)
  return (
    <div title="lessons" className="lesson-list">
      {lessons.map((lesson, idx) => (
        <LessonCard
          key={lesson.title}
          lesson={{ title: lesson.title, bgColor: lesson.color, idx }}
        />
      ))}
    </div>
  )
}

export default LessonList
