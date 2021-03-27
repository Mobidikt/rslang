import React, { useCallback, useEffect, useState } from 'react'
import './GameCall.scss'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import Button from 'antd/es/button/button'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'


const FullscreenBtn: React.FC = () => {

  return (
    <Button
      type="text"
      className="btn-full-screen"
      onClick={() => setFullScreen(!fullScreen)}
      icon={
        fullScreen ? (
          <FullscreenExitOutlined
            className="full-screen-icon"
            onClick={handleFullScreen.exit}
          />
        ) : (
          <FullscreenOutlined
            className="full-screen-icon"
            onClick={handleFullScreen.enter}
          />
        )
      }
    />
  )
}

export default FullscreenBtn
