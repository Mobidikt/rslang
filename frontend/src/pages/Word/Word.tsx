import React, { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Spin, Button, Input, message } from 'antd'
import { SoundOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import config from '../../config'
import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'
import playSound from '../../utils/playSound'
import './Word.scss'

const Word: React.FC = () => {
  const { groupId, id } = useParams()
  const { fetchWord, addWord, setCurrentWordIsDifficult, updateUserWord } = useActions()
  const { currentWord, isLoading, currentWordIsDifficult } = useTypedSelector(
    (state) => state.lessonReducer,
  )
  const { userId } = useTypedSelector((state) => state.authReducer)
  const { difficultWords, userWords } = useTypedSelector((state) => state.dictionaryReducer)

  const isInUserWords = (wordId: string) => {
    return !!userWords.find((el) => el._id === wordId)
  }

  const textMeaningRef = useRef<HTMLParagraphElement>(null)
  const textExampleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    fetchWord(id)
    // eslint-disable-next-line
  }, [id])

  useEffect(() => {
    setCurrentWordIsDifficult(!!difficultWords.find((el) => el._id === id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficultWords])

  useEffect(() => {
    if (textExampleRef.current) {
      textExampleRef.current.innerHTML = currentWord?.textExample || ''
    }

    if (textMeaningRef.current) {
      textMeaningRef.current.innerHTML = currentWord?.textMeaning || ''
    }
  }, [currentWord])

  const addWordToDictionary = () => {
    if (userId) {
      if (currentWord) {
        if (isInUserWords(id)) {
          const difficulty = currentWordIsDifficult ? 'learned' : 'difficult'
          updateUserWord(userId, id, currentWord, difficulty)
        } else {
          addWord(userId, id, currentWord, 'difficult')
        }
      }
    } else {
      // eslint-disable-next-line
      message.warning('Эта функция доступна только авторизованным пользователям')
    }
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
        <Button
          type="primary"
          size="large"
          className="word-buttons__btn"
          onClick={addWordToDictionary}
        >
          {currentWordIsDifficult ? 'Убрать из сложных' : 'Добавить в сложные'}
        </Button>
      </div>
    </>
  )

  return <div className="word">{isLoading ? <Spin size="large" /> : WordJSX}</div>
}

export default Word
