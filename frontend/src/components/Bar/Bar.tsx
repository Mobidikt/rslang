import React, { useState } from 'react'
import { useIntl } from 'react-intl'
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
import useActions from '../../hooks/useActions'
import logo from '../../assets/icons/logo.svg'

const { Sider } = Layout

const Bar: React.FC = () => {
  const intl = useIntl()
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
          className="bar__link bar__link_blue"
          key="/tutorial"
          icon={<FileTextOutlined />}
          onClick={() => {
            navigate('/tutorial')
            setSelectedSection('Tutorial')
            setHeaderColor('#70D6FF')
          }}
        >
          {intl.formatMessage({ id: 'Tutorial' })}
        </Menu.Item>
        <Menu.Item
          className="bar__link bar__link_pink"
          key="/dictionary"
          icon={<WalletOutlined />}
          onClick={() => {
            navigate('/dictionary')
            setSelectedSection('Dictionary')
            setHeaderColor('#FF70A6')
          }}
        >
          {intl.formatMessage({ id: 'Dictionary' })}
        </Menu.Item>
        <Menu.Item
          className="bar__link bar__link_orange"
          key="/games"
          icon={<DribbbleOutlined />}
          onClick={() => {
            navigate('/games')
            setSelectedSection('Games')
            setHeaderColor('#FF9770')
          }}
        >
          {intl.formatMessage({ id: 'Games' })}
        </Menu.Item>
        <Menu.Item
          className="bar__link bar__link_light-orange"
          key="/statistics"
          icon={<BarChartOutlined />}
          onClick={() => {
            navigate('/statistics')
            setSelectedSection('Statistics')
            setHeaderColor('#FFD670')
          }}
        >
          {intl.formatMessage({ id: 'Statistics' })}
        </Menu.Item>
        <Menu.Item
          className="bar__link bar__link_yellow"
          key="/settings"
          icon={<SettingOutlined />}
          onClick={() => {
            navigate('/settings')
            setSelectedSection('Settings')
            setHeaderColor('#E9FF70')
          }}
        >
          {intl.formatMessage({ id: 'Settings' })}
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Bar
