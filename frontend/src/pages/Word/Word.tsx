import React, { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Spin, Button, Input } from 'antd'
import { SoundOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import config from '../../config'
import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'
import './Word.scss'
import WordApi from '../../services/WordApi'

const Word: React.FC = () => {
  const { groupId, id } = useParams()
  const { fetchWord } = useActions()
  const { currentWord, isLoading } = useTypedSelector((state) => state.lessonReducer)
  const { userId } = useTypedSelector((state) => state.authReducer)

  const textMeaningRef = useRef<HTMLParagraphElement>(null)
  const textExampleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    fetchWord(id)
    // eslint-disable-next-line
  }, [id])

  useEffect(() => {
    if (textExampleRef.current) {
      textExampleRef.current.innerHTML = currentWord?.textExample || ''
    }

    if (textMeaningRef.current) {
      textMeaningRef.current.innerHTML = currentWord?.textMeaning || ''
    }
  }, [currentWord])

  const addWordToDictionary = async () => {
    const newWordInDictionary = await WordApi.saveToDifficult(userId || '', id)
    console.log(newWordInDictionary)
  }

  const playSound = (path: string) => {
    const audio = new Audio(`${config.API_URL}/${path}`)
    audio
      .play()
      .then(() => {})
      .catch((err) => console.log(err))
  }

  const WordJSX = (
    <>
      <Link to={`/tutorial/${groupId}`}>
        <Button className="back_btn" shape="circle" icon={<ArrowLeftOutlined />} />
      </Link>
      <div className="word-info">
        <div className="word-info-wrapper">
          <img
            src={`${config.API_URL}/${currentWord?.image || ''}`}
            alt=""
            className="word-info__img"
          />
          <div className="word-info-text">
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
        </div>

        <div className="word-info-games">
          <p className="word-info-games__title">Savannah</p>
          <Input className="word-info-games_input" disabled name="savannah" value={1} />
          <p className="word-info-games__title">Audiocall</p>
          <Input className="word-info-games_input" disabled name="audiocall" value={1} />
          <p className="word-info-games__title">Sprint</p>
          <Input className="word-info-games_input" disabled name="sprint" value={1} />
          <p className="word-info-games__title">Ourgame</p>
          <Input className="word-info-games_input" disabled name="ourgame" value={1} />
        </div>
      </div>
      <div className="word-buttons">
        <Button type="primary" className="word-buttons__btn" onClick={addWordToDictionary}>
          Добавить в сложные
        </Button>
        <Button type="primary">Удалить</Button>
      </div>
    </>
  )

  return <div className="word">{isLoading ? <Spin size="large" /> : WordJSX}</div>
}

export default Word
