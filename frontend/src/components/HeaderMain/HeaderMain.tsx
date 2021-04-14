import React from 'react'
import { useIntl } from 'react-intl'
import { Button } from 'antd'
import './HeaderMain.scss'
import { UserOutlined } from '@ant-design/icons'
import useActions from '../../hooks/useActions'
import AuthCard from '../AuthCard/AuthCard'
import useTypedSelector from '../../hooks/useTypedSelector'
import logo from '../../assets/icons/logo.svg'
import UserProfile from '../UserProfile/UserProfile'
import getImgUrl from '../../utils/getImageUrl'
import LanguageSelect from '../LanguageSelect/LanguageSelect'

const HeaderMain: React.FC = () => {
  const intl = useIntl()
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
          <div className="header-main__logo">
            <img src={logo} alt="logo" />
            <LanguageSelect />
          </div>
          <div className="header-main__menu">
            <nav className="nav">
              <button className="nav__item" type="button" onClick={() => scrollItem('description')}>
                {intl.formatMessage({ id: 'About_app' })}
              </button>{' '}
              <button className="nav__item" type="button" onClick={() => scrollItem('video')}>
                {intl.formatMessage({ id: 'Video' })}
              </button>{' '}
              <button className="nav__item" type="button" onClick={() => scrollItem('team')}>
                {intl.formatMessage({ id: 'About_team' })}
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
                  {intl.formatMessage({ id: 'Exit' })}
                </Button>
              </div>
            ) : (
              <Button className="btn" onClick={setIsVisibleAuthCard}>
                {intl.formatMessage({ id: 'Authorization' })}
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
