import React from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import DashboardScreen from '@/features/admin/dashboard/screen'

const DashboardPage = (props) => {
  const { } = props

  return (
    <PageLayout>
      <DashboardScreen />
    </PageLayout>
  )
}

export default React.memo(DashboardPage)
