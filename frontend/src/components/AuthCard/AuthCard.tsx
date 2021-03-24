import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import './AuthCard.scss'
import useTypedSelector from '../../hooks/useTypedSelector'
import useActions from '../../hooks/useActions'
import Login from './Login/Login'
import Registration from './Registration/Registation'

const AuthCard: React.FC = () => {
  const { isVisibleAuthCard } = useTypedSelector((state) => state.authReducer)
  const [isLogin, setIsLogin] = useState(true)
  const { setIsVisibleAuthCard } = useActions()

  return (
    <div>
      <Modal
        className="modal"
        title={isLogin ? 'Авторизоваться' : 'Регистрация'}
        visible={isVisibleAuthCard}
        onCancel={setIsVisibleAuthCard}
        footer={false}
      >
        {isLogin ? <Login /> : <Registration />}

        <div className="modal-footer">
          <span>{isLogin ? 'У вас нет аккаунта' : 'У вас есть аккаунт?'}</span>
          <Button onClick={() => setIsLogin((prev) => !prev)} type="link">
            {isLogin ? 'Регистрация' : 'Войти'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default AuthCard
