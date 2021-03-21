import React from 'react'
import './TeamCard.scss'
import { TeamCardProps } from './TeamCardType'

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  return (
    <article className="developer">
      <img className="developer__photo" src={member.photo} alt={member.name} />
      <div className="developer__info">
        <div className="developer__bar">
          <h3 className="developer__name">{member.name}</h3>
          <a target="_blank" rel="noopener noreferrer" href={member.git}>
            <i className="developer__link_git" />
          </a>
        </div>
        <p className="developer__profession">{member.profession}</p>
        <p className="developer__info">{member.info}</p>
      </div>
    </article>
  )
}

export default TeamCard
