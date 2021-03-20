import React from 'react'
import './TeamCard.scss'

const info =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

const TeamCard: React.FC = () => {
  return (
    <article className="developer">
      <img
        className="developer__photo"
        src="https://dogcatdog.ru/wp-content/uploads/e/8/6/e866fd3696194ac57409ea72eb8a7b66.jpe"
        alt="#"
      />
      <div className="developer__info">
        <h3 className="developer__name">Name</h3>
        <p className="developer__profession">Web-developer</p>
        <p className="developer__info">{info}</p>
      </div>
    </article>
  )
}

export default TeamCard
