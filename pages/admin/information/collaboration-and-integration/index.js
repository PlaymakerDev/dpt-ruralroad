import React from 'react'
import CollaborationAndIntegrationScreen from '@/features/admin/information/collaboration-and-integration/screen'
import { PageLayout } from '@/components/layout'

const CollaborationAndIntegrationPage = (props) => {
  const { } = props

  return (
    <PageLayout>
      <CollaborationAndIntegrationScreen />
    </PageLayout>
  )
}

export default React.memo(CollaborationAndIntegrationPage)
