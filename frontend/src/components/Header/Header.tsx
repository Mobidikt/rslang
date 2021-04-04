import React from 'react'
import { useIntl } from 'react-intl'
import { Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import './Header.scss'
import useActions from '../../hooks/useActions'
import AuthCard from '../AuthCard/AuthCard'
import useTypedSelector from '../../hooks/useTypedSelector'
import getImgUrl from '../../utils/getImageUrl'
import UserProfile from '../UserProfile/UserProfile'

const Header: React.FC = () => {
  const intl = useIntl()
  const { setIsVisibleAuthCard, logout, clearUserWords, setIsVisibleProfileCard } = useActions()
  const { token, username, userPhoto } = useTypedSelector((state) => state.authReducer)
  const { selectedSection, headerColor } = useTypedSelector((state) => state.appReducer)

  const logoutUserClick = () => {
    clearUserWords()
    logout()
  }
  return (
    <>
      <header className="header" style={{ background: headerColor }}>
        <h2 className="header__sectionName">{intl.formatMessage({ id: selectedSection })}</h2>
        {token ? (
          <div className="header-user">
            {userPhoto ? (
              <Button onClick={() => setIsVisibleProfileCard()} className="profile" shape="circle">
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

            <span className="header__username">{username}</span>
            <Button className="btn logout" onClick={logoutUserClick}>
              {intl.formatMessage({ id: 'Exit' })}
            </Button>
          </div>
        ) : (
          <Button className="btn" onClick={setIsVisibleAuthCard}>
            {intl.formatMessage({ id: 'Authorization' })}
          </Button>
        )}
      </header>
      {token ? <UserProfile /> : null}
      <AuthCard />
    </>
  )
}

export default Header
