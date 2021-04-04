import React from 'react'
import { Button } from 'antd'
import './HeaderMain.scss'
import { UserOutlined } from '@ant-design/icons'
import useActions from '../../hooks/useActions'
import AuthCard from '../AuthCard/AuthCard'
import useTypedSelector from '../../hooks/useTypedSelector'
import logo from '../../assets/icons/RSLang.png'
import UserProfile from '../UserProfile/UserProfile'
import getImgUrl from '../../utils/getImageUrl'

const HeaderMain: React.FC = () => {
  const { setIsVisibleAuthCard, logout, clearUserWords, setIsVisibleProfileCard } = useActions()
  const { token, username, userPhoto } = useTypedSelector((state) => state.authReducer)
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
          <div className="header-main__menu">
            <nav className="nav">
              <button className="nav__item" type="button" onClick={() => scrollItem('description')}>
                Description
              </button>{' '}
              <button className="nav__item" type="button" onClick={() => scrollItem('video')}>
                Video
              </button>{' '}
              <button className="nav__item" type="button" onClick={() => scrollItem('team')}>
                About team
              </button>
            </nav>
            {token ? (
              <div className="header-user">
                {userPhoto ? (
                  <Button
                    onClick={() => setIsVisibleProfileCard()}
                    className="profile"
                    shape="circle"
                  >
                    <img alt="avatar" className="avatar" src={getImgUrl(userPhoto)} />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsVisibleProfileCard()}
                    className="profile"
                    shape="circle"
                    icon={<UserOutlined />}
                  />
                )}
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
        </div>
      </header>
      {token ? <UserProfile /> : null}
      <AuthCard />
    </>
  )
}

export default HeaderMain
