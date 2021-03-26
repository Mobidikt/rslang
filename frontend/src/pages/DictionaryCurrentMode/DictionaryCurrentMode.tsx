import React, { useEffect, useState, useRef } from 'react'
import { List, Button, Modal, Tooltip, Popconfirm } from 'antd'
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

const DictionaryCurrentMode: React.FC = () => {
  const { mode } = useParams()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const textMeaningRef = useRef<HTMLParagraphElement>(null)
  const textExampleRef = useRef<HTMLParagraphElement>(null)
  const [currentWord, setCurrentWord] = useState<WordAgregationType>()
  const currentModeWords =
    // eslint-disable-next-line no-nested-ternary
    mode === 'deleted' ? 'deletedWords' : mode === 'learned' ? 'learnedWords' : 'difficultWords'

  const words = useTypedSelector((state) => state.dictionaryReducer[currentModeWords])

  const { setSelectedSection } = useActions()

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
          pageSize: 5,
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
                <Button>Добавить в сложные</Button>
              ) : (
                <Button>Убрать из сложных</Button>
              ),

              mode === 'deleted' ? (
                <Tooltip title="Восстановить">
                  <Button shape="round" icon={<HistoryOutlined />} />
                </Tooltip>
              ) : null,

              mode === 'difficult' || mode === 'learned' ? (
                <Button shape="round" danger icon={<DeleteOutlined />} />
              ) : (
                <Popconfirm
                  title="Вы уверены что хотите удалить это слово?"
                  placement="topRight"
                  onConfirm={() => console.log}
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button shape="round" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              ),
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
