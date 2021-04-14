import React from 'react'
import { Button } from 'antd'
import Icon from '@ant-design/icons'
import { ReactComponent as volumeOnIcon } from '../../../assets/icons/volume-on.svg'
import { ReactComponent as volumeOffIcon } from '../../../assets/icons/no-sound.svg'
import useActions from '../../../hooks/useActions'
import useTypedSelector from '../../../hooks/useTypedSelector'

const SoundComponent: React.FC = () => {
  const { isMute } = useTypedSelector((state) => state.gameReducer)
  const { setIsMute } = useActions()
  return (
    <Button
      style={{ height: '48px' }}
      type="text"
      className="btn-sound"
      icon={<Icon className="sound-icon" component={!isMute ? volumeOnIcon : volumeOffIcon} />}
      onClick={setIsMute}
    />
  )
}

export default SoundComponent
