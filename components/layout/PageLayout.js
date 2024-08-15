import React from 'react'
import { Layout } from 'antd'
import { PageHeader, PageSidebar } from '../layout'
import styles from '@/styles/components/layout/Layout.module.css'

const { Content } = Layout

const PageLayout = (props) => {
  const { children } = props

  return (
    <main>
      <Layout>
        <aside className={styles.sidebar}>
          <PageSidebar />
        </aside>
        <Layout>
          <nav className={styles.navbar}>
            <PageHeader />
          </nav>
          <Layout>
            <Content
              style={{
                padding: '2.5rem',
                backgroundColor: '#000000'
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
