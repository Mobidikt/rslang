import React, { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import WordsList from '../../components/WordsList/WordsList'
import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'
import './Words.scss'

const Word: React.FC = () => {
  const navigate = useNavigate()
  const { currentPage } = useTypedSelector((state) => state.lessonReducer)
  const { groupId } = useParams()
  const {
    fetchWords,
    setCurrentGroup,
    setSelectedSection,
    setCurrentPage,
    setFromCurrentGroup,
  } = useActions()

  useEffect(() => {
    fetchWords(+groupId, currentPage || 0)
    setCurrentGroup(+groupId)
    // eslint-disable-next-line
  }, [currentPage, groupId])

  const handleNextGroup = () => {
    setCurrentPage(0)
    setSelectedSection(`Lessons - Lesson ${+groupId + 2}`)
    navigate(`/tutorial/${+groupId + 1}`)
  }

  const handlePrevGroup = () => {
    setCurrentPage(0)
    setSelectedSection(`Lessons - Lesson ${+groupId}`)
    navigate(`/tutorial/${+groupId - 1}`)
  }

  const handleNavigateToGame = (path: string) => {
    setFromCurrentGroup(true)
    navigate(`/games/${path}`)
  }

  const backToLessons = () => {
    navigate('/tutorial')
    setSelectedSection(`Lessons`)
  }

  return (
    <div className="words">
      <div className="words-links">
        <Button
          onClick={backToLessons}
          size="large"
          className="back_btn"
          shape="circle"
          icon={<ArrowLeftOutlined />}
        />
        <div className="words-games">
          <h4>Изучить эти слова можно тут:</h4>
          <Button onClick={() => handleNavigateToGame('savannah')}>Саванна</Button>

          <Button onClick={() => handleNavigateToGame('sprint')}>Спринт</Button>
          <Button onClick={() => handleNavigateToGame('call')}>Аудиовызов</Button>
          <Button onClick={() => handleNavigateToGame('our-game')}>Наша игра</Button>
        </div>
        <div className="words-navigation">
          <Button onClick={handlePrevGroup} disabled={+groupId === 0} size="large">
            Предыдущая группа
          </Button>
          <Button onClick={handleNextGroup} disabled={+groupId === 5} size="large">
            Следущая группа
          </Button>
        </div>
      </div>

      <div className="words-container">
        <WordsList />
      </div>
    </div>
  )
}

export default Word
