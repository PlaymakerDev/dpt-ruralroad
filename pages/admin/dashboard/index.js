import React from 'react'
import DashboardScreen from '@/features/admin/dashboard/screen'
import { PageLayout } from '@/components/layout'

const DashboardPage = (props) => {
  const { } = props

  return (
    <PageLayout>
      <DashboardScreen />
    </PageLayout>
  )
}

export default React.memo(DashboardPage)
