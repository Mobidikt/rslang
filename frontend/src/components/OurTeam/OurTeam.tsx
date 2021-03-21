import React from 'react'
import TeamCard from '../TeamCard/TeamCard'
import './OurTeam.scss'
import teams from '../../assets/info-team/info-team'

const OurTeam: React.FC = () => {
  return (
    <div className="team">
      <div className="team__wrapper">
        <h2 className="team__title">Our team</h2>
        <div className="team__developers">
          {teams.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurTeam
