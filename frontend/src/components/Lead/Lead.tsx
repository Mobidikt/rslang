import React from 'react'
import { useIntl } from 'react-intl'
import { useNavigate } from 'react-router'
import { Button } from 'antd'
import './Lead.scss'
import useActions from '../../hooks/useActions'

const Lead: React.FC = () => {
  const intl = useIntl()
  const navigate = useNavigate()
  const { setSelectedSection } = useActions()
  return (
    <section className="lead">
      <div className="lead__wrapper">
        <div className="lead__info">
          <h1 className="lead__title">{intl.formatMessage({ id: 'Learn_English' })}</h1>
          <p className="lead__subtitle">{intl.formatMessage({ id: 'easier' })}</p>
          <Button
            type="primary"
            className="lead__btn"
            danger
            onClick={() => {
              navigate('/tutorial')
              setSelectedSection('Tutorial')
            }}
          >
            {intl.formatMessage({ id: 'START_NOW' })}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Lead
