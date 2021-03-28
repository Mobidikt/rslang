import React from 'react'
import { Button } from 'antd'
import './HeaderMain.scss'
import useActions from '../../hooks/useActions'
import AuthCard from '../AuthCard/AuthCard'
import useTypedSelector from '../../hooks/useTypedSelector'
import logo from '../../assets/icons/RSLang.png'

const HeaderMain: React.FC = () => {
  const { setIsVisibleAuthCard, logout } = useActions()
  const { token, username } = useTypedSelector((state) => state.authReducer)
  const scrollItem = (id: string) => {
    const item: HTMLElement | null = document.getElementById(id)
    if (item) {
      item.scrollIntoView()
    }
  }
  return (
    <>
      <header className="header-main">
        <div className="header-main__wrapper">
          <img src={logo} alt="logo" />
          <nav className="nav">
            <button className="nav__item" type="button" onClick={() => scrollItem('team')}>
              About team
            </button>
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
          </nav>
        </div>
      </header>
      <AuthCard />
    </>
  )
}

export default HeaderMain
