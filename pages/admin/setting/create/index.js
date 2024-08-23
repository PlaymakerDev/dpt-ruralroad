import React from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import CreateScreen from '@/features/admin/setting/create/screen'

const CreatePage = (props) => {
  const { } = props

  return (
    <PageLayout>
      <CreateScreen />
    </PageLayout>
  )
}

export default React.memo(CreatePage)
