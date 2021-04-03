import React from 'react'
import { Button } from 'antd'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import './FullScreenBtn.scss'

type FullScreenBtnTypes = {
  fullScreen: boolean,
  toggle: () => void,
}

const FullScreenBtn: React.FC<FullScreenBtnTypes> = ({ fullScreen, toggle }) => {
  return (
    <Button
      type="text"
      className="btn-full-screen"
      onClick={toggle}
      icon={
        fullScreen ? (
          <FullscreenExitOutlined className="full-screen-icon" />
        ) : (
          <FullscreenOutlined className="full-screen-icon" />
        )
      }
    />
  )
}

export default FullScreenBtn
