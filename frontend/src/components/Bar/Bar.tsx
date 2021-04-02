import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router'
import Icon, {
  FileTextOutlined,
  SettingOutlined,
  BarChartOutlined,
  DribbbleOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import './Bar.scss'
import useActions from '../../hooks/useActions'
import logo from '../../assets/icons/logo.svg'

const { Sider } = Layout

const Bar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { setSelectedSection, setHeaderColor } = useActions()
  const location = useLocation().pathname
  const navigate = useNavigate()
  const onCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu className="menu" defaultSelectedKeys={[`${location}`]} mode="inline">
        <Menu.Item
          className="bar__link logo"
          key="/"
          icon={<img src={logo} alt="logo" />}
          onClick={() => {
            navigate('/welcome')
            setSelectedSection('Rslang')
          }}
        />
        <Menu.Item
          className="bar__link"
          key="/tutorial"
          icon={<FileTextOutlined />}
          onClick={() => {
            navigate('/tutorial')
            setSelectedSection('Tutorial')
            setHeaderColor('#70D6FF')
          }}
        >
          Tutorial
        </Menu.Item>
        <Menu.Item
          className="bar__link"
          key="/dictionary"
          icon={<WalletOutlined />}
          onClick={() => {
            navigate('/dictionary')
            setSelectedSection('Dictionary')
            setHeaderColor('#FF70A6')
          }}
        >
          Dictionary
        </Menu.Item>
        <Menu.Item
          className="bar__link"
          key="/games"
          icon={<DribbbleOutlined />}
          onClick={() => {
            navigate('/games')
            setSelectedSection('Games')
            setHeaderColor('#FF9770')
          }}
        >
          Games
        </Menu.Item>
        <Menu.Item
          className="bar__link"
          key="/statistics"
          icon={<BarChartOutlined />}
          onClick={() => {
            navigate('/statistics')
            setSelectedSection('Statistics')
            setHeaderColor('#FFD670')
          }}
        >
          Statistics
        </Menu.Item>
        <Menu.Item
          className="bar__link"
          key="/settings"
          icon={<SettingOutlined />}
          onClick={() => {
            navigate('/settings')
            setSelectedSection('Settings')
            setHeaderColor('#E9FF70')
          }}
        >
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  )
}
export default Bar
