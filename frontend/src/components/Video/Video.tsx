import React from 'react'
import './Video.scss'

const Video: React.FC = () => {
  
  const videoSrc = 'https://www.youtube.com/embed/VSW7cSMdKiA'

  return (
    <section className="video" id="video">
      <div className="video__wrapper">
        <h2 className="video__title">Video</h2>
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
