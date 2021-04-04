import React, { useEffect, useState, useRef } from 'react'
import { List, Button, Modal, Tooltip } from 'antd'
import {
  EyeOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
  HistoryOutlined,
  SoundOutlined,
} from '@ant-design/icons'
import { useParams, Link } from 'react-router-dom'
import playSound from '../../utils/playSound'
import useTypedSelector from '../../hooks/useTypedSelector'
import './DictionaryCurrentMode.scss'
import useActions from '../../hooks/useActions'
import { WordAgregationType } from '../../store/types/dictionary'
import getImgUrl from '../../utils/getImageUrl'
import { WordType } from '../../store/types/lesson'

const DictionaryCurrentMode: React.FC = () => {
  const { mode } = useParams()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [countWordsOnPage, setCountWordsOnPage] = useState(5)
  const textMeaningRef = useRef<HTMLParagraphElement>(null)
  const textExampleRef = useRef<HTMLParagraphElement>(null)
  const [currentWord, setCurrentWord] = useState<WordAgregationType>()
  const currentModeWords =
    // eslint-disable-next-line no-nested-ternary
    mode === 'deleted' ? 'deletedWords' : mode === 'learned' ? 'learnedWords' : 'difficultWords'

  const { userWords } = useTypedSelector((state) => state.dictionaryReducer)
  const words = useTypedSelector((state) => state.dictionaryReducer[currentModeWords])
  const { userId } = useTypedSelector((state) => state.authReducer)

  const { setSelectedSection, updateUserWord, deleteUserWord } = useActions()

  useEffect(() => {
    setSelectedSection(`Dictionary - ${mode} words`)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (textExampleRef.current) {
      textExampleRef.current.innerHTML = currentWord?.textExample || ''
    }

    if (textMeaningRef.current) {
      textMeaningRef.current.innerHTML = currentWord?.textMeaning || ''
    }
  }, [currentWord])

  const showModal = (word: WordAgregationType) => {
    setIsModalVisible(true)
    setCurrentWord(word)
  }

  const hideModal = () => {
    setIsModalVisible(false)
  }

  const handleChangeStatusWord = (
    word: WordAgregationType,
    difficulty: 'deleted' | 'learned' | 'difficult',
  ) => {
    if (userId) {
      const wordTypeWord: WordType = {
        ...word,
        id: word._id,
      }
      updateUserWord(userId, word._id, wordTypeWord, difficulty)
    }
  }

  const wordIsDifficult = (difficulty: string): boolean => {
    return difficulty === 'difficult'
  }

  return (
    <div className="dictionary-container">
      <Link to="/dictionary">
        <Button
          className="back_btn"
          shape="circle"
          size="large"
          onClick={() => setSelectedSection('Dictionary')}
          icon={<ArrowLeftOutlined />}
        />
      </Link>
      <List
        className="dictionary-container-list"
        bordered
        loading={!words}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page, pageSize) => {
            setCountWordsOnPage(pageSize || 5)
          },
          pageSize: countWordsOnPage,
        }}
        dataSource={words}
        renderItem={(word) => (
          <List.Item
            key={word._id}
            className="dictionary-container-list-card"
            actions={[
              <Tooltip title="Подробнее">
                <Button shape="round" icon={<EyeOutlined />} onClick={() => showModal(word)} />
              </Tooltip>,

              mode === 'learned' ? (
                <Button
                  onClick={() =>
                    handleChangeStatusWord(
                      word,
                      wordIsDifficult(word.userWord.difficulty) ? 'learned' : 'difficult',
                    )
                  }
                >
                  {wordIsDifficult(word.userWord.difficulty)
                    ? 'Убрать из сложных'
                    : 'Добавить в сложные'}
                </Button>
              ) : null,

              mode === 'difficult' ? (
                <Button onClick={() => handleChangeStatusWord(word, 'learned')}>
                  Убрать из сложных
                </Button>
              ) : null,
              mode === 'deleted' ? (
                <Tooltip title="Восстановить">
                  <Button
                    onClick={() => handleChangeStatusWord(word, 'learned')}
                    shape="round"
                    icon={<HistoryOutlined />}
                  />
                </Tooltip>
              ) : null,

              mode === 'difficult' || mode === 'learned' ? (
                <Button
                  onClick={() => handleChangeStatusWord(word, 'deleted')}
                  shape="round"
                  danger
                  icon={<DeleteOutlined />}
                />
              ) : null,
            ].filter((btn) => btn !== null)}
            extra={
              <img width={250} className="word_img" alt="wordImage" src={getImgUrl(word.image)} />
            }
          >
            <List.Item.Meta
              title={
                <div>
                  <span className="dictionary-container-list-card__title">{word.word}</span>
                  <span className="dictionary-container-list-card__sound">
                    <SoundOutlined onClick={() => playSound(word.audio)} />
                  </span>
                  <h4 className="dictionary-container-list-card__subtitle">{word.wordTranslate}</h4>
                </div>
              }
              description={word.transcription}
            />
          </List.Item>
        )}
      />
      <Modal title={currentWord?.word} visible={isModalVisible} footer={false} onCancel={hideModal}>
        <div className="modal-word">
          <div className="modal-word-info">
            <span className="word-info-text__word">{currentWord?.word}</span>
            <span className="word-info-text__sound">
              <SoundOutlined onClick={() => playSound(currentWord?.audio || '')} />
            </span>
            <p className="word-info-text__transcription">{currentWord?.transcription}</p>
            <p className="word-info-text__translate">
              <b>{currentWord?.wordTranslate}</b>
            </p>

            <span className="word-info-text__meaning" ref={textMeaningRef} />
            <span className="word-info-text__sound">
              <SoundOutlined onClick={() => playSound(currentWord?.audioMeaning || '')} />
            </span>
            <p className="word-info-text__meaningTranslate">{currentWord?.textMeaningTranslate}</p>

            <span className="word-info-text__example" ref={textExampleRef} />
            <span className="word-info-text__sound">
              <SoundOutlined onClick={() => playSound(currentWord?.audioExample || '')} />
            </span>
            <p className="word-info-text__exampleTranslate">{currentWord?.textExampleTranslate}</p>
          </div>
          <img src={getImgUrl(currentWord?.image || '')} alt="" />
        </div>
      </Modal>
    </div>
  )
}

export default DictionaryCurrentMode
