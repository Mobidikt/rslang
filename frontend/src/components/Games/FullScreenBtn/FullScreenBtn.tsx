import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { Button } from 'antd'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import './FullScreenBtn.scss'

type FullScreenBtnTypes = {
  fullScreen: boolean,
  setFullScreen: Dispatch<SetStateAction<boolean>>,
}

const FullScreenBtn: React.FC<FullScreenBtnTypes> = ({ fullScreen, setFullScreen }) => {
  const handleFullScreen = () => {
    setFullScreen(!fullScreen)
  }

  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFullScreen(false)
      }
    },
    [setFullScreen],
  )

  useEffect(() => {
    if (fullScreen) {
      document.body.style.position = 'fixed'
    } else document.body.style.position = ''
  }, [fullScreen])

  useEffect(() => {
    document.addEventListener('keydown', escFunction)
    return () => {
      document.removeEventListener('keydown', escFunction)
    }
  }, [fullScreen, escFunction])

  return (
    <Button
      type="text"
      className="btn-full-screen"
      onClick={handleFullScreen}
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
