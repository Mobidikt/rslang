import React from 'react'
import './Video.scss'
import { useIntl } from 'react-intl'

const Video: React.FC = () => {
  const videoSrc = 'https://www.youtube.com/embed/VSW7cSMdKiA'
  const intl = useIntl()

  return (
    <section className="video" id="video">
      <div className="video__wrapper">
        <h2 className="video__title">{intl.formatMessage({ id: 'Video' })}</h2>
        <div className="video__iframe">
          <iframe
            title="video-country"
            src={videoSrc}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}

export default Video
