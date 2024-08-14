import React from 'react'
import DashboardScreen from '@/features/admin/dashboard/screen'
import { Layout } from '@/components/layout'

const DashboardPage = (props) => {
  const { } = props

  return (
    <Layout>
      <DashboardScreen />
    </Layout>
  )
}

export default React.memo(DashboardPage)
