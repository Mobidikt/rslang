import React from 'react'
import Description from '../../components/Description/Description'
import Footer from '../../components/Footer/Footer'
import HeaderMain from '../../components/HeaderMain/HeaderMain'
import Lead from '../../components/Lead/Lead'
import OurTeam from '../../components/OurTeam/OurTeam'
import Video from '../../components/Video/Video'
import './Main.scss'

const Main: React.FC = () => {
  return (
    <div className="main">
      <HeaderMain />
      <Lead />
      <Description />
      <Video />
      <OurTeam />
      <Footer />
    </div>
  )
}

export default Main
