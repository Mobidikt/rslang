import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router'
import {
  FileTextOutlined,
  SettingOutlined,
  BarChartOutlined,
  DribbbleOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import './Bar.scss'

const { Sider } = Layout

const Bar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation().pathname
  const navigate = useNavigate()
  const onCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu className="menu" defaultSelectedKeys={[`${location}`]} mode="inline">
        <Menu.Item
          className="bar__link"
          key="/"
          icon={<FileTextOutlined />}
          onClick={() => navigate('/')}
        >
          Rslang
        </Menu.Item>
        <Menu.Item
          className="bar__link"
          key="/tutorial"
          icon={<FileTextOutlined />}
          onClick={() => navigate('/tutorial')}
        >
          Tutorial
        </Menu.Item>
        <Menu.Item
          className="bar__link"
          key="/dictionary"
          icon={<WalletOutlined />}
          onClick={() => navigate('/dictionary')}
        >
          Dictionary
        </Menu.Item>
        <Menu.Item
          className="bar__link"
          key="/games"
          icon={<DribbbleOutlined />}
          onClick={() => navigate('/games')}
        >
          Games
        </Menu.Item>
        <Menu.Item
          className="bar__link"
          key="/statistics"
          icon={<BarChartOutlined />}
          onClick={() => navigate('/statistics')}
        >
          Statistics
        </Menu.Item>
        <Menu.Item
          className="bar__link"
          key="/settings"
          icon={<SettingOutlined />}
          onClick={() => navigate('/settings')}
        >
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  )
}
export default Bar
