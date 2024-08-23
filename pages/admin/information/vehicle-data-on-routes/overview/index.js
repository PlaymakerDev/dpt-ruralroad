import React, { useMemo } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import OverviewScreen from '@/features/admin/information/vehicle-data-on-routes/overview/screen'
import { Breadcrumb } from 'antd'

const OverviewPage = (props) => {
  const { } = props

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item>ข้อมูล</Breadcrumb.Item>
        <Breadcrumb.Item>ข้อมูลรถในสายทาง</Breadcrumb.Item>
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
