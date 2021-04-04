/* eslint-disable */
import React, { useState } from 'react'
import './Settings.scss'
import { Checkbox, Select, Card } from 'antd'
import { useIntl } from 'react-intl'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import useTypedSelector from '../../hooks/useTypedSelector'
import useActions from '../../hooks/useActions'
import LanguageSelect from '../../components/LanguageSelect/LanguageSelect'

const defaultSettings: { [key: string]: boolean } = {
  difficult_button: true,
  delete_button: true,
  word_translation: true,
  sentence_translation: true,
}

const { Option } = Select

const Settings: React.FC = () => {
  const intl = useIntl()
  const { countWordsGame } = useTypedSelector((state) => state.gameReducer)
  const {
    isDeleteBtnVisible,
    isDifficultBtnVisible,
    isTranslationSentenceVisible,
    isTranslationWordVisible,
  } = useTypedSelector((state) => state.lessonReducer)
  const {
    SetCountWordsGame,
    setIsDeleteBtnVisible,
    setIsDiffucltBtnVisible,
    setIsTranslationSentenceVisible,
    setIsTranslationWordVisible,
  } = useActions()

  const [settings, setSettings] = useState(defaultSettings)

  const checkboxHandler = (e: CheckboxChangeEvent) => {
    const propName: string = e.target.name || ''
    setSettings({ ...settings, [propName]: e.target.checked })
  }

  const changeCountWords = (count: number) => {
    SetCountWordsGame(count)
  }

  return (
    <div className="settings">
      <h2 className="settings__text">Здесь вы можете настроить приложение под себя</h2>
      <div className="settings__inner">
        <Card>
          <div className="settings__box">
            <h3 className="settings__title">BUTTON DISPLAY SETTINGS</h3>
            <div className="settings__box_checkbox">
              <Checkbox
                onChange={setIsDiffucltBtnVisible}
                name="difficult_button"
                className="checkbox"
                checked={isDifficultBtnVisible}
              >
                "Difficult" button
              </Checkbox>
              <Checkbox
                onChange={setIsDeleteBtnVisible}
                name="delete_button"
                className="checkbox"
                checked={isDeleteBtnVisible}
              >
                "Delete" button
              </Checkbox>
            </div>
          </div>
        </Card>
        <Card>
          <div className="settings__box">
            <h3 className="settings__title">{intl.formatMessage({ id: 'DISPLAY_SETTINGS' })}</h3>
            <div className="settings__box_checkbox">
              <Checkbox
                onChange={setIsTranslationWordVisible}
                name="word_translation"
                className="checkbox"
                checked={isTranslationWordVisible}
              >
                Word translation
              </Checkbox>
              <Checkbox
                onChange={setIsTranslationSentenceVisible}
                name="sentence_translation"
                className="checkbox"
                checked={isTranslationSentenceVisible}
              >
                Sentence translation with learning word
              </Checkbox>
              <div>
                <LanguageSelect />
                {intl.formatMessage({ id: 'interface_language' })}
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="settings__box">
            <h3 className="settings__title">GAME SETTINGS</h3>
            <Select
              defaultValue={countWordsGame}
              onChange={changeCountWords}
              style={{ width: 60, marginRight: 10 }}
            >
              <Option value={5}>5</Option>
              <Option value={10}>10</Option>
              <Option value={15}>15</Option>
            </Select>
            <span>Words in game</span>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Settings
