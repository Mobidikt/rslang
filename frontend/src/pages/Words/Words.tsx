import React, { useEffect } from 'react'
import { useParams } from 'react-router'
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
      <WordsList />
    </div>
  )
}

export default Word
