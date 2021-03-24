import React from 'react'
import { Button } from 'antd'
import './HeaderMain.scss'
import useActions from '../../hooks/useActions'
import AuthCard from '../AuthCard/AuthCard'
import useTypedSelector from '../../hooks/useTypedSelector'

const HeaderMain: React.FC = () => {
  const { setIsVisibleAuthCard, logout } = useActions()
  const { token, username } = useTypedSelector((state) => state.authReducer)
  return (
    <>
      <header className="header-main">
        <div className="header-main__wrapper">
          <img src="#" alt="logo" />
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
        </div>
      </header>
      <AuthCard />
    </>
  )
}

export default HeaderMain
