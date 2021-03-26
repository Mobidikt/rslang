import React from 'react'
import './Dictionary.scss'

import useTypedSelector from '../../hooks/useTypedSelector'
import DictionaryCardList from '../../components/DictionaryCardList/DictionaryCardList'

const Dictionary: React.FC = () => {
  const { token } = useTypedSelector((state) => state.authReducer)

  return (
    <div className="dictionary">
      {token ? (
        <DictionaryCardList />
      ) : (
        <h2>Словарь доступен только авторизованным пользователям</h2>
      )}
    </div>
  )
}

export default Dictionary
