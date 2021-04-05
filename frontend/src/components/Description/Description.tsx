import React from 'react'
import './Description.scss'
import { Card } from 'antd'
import funImage from '../../assets/image/fun.svg'
import freeImage from '../../assets/image/free.svg'
import mobileImage from '../../assets/image/mobile.svg'

const Description: React.FC = () => {
  return (
    <section className="description" id="description">
      <div className="description__wrapper">
        <h2 className="description__title">Description</h2>
        <div className="description__cards_wrapper">
          <Card className="description__card">
            <img src={freeImage} alt="" className="description__image" />
            <h4>Free</h4>
            <p className="description__text">App is absolutely and totally free</p>
          </Card>
          <Card className="description__card">
            <img src={mobileImage} alt="" className="description__image" />
            <h4>Adaptive</h4>
            <p className="description__text">App can be used on desktop, mobile or tablet</p>
          </Card>
          <Card className="description__card">
            <img src={funImage} alt="" className="description__image" />
            <h4>Fun</h4>
            <p className="description__text">App consist of 4 interesting bright games</p>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Description
