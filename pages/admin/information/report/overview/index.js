import React, { useMemo } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import ReportScreen from '@/features/admin/information/report/overview/screen'
import { Breadcrumb } from 'antd'

const ReportPage = (props) => {
  const { } = props

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item>ข้อมูล</Breadcrumb.Item>
        <Breadcrumb.Item>รายงาน</Breadcrumb.Item>
      </Breadcrumb>
    )
  }, [])

  return (
    <PageLayout
      breadcrumb={renderBreadcrumb}
    >
      <ReportScreen />
    </PageLayout>
  )
}

export default React.memo(ReportPage)
