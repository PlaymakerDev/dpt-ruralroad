import React from 'react'
import { PageLayout } from '@/components/layout'
import OverviewScreen from '@/features/admin/information/vehicle-data-on-routes/overview/screen'

const OverviewPage = (props) => {
  const { } = props

  return (
    <PageLayout>
      <OverviewScreen />
    </PageLayout>
  )
}

export default React.memo(OverviewPage)
