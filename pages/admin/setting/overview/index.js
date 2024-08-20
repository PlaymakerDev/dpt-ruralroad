import React from 'react'
import { PageLayout } from '@/components/layout'
import SettingScreen from '@/features/admin/setting/overview/screen'

const SettingPage = (props) => {
  const { } = props

  return (
    <PageLayout>
      <SettingScreen />
    </PageLayout>
  )
}

export default React.memo(SettingPage)
