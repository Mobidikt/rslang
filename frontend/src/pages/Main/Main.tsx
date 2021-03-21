import React from 'react'
import Header from '../../components/Header/Header'
import OurTeam from '../../components/OurTeam/OurTeam'
import './Main.scss'

const Main: React.FC = () => {
  return (
    <div className="main">
      <Header />
      <OurTeam />
    </div>
  )
}

export default Main
