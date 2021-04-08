import React from 'react'
import './Description.scss'
import { Card } from 'antd'
import { useIntl } from 'react-intl'
import funImage from '../../assets/image/fun.svg'
import freeImage from '../../assets/image/free.svg'
import mobileImage from '../../assets/image/mobile.svg'

const Description: React.FC = () => {
  const intl = useIntl()
  return (
    <section className="description" id="description">
      <div className="description__wrapper">
        <h2 className="description__title">{intl.formatMessage({ id: 'About_app' })}</h2>
        <div className="description__cards_wrapper">
          <Card className="description__card">
            <img src={freeImage} alt="" className="description__image" />
            <h4>{intl.formatMessage({ id: 'About_free' })}</h4>
            <p className="description__text">{intl.formatMessage({ id: 'About_free_desc' })}</p>
          </Card>
          <Card className="description__card">
            <img src={mobileImage} alt="" className="description__image" />
            <h4>{intl.formatMessage({ id: 'About_mobile' })}</h4>
            <p className="description__text">{intl.formatMessage({ id: 'About_mobile_desc' })}</p>
          </Card>
          <Card className="description__card">
            <img src={funImage} alt="" className="description__image" />
            <h4>{intl.formatMessage({ id: 'About_fun' })}</h4>
            <p className="description__text">{intl.formatMessage({ id: 'About_fun_desc' })}</p>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Description
