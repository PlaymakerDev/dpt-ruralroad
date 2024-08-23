import React, { useMemo } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import OverviewScreen from '@/features/admin/information/overweight-vehicle/overview/screen'
import { Breadcrumb } from 'antd'

const OverviewPage = (props) => {
  const { } = props

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item>ข้อมูล</Breadcrumb.Item>
        <Breadcrumb.Item>รถน้ำหนักเกินหน่วยชั่ง</Breadcrumb.Item>
      </Breadcrumb>
    )
  }, [])

  return (
    <PageLayout
      breadcrumb={renderBreadcrumb}
    >
      <OverviewScreen />
    </PageLayout>
  )
}

export default React.memo(OverviewPage)
