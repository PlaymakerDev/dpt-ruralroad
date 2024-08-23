import React, { useMemo } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import UnitEstablishmentPlanScreen from '@/features/admin/information/unit-establishment-plan/screen'
import { Breadcrumb } from 'antd'

const UnitEstablishmentPlanPage = (props) => {
  const { } = props

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item>ข้อมูล</Breadcrumb.Item>
        <Breadcrumb.Item>แผนการจัดตั้งหน่วย</Breadcrumb.Item>
      </Breadcrumb>
    )
  }, [])

  return (
    <PageLayout
      breadcrumb={renderBreadcrumb}
    >
      <UnitEstablishmentPlanScreen />
    </PageLayout>
  )
}

export default React.memo(UnitEstablishmentPlanPage)
