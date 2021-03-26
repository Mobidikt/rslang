import React, { Suspense, useEffect } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import './DefaultLayout.scss'
import Bar from '../components/Bar/Bar'
import Header from '../components/Header/Header'
import useTypedSelector from '../hooks/useTypedSelector'
import useActions from '../hooks/useActions'

const { Content } = Layout

const DefaultLayout: React.FC = () => {
  const { userId } = useTypedSelector((state) => state.authReducer)
  const { fetchUserWords } = useActions()

  useEffect(() => {
    console.log('Gello')
    if (userId) {
      fetchUserWords(userId)
    }
    // eslint-disable-next-line
  }, [userId])

  return (
    <Layout className="default-layout">
      <Bar />
      <Layout className="site-layout">
        <Header />
        <Content className="app-content">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default DefaultLayout
