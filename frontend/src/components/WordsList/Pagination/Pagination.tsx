import React from 'react'
import { Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import useTypedSelector from '../../../hooks/useTypedSelector'
import './Pagination.scss'
import useActions from '../../../hooks/useActions'

const Pagination: React.FC = () => {
  const { currentPage } = useTypedSelector((state) => state.lessonReducer)
  const { setCurrentPage } = useActions()

  const nextPageClickHandler = () => {
    setCurrentPage(currentPage + 1)
  }

  const prevPageClickHandler = () => {
    setCurrentPage(currentPage - 1)
  }

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
        disabled={currentPage === 19}
      />
    </div>
  )
}

export default Pagination
