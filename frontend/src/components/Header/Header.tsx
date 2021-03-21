import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { LoginOutlined } from '@ant-design/icons'

const Header: React.FC = () => {
  const login = () => {}

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/">
          <img className="header__logo" src="#" alt="logo" />
        </Link>
        <div>
          <Link to="/">Our advantages</Link>
          <p>Video</p>
          <p>About team</p>
          <Button size="large" shape="round" onClick={login} icon={<LoginOutlined />} />
        </div>
      </div>
      <h1>Learn an English</h1>
    </header>
  )
}

export default Header
