import React, { Suspense } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

const { Content } = Layout

const DefaultLayout: React.FC = () => {
  return (
    <Layout className="default-layout">
      <Content className="app-content">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Content>
      <Footer />
    </Layout>
  )
}

export default DefaultLayout
