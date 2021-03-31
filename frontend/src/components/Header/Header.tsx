import React from 'react'
import { Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import './Header.scss'
import useActions from '../../hooks/useActions'
import AuthCard from '../AuthCard/AuthCard'
import useTypedSelector from '../../hooks/useTypedSelector'
import getImgUrl from '../../utils/getImageUrl'

const Header: React.FC = () => {
  const { setIsVisibleAuthCard, logout, clearUserWords } = useActions()
  const { token, username, userPhoto } = useTypedSelector((state) => state.authReducer)
  const { selectedSection, headerColor } = useTypedSelector((state) => state.appReducer)

  const logoutUserClick = () => {
    clearUserWords()
    logout()
  }

  return (
    <>
      <header className="header" style={{ background: headerColor }}>
        <h2 className="header__sectionName">{selectedSection}</h2>
        {token ? (
          <div>
            <Button className="profile" shape="circle" icon={<UserOutlined />} />

            <span className="header__username">{username}</span>
            <Button className="btn logout" onClick={logoutUserClick}>
              Выйти
            </Button>
          </div>
        ) : (
          <Button className="btn" onClick={setIsVisibleAuthCard}>
            Авторизоваться
          </Button>
        )}
      </header>
      <AuthCard />
    </>
  )
}

export default Header
