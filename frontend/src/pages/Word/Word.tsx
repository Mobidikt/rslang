/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Spin, Button, Input, message } from 'antd'
import { SoundOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import config from '../../config'
import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'
import playSound from '../../utils/playSound'
import './Word.scss'
import { WordAgregationType } from '../../store/types/dictionary'
import difficultMark from '../../assets/image/difficult_mark.png'

const Word: React.FC = () => {
  const { groupId, id } = useParams()
  const { fetchWord, addWord, setCurrentWordIsDifficult, updateUserWord } = useActions()
  const {
    currentWord,
    isLoading,
    currentWordIsDifficult,
    isDeleteBtnVisible,
    isTranslationWordVisible,
    isDifficultBtnVisible,
    isTranslationSentenceVisible,
  } = useTypedSelector((state) => state.lessonReducer)
  const { userId } = useTypedSelector((state) => state.authReducer)
  const { difficultWords, userWords, isLoadingDictionary } = useTypedSelector(
    (state) => state.dictionaryReducer,
  )
  const [currentUserWord, setCurrentUserWord] = useState<WordAgregationType>()

  const isInUserWords = (wordId: string) => {
    return !!userWords.find((el) => el._id === wordId)
  }

  const textMeaningRef = useRef<HTMLParagraphElement>(null)
  const textExampleRef = useRef<HTMLParagraphElement>(null)
  const [wasDelete, setWasDelete] = useState<boolean>(false)

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
    if (currentWord) {
      setCurrentUserWord(userWords.find((el) => el._id === currentWord.id))
    }
  }, [currentWord, userWords])

  const addWordToDictionary = () => {
    if (userId) {
      if (currentWord) {
        if (isInUserWords(id)) {
          const difficulty = currentWordIsDifficult ? 'learned' : 'difficult'
          updateUserWord(userId, id, currentWord, difficulty, '', true)
        } else {
          addWord(userId, id, currentWord, 'difficult', '', true)
        }
        // eslint-disable-next-line
        message.success('Слово успешно изменено')
      }
    } else {
      // eslint-disable-next-line
      message.warning('Эта функция доступна только авторизованным пользователям')
    }
  }

  const removeWord = () => {
    if (userId) {
      if (currentWord) {
        if (isInUserWords(id)) {
          updateUserWord(userId, id, currentWord, 'deleted', '', false)
        } else {
          addWord(userId, id, currentWord, 'deleted', '', false)
        }
      }
      // eslint-disable-next-line
      message.success('Слово успешно удалено')
      setWasDelete(true)
    } else {
      // eslint-disable-next-line
      message.warning('Эта функция доступна только авторизованным пользователям')
    }
  }

  const WordJSX = (
    <>
      <Link to={`/tutorial/${groupId}`} className="word-link_back">
        <Button className="back_btn" size="large" shape="circle" icon={<ArrowLeftOutlined />} />
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
              <b>{isTranslationWordVisible ? currentWord?.wordTranslate : null}</b>
            </p>

            <span className="word-info-text__meaning" ref={textMeaningRef} />
            <span className="word-info-text__sound">
              <SoundOutlined onClick={() => playSound(currentWord?.audioMeaning || '')} />
            </span>
            {isTranslationSentenceVisible ? (
              <p className="word-info-text__meaningTranslate">
                {currentWord?.textMeaningTranslate}
              </p>
            ) : null}
            <br />
            <span className="word-info-text__example" ref={textExampleRef} />
            <span className="word-info-text__sound">
              <SoundOutlined onClick={() => playSound(currentWord?.audioExample || '')} />
            </span>
            {isTranslationSentenceVisible ? (
              <p className="word-info-text__exampleTranslate">
                {currentWord?.textExampleTranslate}
              </p>
            ) : null}
          </div>
        </div>

        <div className="word-info-games">
          <p className="word-info-games__title">Savannah</p>
          <Input
            className="word-info-games_input"
            disabled
            name="savannah"
            value={currentUserWord?.userWord.games?.savannah || 0}
          />
          <p className="word-info-games__title">Audiocall</p>
          <Input
            className="word-info-games_input"
            disabled
            name="audiocall"
            value={currentUserWord?.userWord.games?.audioCall || 0}
          />
          <p className="word-info-games__title">Sprint</p>
          <Input
            className="word-info-games_input"
            disabled
            name="sprint"
            value={currentUserWord?.userWord.games?.sprint || 0}
          />
          <p className="word-info-games__title">Ourgame</p>
          <Input
            className="word-info-games_input"
            disabled
            name="ourgame"
            value={currentUserWord?.userWord.games?.ourGame || 0}
          />
        </div>
        {currentWordIsDifficult ? (
          <img className="hard__mark" src={difficultMark} alt="difficultWord" />
        ) : null}
      </div>

      <div className="word-buttons">
        {isDifficultBtnVisible ? (
          <Button
            type="primary"
            size="large"
            className="word-buttons__btn"
            onClick={addWordToDictionary}
          >
            {currentWordIsDifficult ? 'Убрать из сложных' : 'Добавить в сложные'}
          </Button>
        ) : null}
        {isDeleteBtnVisible ? (
          wasDelete ? null : (
            <Button
              disabled={isLoadingDictionary}
              onClick={removeWord}
              type="primary"
              size="large"
              className="word-buttons__btn"
            >
              Удалить
            </Button>
          )
        ) : null}
      </div>
    </>
  )

  return <div className="word">{isLoading ? <Spin size="large" /> : WordJSX}</div>
}

export default Word
