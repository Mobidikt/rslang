import React from 'react'
import { Card } from 'antd'
import './Dictionary.scss'

import learnedWordsPhoto from '../../assets/image/learnWords.png'
import deletedWordsPhoto from '../../assets/image/delWords.png'
import difWordsPhoto from '../../assets/image/difWords.png'
import useTypedSelector from '../../hooks/useTypedSelector'

const { Meta } = Card

const Dictionary: React.FC = () => {
  const { token } = useTypedSelector((state) => state.authReducer)

  return (
    <div className="dictionary">
      {token ? (
        <>
          <Card
            className="dictionary__card"
            cover={<img alt="Studied words" src={learnedWordsPhoto} />}
          >
            <Meta title="Studied words" />
          </Card>
          <Card
            className="dictionary__card"
            cover={<img alt="Difficult words" src={difWordsPhoto} />}
          >
            <Meta title="Difficult words" />
          </Card>
          <Card
            className="dictionary__card"
            cover={<img alt="Deleted words" src={deletedWordsPhoto} />}
          >
            <Meta title="Deleted words" />
          </Card>
        </>
      ) : (
        <h2>Словарь доступен только авторизованным пользователям</h2>
      )}
    </div>
  )
}

export default Dictionary
