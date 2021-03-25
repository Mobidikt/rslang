import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import WordsList from '../../components/WordsList/WordsList'
import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'
import './Words.scss'

const Word: React.FC = () => {
  const { currentPage } = useTypedSelector((state) => state.lessonReducer)
  const { groupId } = useParams()
  const { fetchWords, setCurrentGroup } = useActions()

  useEffect(() => {
    fetchWords(+groupId, currentPage || 0)
    setCurrentGroup(+groupId)
    // eslint-disable-next-line
  }, [currentPage, groupId])

  return (
    <div className="words">
      <Link to="/tutorial">
        <Button className="back_btn" shape="circle" icon={<ArrowLeftOutlined />} />
      </Link>
      <div className="words-container">
        <WordsList />
      </div>
    </div>
  )
}

export default Word
