import React, { useEffect } from 'react'
import { Button, message } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import useTypedSelector from '../../../hooks/useTypedSelector'
import './Pagination.scss'
import useActions from '../../../hooks/useActions'

type PaginationType = {
  onHandleSetIsNextPage: (status: boolean) => void,
  isNextPage: boolean,
}

const Pagination: React.FC<PaginationType> = ({ onHandleSetIsNextPage, isNextPage }) => {
  const { currentPage, words, firstPage, deletedPages } = useTypedSelector(
    (state) => state.lessonReducer,
  )
  const { userId } = useTypedSelector((state) => state.authReducer)
  const { setCurrentPage, setFirstPage, addDeletedPage } = useActions()

  const nextPageClickHandler = () => {
    onHandleSetIsNextPage(true)
    setCurrentPage(currentPage + 1)
  }

  const prevPageClickHandler = () => {
    onHandleSetIsNextPage(false)
    setCurrentPage(currentPage - 1)
  }

  useEffect(() => {
    if (userId) {
      if (words.length === 0) {
        // eslint-disable-next-line
        message.warning('Предыдущая старница была удалена')
        addDeletedPage(currentPage)
        if (isNextPage) {
          nextPageClickHandler()
        } else {
          prevPageClickHandler()
        }
      }
    }

    // eslint-disable-next-line
  }, [words])

  useEffect(() => {
    const nums: Array<number> = new Array(30).fill('').map((_, idx) => idx)
    const fillPages: Array<number> = nums
      .map((num) => (deletedPages.includes(num) ? 100 : num))
      .filter((num) => num !== 100)
    setFirstPage(fillPages[0])
    // eslint-disable-next-line
  }, [])

  return (
    <div className="pagination">
      <Button
        shape="circle"
        onClick={prevPageClickHandler}
        icon={<LeftOutlined />}
        disabled={currentPage === firstPage}
      />
      <span>{currentPage + 1}</span>
      <Button
        shape="circle"
        onClick={nextPageClickHandler}
        icon={<RightOutlined />}
        disabled={currentPage === 29}
      />
    </div>
  )
}

export default Pagination
