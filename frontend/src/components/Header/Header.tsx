import React from 'react'
import { Button } from 'antd'
import './Header.scss'
import useActions from '../../hooks/useActions'
import AuthCard from '../AuthCard/AuthCard'
import useTypedSelector from '../../hooks/useTypedSelector'

const Header: React.FC = () => {
  const { setIsVisibleAuthCard, logout } = useActions()
  const { token, username } = useTypedSelector((state) => state.authReducer)
  const { selectedSection } = useTypedSelector((state) => state.appReducer)
  return (
    <>
      <header className="header">
        <h2 className="header__sectionName">{selectedSection}</h2>
        {token ? (
          <div>
            <span>{username}</span>
            <Button className="btn logout" onClick={logout}>
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
