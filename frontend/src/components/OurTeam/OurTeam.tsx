import React from 'react'
import { useIntl } from 'react-intl'
import TeamCard from '../TeamCard/TeamCard'
import './OurTeam.scss'
import teams from '../../assets/info-team/info-team'

const OurTeam: React.FC = () => {
  const intl = useIntl()
  return (
    <section className="team" id="team">
      <div className="team__wrapper">
        <h2 className="team__title">{intl.formatMessage({ id: 'Our_team' })}</h2>
        <div className="team__developers">
          {teams.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurTeam
