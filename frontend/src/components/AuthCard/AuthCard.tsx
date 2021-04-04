import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { Modal, Button } from 'antd'
import './AuthCard.scss'
import useTypedSelector from '../../hooks/useTypedSelector'
import useActions from '../../hooks/useActions'
import Login from './Login/Login'
import Registration from './Registration/Registation'

const AuthCard: React.FC = () => {
  const intl = useIntl()
  const { isVisibleAuthCard } = useTypedSelector((state) => state.authReducer)
  const [isLogin, setIsLogin] = useState(true)
  const { setIsVisibleAuthCard } = useActions()

  return (
    <div>
      <Modal
        className="modal"
        title={
          isLogin ? intl.formatMessage({ id: 'Login' }) : intl.formatMessage({ id: 'Register' })
        }
        visible={isVisibleAuthCard}
        onCancel={setIsVisibleAuthCard}
        footer={false}
      >
        {isLogin ? <Login /> : <Registration />}

        <div className="modal-footer">
          <span>
            {isLogin
              ? intl.formatMessage({ id: 'You_not_account' })
              : intl.formatMessage({ id: 'Do_have_account' })}
          </span>
          <Button onClick={() => setIsLogin((prev) => !prev)} type="link">
            {isLogin ? intl.formatMessage({ id: 'Register' }) : intl.formatMessage({ id: 'Login' })}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default AuthCard
