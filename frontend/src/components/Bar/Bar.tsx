import React, { useState, useEffect } from 'react'
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
  const [winWidth, setWidth] = useState(window.innerWidth)
  const [font, setFont] = useState('28px')
  const { setSelectedSection, setHeaderColor } = useActions()
  const location = useLocation().pathname
  const navigate = useNavigate()
  const onCollapse = () => {
    setCollapsed(!collapsed)
  }

  useEffect(() => {
    let isMounted = true
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
      console.log(winWidth)
    })
    if (winWidth < 640) {
      setFont('24px')
    } else {
      setFont('28px')
    }
    return () => {
      window.removeEventListener('resize', () => {
        isMounted = false
        console.log('removing window listener')
      })
    }
    // eslint-disable-next-line
  }, [])

  const menu = () => {
    return (
      <Menu
        className="menu"
        defaultSelectedKeys={[`${location}`]}
        theme="dark"
        mode={winWidth > 840 ? 'inline' : 'horizontal'}
      >
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
          icon={<FileTextOutlined style={{ fontSize: font }} />}
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
          icon={<WalletOutlined style={{ fontSize: font }} />}
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
          icon={<DribbbleOutlined style={{ fontSize: font }} />}
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
          icon={<BarChartOutlined style={{ fontSize: font }} />}
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
          icon={<SettingOutlined style={{ fontSize: font }} />}
          onClick={() => {
            navigate('/settings')
            setSelectedSection('Settings')
            setHeaderColor('#E9FF70')
          }}
        >
          {intl.formatMessage({ id: 'Settings' })}
        </Menu.Item>
      </Menu>
    )
  }
  console.log(collapsed)

  return (
    <>
      {winWidth > 640 && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          breakpoint="lg"
          collapsedWidth="80"
          onBreakpoint={(broken) => {
            console.log(broken)
          }}
        >
          {menu()}
        </Sider>
      )}
      {winWidth <= 640 && <div className="bottom_bar">{menu()}</div>}
    </>
  )
}
export default Bar
