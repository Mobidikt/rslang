import React, { useState, useEffect } from 'react'
import { Button, Modal, Progress } from 'antd'
import './Statistics.scss'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { WordType } from '../../../store/types/lesson'
import playSound from '../../../utils/playSound'
import useTypedSelector from '../../../hooks/useTypedSelector'
import useActions from '../../../hooks/useActions'

type StatisticsTypes = {
  success: WordType[],
  error: WordType[],
  currentGame: 'sprint' | 'ourGame' | 'audioCall' | 'savannah',
  back: () => void,
}

const Statistics: React.FC<StatisticsTypes> = ({ success, error, back, currentGame }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { userId } = useTypedSelector((state) => state.authReducer)
  const { addWord, updateUserWord } = useActions()
  const { userWords } = useTypedSelector((state) => state.dictionaryReducer)

  const addWordsToDictionary = () => {
    const words = [...success, ...error]
    if (userId) {
      for (let i = 0; i < words.length; i += 1) {
        if (!userWords.find((word) => word._id === words[i].id)) {
          if (i < success.length) {
            addWord(userId, words[i].id, words[i], 'learned', currentGame)
          } else {
            addWord(userId, words[i].id, words[i], 'learned', '')
          }
        } else {
          updateUserWord(userId, words[i].id, words[i], 'learned', currentGame)
        }
      }
    }
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  useEffect(() => {
    showModal()
    addWordsToDictionary()
    return () => {
      handleCancel()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Modal title="Статистика игры" visible={isModalVisible} closable={false} footer={false}>
      <Progress
        strokeColor="green"
        type="circle"
        percent={Math.round((success.length / (error.length + success.length)) * 100)}
        className="progress"
      />
      <div className="statistics-game__wrapper">
        <div className="statistics-game__success">
          {success.length > 0 ? (
            <h3 className="statistics-game__title">Правильные ответы:</h3>
          ) : null}
          {success.map((word) => (
            <div className="statistics-game__words-wrapper" key={word.id}>
              <div className="statistics-game__word">
                <Button
                  type="primary"
                  className="statistics-game__play-sound"
                  onClick={() => playSound(word.audio)}
                />
                <p className="statistics-game__text">
                  {word.word} - {word.wordTranslate}
                </p>
              </div>
              <CheckOutlined className="success" />
            </div>
          ))}
        </div>
        <div className="statistics-game__error">
          {error.length > 0 ? (
            <h3 className="statistics-game__title">Неправильные ответы:</h3>
          ) : null}
          {error.map((word) => (
            <div className="statistics-game__words-wrapper" key={word.id}>
              <div className="statistics-game__word">
                <Button
                  type="primary"
                  className="statistics-game__play-sound"
                  onClick={() => playSound(word.audio)}
                />
                <p className="statistics-game__text">
                  {word.word} - {word.wordTranslate}
                </p>
              </div>
              <CloseOutlined className="error" />
            </div>
          ))}
        </div>
      </div>
      <Button type="primary" className="statistics-game__btn" onClick={back}>
        Продолжить
      </Button>
    </Modal>
  )
}

export default Statistics
