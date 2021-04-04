import React from 'react'
import './Description.scss'

const Description: React.FC = () => {
  return (
    <section className="description" id="description">
      <div className="description__wrapper">
        <h2 className="description__title">Description</h2>
        Уникальное, совершенно беспланое приложение для изучения английского. Изучать новое
        интереснее во время игры. Поэтому мы подготовили 4 увлекательных красочных игр, чтобы учить
        английский было веселее.
      </div>
    </section>
  )
}

export default Description
