/* eslint-disable */
import React, { useState } from 'react'
import './Settings.scss'
import { Checkbox, Select } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import useTypedSelector from '../../hooks/useTypedSelector'
import useActions from '../../hooks/useActions'

const defaultSettings: { [key: string]: boolean } = {
  difficult_button: true,
  delete_button: true,
  word_translation: true,
  sentence_translation: true,
}

const { Option } = Select

const Settings: React.FC = () => {
  const { countWordsGame } = useTypedSelector((state) => state.gameReducer)
  const { SetCountWordsGame } = useActions()

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
      <h1>Settings</h1>
      <div className="settings__inner">
        <div className="settings__box">
          <h3>BUTTON DISPLAY SETTINGS</h3>
          <div className="settings__box_checkbox">
            <Checkbox
              onChange={checkboxHandler}
              name="difficult_button"
              className="checkbox"
              checked={settings.difficult_button}
            >
              "Difficult" button
            </Checkbox>
            <Checkbox
              onChange={checkboxHandler}
              name="delete_button"
              className="checkbox"
              checked={settings.delete_button}
            >
              "Delete" button
            </Checkbox>
          </div>
        </div>
        <div className="settings__box">
          <h3>DISPLAY SETTINGS</h3>
          <div className="settings__box_checkbox">
            <Checkbox
              onChange={checkboxHandler}
              name="word_translation"
              className="checkbox"
              checked={settings.word_translation}
            >
              Word translation
            </Checkbox>
            <Checkbox
              onChange={checkboxHandler}
              name="sentence_translation"
              className="checkbox"
              checked={settings.sentence_translation}
            >
              Sentence translation with learning word
            </Checkbox>
          </div>
        </div>
        <div className="settings__box_checkbox">
          <Select defaultValue={countWordsGame} onChange={changeCountWords} style={{ width: 60 }}>
            <Option value={5}>5</Option>
            <Option value={10}>10</Option>
            <Option value={15}>15</Option>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default Settings
