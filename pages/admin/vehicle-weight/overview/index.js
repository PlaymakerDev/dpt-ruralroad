import React, { useMemo, useState } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import VehicleWeightScreen from '@/features/admin/vehicle-weight/overview/screen'
import { Breadcrumb } from 'antd'

const VehicleWeightPage = (props) => {
  const { } = props
  const [currentStep, setCurrentStep] = useState('')

  const tabList = [
    {
      key: "station",
      tab: "ข้อมูลรถเข้าชั่งสถานี",
    },
    {
      key: "wim",
      tab: "ข้อมูลรถเข้าชั่ง WIM",
    },
    {
      key: "mobile",
      tab: "ข้อมูลหน่วยชั่งเคลื่อนที่",
    },
    {
      key: "summary",
      tab: "สรุปข้อมูลเข้าชั่ง",
    },
  ];

  const findTab = useMemo(() => {
    const tab = tabList?.find(item => item.key === currentStep)?.tab
    return tab || 'ข้อมูลรถเข้าชั่งสถานี'
  }, [currentStep])

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item>ข้อมูลรถเข้าชั่ง</Breadcrumb.Item>
        <Breadcrumb.Item>{findTab}</Breadcrumb.Item>
      </Breadcrumb>
    )
  }, [findTab])

  return (
    <PageLayout
      breadcrumb={renderBreadcrumb}
    >
      <VehicleWeightScreen
        setCurrentStep={setCurrentStep}
      />
    </PageLayout>
  )
}

export default React.memo(VehicleWeightPage)
