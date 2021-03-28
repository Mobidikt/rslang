import React from 'react'
import { useNavigate } from 'react-router'
import { Button } from 'antd'
import './Lead.scss'
import useActions from '../../hooks/useActions'

const Lead: React.FC = () => {
  const navigate = useNavigate()
  const { setSelectedSection } = useActions()
  return (
    <section className="lead">
      <div className="lead__wrapper">
        <div className="lead__info">
          <h1 className="lead__title">Learn an English</h1>
          <p className="lead__subtitle">Our app can help you learn and faster and easier. </p>
          <Button
            type="primary"
            className="lead__btn"
            danger
            onClick={() => {
              navigate('/tutorial')
              setSelectedSection('Tutorial')
            }}
          >
            START NOW
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Lead
