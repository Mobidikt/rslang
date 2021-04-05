import React from 'react'
import './Video.scss'

const Video: React.FC = () => {
  let videoSrc: string = 'https://www.youtube.com/watch?v=VSW7cSMdKiA'

  return (
    <section className="video" id="video">
      <div className="video__wrapper">
        <h2 className="video__title">Video</h2>
        <iframe
          title="video-country"
          src={videoSrc}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  )
}

export default Video
