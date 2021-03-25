import React from 'react'
import { List, Spin } from 'antd'
import useTypedSelector from '../../hooks/useTypedSelector'
import WordCard from './WordCard/WordCard'
import './WordsList.scss'
import Pagination from './Pagination/Pagination'

const WordsList: React.FC = () => {
  const { words, isLoading } = useTypedSelector((state) => state.lessonReducer)

  const ListJSX = (
    <>
      <List
        className="word-list"
        grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 5 }}
        dataSource={words}
        renderItem={(word) => (
          <List.Item>
            <WordCard key={word.id} word={word} />
          </List.Item>
        )}
      />
      <Pagination />
    </>
  )

  return <div className="words-cards">{isLoading ? <Spin size="large" /> : ListJSX}</div>
}

export default WordsList
