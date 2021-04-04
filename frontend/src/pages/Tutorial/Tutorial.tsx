import React from 'react'
import { useIntl } from 'react-intl'
import LessonList from '../../components/LessonList/LessonList'
import './Tutorial.scss'

const Tutorial: React.FC = () => {
  const intl = useIntl()
  return (
    <div className="tutorial">
      <h2 className="tutorial-title__text">{intl.formatMessage({ id: 'here_words' })}</h2>
      <LessonList />
    </div>
  )
}

export default Tutorial
