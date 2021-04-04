import React, { useEffect, useState } from 'react'
import { Switch } from 'antd'

import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'

const LanguageSelect: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(true)
  const { language } = useTypedSelector((state) => state.appReducer)
  const { setLanguage } = useActions()

  const changeLanguage = () => {
    if (language === 'en') setLanguage('ru')
    else setLanguage('en')
  }
  useEffect(() => {
    if (language === 'en') setChecked(true)
    else setChecked(false)
  }, [language])
  return (
    <Switch
      checked={checked}
      checkedChildren="En"
      unCheckedChildren="Ru"
      onChange={() => changeLanguage()}
    />
  )
}

export default LanguageSelect
