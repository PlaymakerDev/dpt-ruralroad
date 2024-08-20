import React from 'react'
import { PageLayout } from '@/components/layout'
import ReportScreen from '@/features/admin/information/report/screen'

const ReportPage = (props) => {
  const { } = props

  return (
    <PageLayout>
      <ReportScreen />
    </PageLayout>
  )
}

export default React.memo(ReportPage)
