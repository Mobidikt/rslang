import React from 'react'
import { Button } from 'antd'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import './FullScreenBtn.scss'
import { FullScreenHandle } from 'react-full-screen'

type FullScreenBtnTypes = {
  fullScreen: boolean,
  toggle: () => void,
  handleFullScreen: FullScreenHandle,
}

const FullScreenBtn: React.FC<FullScreenBtnTypes> = ({ fullScreen, toggle, handleFullScreen }) => {
  return (
    <Button
      type="text"
      className="btn-full-screen"
      onClick={toggle}
      icon={
        fullScreen ? (
          <FullscreenExitOutlined className="full-screen-icon" onClick={handleFullScreen.exit} />
        ) : (
          <FullscreenOutlined className="full-screen-icon" onClick={handleFullScreen.enter} />
        )
      }
    />
  )
}

export default FullScreenBtn
