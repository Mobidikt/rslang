import React, { useCallback } from 'react'
import { Menu, Dropdown, Button, Space } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import useTypedSelector from '../../../hooks/useTypedSelector'
import { settingsGame } from '../utils/settingsGame'
import useActions from '../../../hooks/useActions'
import './Settings.scss'

const SettingsGame: React.FC = () => {
  const { level } = useTypedSelector((state) => state.gameReducer)
  const { setLevelGame } = useActions()
  const setting = () => {
    return (
      <Menu className="game-settings__menu">
        {settingsGame.map((item) => (
          <Menu.Item
            key={item}
            onClick={() => setLevelGame(item)}
            className={`game-settings__item ${level === item ? 'game-settings__active' : ''}`}
          >
            <span>{item}</span>
          </Menu.Item>
        ))}
      </Menu>
    )
  }

  return (
    <Space direction="vertical" className="game-settings">
      <Dropdown overlay={setting} placement="topCenter" className="game-settings__drop">
        <Button className="game-settings__btn" icon={<SettingOutlined />} />
      </Dropdown>
    </Space>
  )
}

export default SettingsGame
