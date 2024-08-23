import React from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import PreviewScreen from '@/features/admin/vehicle-weight/preview/screen'

const PreviewPage = (props) => {
  const { } = props

  return (
    <PageLayout>
      <PreviewScreen />
    </PageLayout>
  )
}

export default React.memo(PreviewPage)
