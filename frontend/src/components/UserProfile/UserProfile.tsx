import React, { useRef, useState, useEffect } from 'react'
import { Form, Input, Button, message, Modal } from 'antd'
import useTypedSelector from '../../hooks/useTypedSelector'
import './UserProfile.scss'
import useActions from '../../hooks/useActions'
import AuthApi from '../../services/AuthApi'
import getImgUrl from '../../utils/getImageUrl'

type ValuesType = {
  email: string,
  username: string,
}

const validateMessages = {
  required: 'Обязательное поле',
}

const UserProfile: React.FC = () => {
  const fileInput = useRef<HTMLInputElement>(null)
  const successMessage = useRef(() => {})

  const { isVisibleProfile, email, username, userPhoto } = useTypedSelector(
    (state) => state.authReducer,
  )

  const { setIsVisibleProfileCard, updateUser } = useActions()

  const initImgSrc = userPhoto ? `${getImgUrl(userPhoto)}` : undefined

  const [imgSrc, setImgSrc] = useState<string | undefined>(initImgSrc)

  useEffect(() => {
    successMessage.current()
  }, [username])

  const changeAvatar = () => {
    const photo = fileInput.current?.files?.length === 1 ? fileInput.current.files[0] : null

    const reader = new FileReader()

    reader.onload = () => {
      setImgSrc(reader.result?.toString())
    }

    if (photo) {
      reader.readAsDataURL(photo)
    }
  }

  const onFinish = async (values: ValuesType) => {
    const photo = fileInput.current?.files?.length === 1 ? fileInput.current.files[0] : null

    const { data } = await AuthApi.update(values.email, values.username, photo)
    updateUser(data.name, data.photo)

    successMessage.current = () => {
      // eslint-disable-next-line
      message.success('Данные успешно изменены')
    }
    setIsVisibleProfileCard(false)
  }

  return (
    <Modal
      className="user-profile"
      visible={isVisibleProfile}
      onCancel={() => setIsVisibleProfileCard(false)}
      title="Ваш профиль"
      footer={false}
    >
      <Form
        className="form"
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <Form.Item label="E-mail" name="email" initialValue={email}>
          <Input disabled className="form__input email" />
        </Form.Item>
        <Form.Item
          label="Имя пользователя"
          name="username"
          initialValue={username}
          rules={[{ required: true }]}
        >
          <Input className="form__input" />
        </Form.Item>
        <div className="photo">
          <h3 className="photo__title">Фото:</h3>
          {imgSrc ? (
            <img src={imgSrc} alt="avatar" className="avatar" />
          ) : (
            <h3>У вас нет фото, но вы можете его загрузить</h3>
          )}
        </div>

        <input
          className="form__input form__input--file"
          type="file"
          onChange={changeAvatar}
          ref={fileInput}
        />

        <Form.Item>
          <Button size="large" htmlType="submit" className="form__btn">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserProfile
