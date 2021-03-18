import React, { Suspense } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

const DefaultLayout: React.FC = () => {
  return (
    <Layout className="default-layout">
      <Content className="app-content">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Content>
    </Layout>
  )
}

export default DefaultLayout
