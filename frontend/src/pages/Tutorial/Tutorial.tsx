import React from 'react'
import LessonList from '../../components/LessonList/LessonList'
import './Tutorial.scss'

const Tutorial: React.FC = () => {
  return (
    <div className="tutorial">
      <div className="tutorial-title">
        <h2 className="tutorial-title__text">Здесь вы можете изучать новые слова</h2>
      </div>
      <LessonList />
    </div>
  )
}

export default Tutorial
