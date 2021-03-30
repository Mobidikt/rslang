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
  const { currentPage, words } = useTypedSelector((state) => state.lessonReducer)
  const { userId } = useTypedSelector((state) => state.authReducer)
  const { setCurrentPage, fetchWords } = useActions()

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
        if (isNextPage) {
          nextPageClickHandler()
        } else {
          prevPageClickHandler()
        }
      }
    }

    // eslint-disable-next-line
  }, [words])

  return (
    <div className="pagination">
      <Button
        shape="circle"
        onClick={prevPageClickHandler}
        icon={<LeftOutlined />}
        disabled={currentPage === 0}
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
