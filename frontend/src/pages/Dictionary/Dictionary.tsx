import React from 'react'
import { useIntl } from 'react-intl'
import './Dictionary.scss'

import useTypedSelector from '../../hooks/useTypedSelector'
import DictionaryCardList from '../../components/DictionaryCardList/DictionaryCardList'

const Dictionary: React.FC = () => {
  const intl = useIntl()
  const { token } = useTypedSelector((state) => state.authReducer)

  return (
    <div className="dictionary">
      {token ? (
        <DictionaryCardList />
      ) : (
        <h2>{intl.formatMessage({ id: 'dictionary_authorized' })}</h2>
      )}
    </div>
  )
}

export default Dictionary
