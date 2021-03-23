import React, { Suspense } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import './DefaultLayout.scss'
import Bar from '../components/Bar/Bar'

const { Content } = Layout

const DefaultLayout: React.FC = () => {
  return (
    <Layout className="default-layout">
      <Bar />
      <Layout className="site-layout">
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
