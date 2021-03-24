import React from 'react'
import Footer from '../../components/Footer/Footer'
import HeaderMain from '../../components/HeaderMain/HeaderMain'
import OurTeam from '../../components/OurTeam/OurTeam'
import './Main.scss'

const Main: React.FC = () => {
  return (
    <div className="main">
      <HeaderMain />
      <h1>Learn an English</h1>
      <OurTeam />
      <Footer />
    </div>
  )
}

export default Main
