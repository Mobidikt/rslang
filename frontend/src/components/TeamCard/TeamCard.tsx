import React from 'react'

const info =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

const TeamCard: React.FC = () => {
  return (
    <article className="developer">
      <img src="#" alt="#" />
      <div className="developer__info">
        <h3 className="developer__name">Name</h3>
        <p className="developer__profession">Web-developer</p>
        <p className="developer__info">{info}</p>
      </div>
    </article>
  )
}

export default TeamCard
