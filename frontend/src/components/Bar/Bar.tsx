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
  const [currColor1, setCurrColor1] = useState('#70D6FF')
  const [currColor2, setCurrColor2] = useState('#f3f3f3')
  const [currColor3, setCurrColor3] = useState('#f3f3f3')
  const [currColor4, setCurrColor4] = useState('#f3f3f3')
  const [currColor5, setCurrColor5] = useState('#f3f3f3')
  const [font, setFont] = useState('28px')
  const { setSelectedSection, setHeaderColor } = useActions()
  const location = useLocation().pathname
  const navigate = useNavigate()
  const onCollapse = () => {
    setCollapsed(!collapsed)
  }

  const handleColor = (func: any, color: string) => {
    const colors = [setCurrColor1, setCurrColor2, setCurrColor3, setCurrColor4, setCurrColor5]
    colors.map((el) => el('#f3f3f3'))
    // eslint-disable-next-line
    func(color)
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
          icon={<FileTextOutlined style={{ color: currColor1, fontSize: font }} />}
          onClick={() => {
            navigate('/tutorial')
            setSelectedSection('Tutorial')
            setHeaderColor('#70D6FF')
            handleColor(setCurrColor1, '#70D6FF')
          }}
          style={{ color: currColor1 }}
        >
          {intl.formatMessage({ id: 'Tutorial' })}
        </Menu.Item>
        <Menu.Item
          className="bar__link"
          key="/dictionary"
          icon={<WalletOutlined style={{ color: currColor2, fontSize: font }} />}
          onClick={() => {
            navigate('/dictionary')
            setSelectedSection('Dictionary')
            setHeaderColor('#FF70A6')
            handleColor(setCurrColor2, '#FF70A6')
          }}
          style={{ color: currColor2 }}
        >
          {intl.formatMessage({ id: 'Dictionary' })}
        </Menu.Item>
        <Menu.Item
          className="bar__link"
          key="/games"
          icon={<DribbbleOutlined style={{ color: currColor3, fontSize: font }} />}
          onClick={() => {
            navigate('/games')
            setSelectedSection('Games')
            setHeaderColor('#FF9770')
            handleColor(setCurrColor3, '#FF9770')
          }}
          style={{ color: currColor3 }}
        >
          {intl.formatMessage({ id: 'Games' })}
        </Menu.Item>
        <Menu.Item
          className="bar__link"
          key="/statistics"
          icon={<BarChartOutlined style={{ color: currColor4, fontSize: font }} />}
          onClick={() => {
            navigate('/statistics')
            setSelectedSection('Statistics')
            setHeaderColor('#FFD670')
            handleColor(setCurrColor4, '#FFD670')
          }}
          style={{ color: currColor4 }}
        >
          {intl.formatMessage({ id: 'Statistics' })}
        </Menu.Item>
        <Menu.Item
          className="bar__link"
          key="/settings"
          icon={<SettingOutlined style={{ color: currColor5, fontSize: font }} />}
          onClick={() => {
            navigate('/settings')
            setSelectedSection('Settings')
            setHeaderColor('#E9FF70')
            handleColor(setCurrColor5, '#E9FF70')
          }}
          style={{ color: currColor5 }}
        >
          {intl.formatMessage({ id: 'Settings' })}
        </Menu.Item>
      </Menu>
    </Sider>
  )
}
export default Bar
