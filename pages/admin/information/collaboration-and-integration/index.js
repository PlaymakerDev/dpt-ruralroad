import React, { useMemo } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import CollaborationAndIntegrationScreen from '@/features/admin/information/collaboration-and-integration/screen'
import { Breadcrumb } from 'antd'

const CollaborationAndIntegrationPage = (props) => {
  const { } = props

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item>ข้อมูล</Breadcrumb.Item>
        <Breadcrumb.Item>การร่วมบูรณาการ</Breadcrumb.Item>
      </Breadcrumb>
    )
  }, [])

  return (
    <PageLayout
      breadcrumb={renderBreadcrumb}
    >
      <CollaborationAndIntegrationScreen />
    </PageLayout>
  )
}

export default React.memo(CollaborationAndIntegrationPage)
