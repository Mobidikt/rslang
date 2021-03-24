import React from 'react'
import Footer from '../../components/Footer/Footer'
import HeaderMain from '../../components/HeaderMain/HeaderMain'
import Lead from '../../components/Lead/Lead'
import OurTeam from '../../components/OurTeam/OurTeam'
import './Main.scss'

const Main: React.FC = () => {
  return (
    <div className="main">
      <HeaderMain />
      <Lead />
      <OurTeam />
      <Footer />
    </div>
  )
}

export default Main
