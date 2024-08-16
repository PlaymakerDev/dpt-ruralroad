import React from 'react'
import { PageLayout } from '@/components/layout'
import InfomationScreen from '@/features/admin/infomation/screen'

const InfomationPage = (props) => {
  const { } = props

  return (
    <PageLayout>
      <InfomationScreen />
    </PageLayout>
  )
}

export default React.memo(InfomationPage)
