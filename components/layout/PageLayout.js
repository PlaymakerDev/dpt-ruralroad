import React, { useState } from 'react'
import { Layout } from 'antd'
import { PageHeader, PageSidebar } from '../layout'

const { Content } = Layout

const PageLayout = (props) => {
  const { children } = props
  const [collapsed, setCollapsed] = useState(true);

  return (
    <main>
      <Layout>
        <aside>
          <PageSidebar
            collapsed={collapsed}
          />
        </aside>
        <Layout>
          <nav>
            <PageHeader
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
          </nav>
          <Layout>
            <Content
              style={{
                padding: '2.5rem',
                backgroundColor: '#030918'
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </main>
  )
}

export default React.memo(PageLayout)
