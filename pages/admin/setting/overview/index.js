import React, { useMemo, useState } from 'react'
import SettingScreen from '@/features/admin/setting/overview/screen'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import { Breadcrumb } from 'antd'

const SettingPage = (props) => {
  const { } = props
  const [currentStep, setCurrentStep] = useState('')

  const tabList = [
    {
      key: "trollway",
      tab: "สายทาง",
    },
    {
      key: "cargo",
      tab: "สิ่งของบรรทุก",
    },
    {
      key: "role",
      tab: "ตำแหน่งงาน",
    },
    {
      key: "user",
      tab: "ผู้ใช้งาน",
    },
  ];

  const findTab = useMemo(() => {
    const tab = tabList?.find(item => item.key === currentStep)?.tab
    return tab || 'สายทาง'
  }, [currentStep])

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item>ตั้งค่าระบบ</Breadcrumb.Item>
        <Breadcrumb.Item>{findTab}</Breadcrumb.Item>
      </Breadcrumb>
    )
  }, [findTab])

  return (
    <PageLayout
      breadcrumb={renderBreadcrumb}
    >
      <SettingScreen
        setCurrentStep={setCurrentStep}
      />
    </PageLayout>
  )
}

export default React.memo(SettingPage)
