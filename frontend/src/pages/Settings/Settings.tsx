/* eslint-disable */
import React, { useState } from 'react'
import './Settings.scss'
import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from "antd/es/checkbox";

const defaultSettings: {[key: string]:boolean} = {
  difficult_button: true,
  delete_button: true,
  word_translation: true,
  sentence_translation: true,
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState(defaultSettings)

  const checkboxHandler = (e: CheckboxChangeEvent) => {
    const propName: string = e.target.name || ''
    setSettings({...settings, [propName]: e.target.checked})
  }

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="settings__inner">
        <div className="settings__box">
          <h3>BUTTON DISPLAY SETTINGS</h3>
          <div className="settings__box_checkbox">
            <Checkbox onChange={checkboxHandler} name="difficult_button" checked={settings.difficult_button}>"Difficult" button</Checkbox>
            <Checkbox onChange={checkboxHandler} name="delete_button" checked={settings.delete_button}>"Delete" button</Checkbox>
          </div>

        </div>
        <div className="settings__box">
          <h3>DISPLAY SETTINGS</h3>
          <div className="settings__box_checkbox">
            <Checkbox onChange={checkboxHandler} name="word_translation" checked={settings.word_translation}>Word translation</Checkbox>
            <Checkbox onChange={checkboxHandler} name="sentence_translation" checked={settings.sentence_translation}>Sentence translation with learning word</Checkbox>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
