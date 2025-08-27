import React, { useMemo, useState } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import OverviewScreen from '@/features/admin/information/overweight-vehicle/overview/screen'
import { Breadcrumb } from 'antd'
// CHECK ROLE
import { getLoginSession } from '@/utils/auth'
import { validatePermissionRoute, redirectToLogin, sessionToProps } from '@/utils/auth/routePermission'
import { wrapper, AppState } from '@/store'
import { signIn } from '@/store/features/userSlice'

const OverviewPage = (props) => {
  const { } = props
  const [currentStep, setCurrentStep] = useState('')

  const tabList = useMemo(() => {
    return [
      {
        key: "stationary",
        tab: "ข้อมูลรถเข้าชั่งสถานี",
      },
      {
        key: "wim",
        tab: "ข้อมูลรถเข้าชั่ง VIS",
      },
      {
        key: "mobile",
        tab: "ข้อมูลหน่วยชั่งเคลื่อนที่",
      },
    ];
  }, [])

  const findTab = useMemo(() => {
    const tab = tabList?.find(item => item.key === currentStep)?.tab
    return tab || 'รถน้ำหนักเกินหน่วยชั่ง'
  }, [currentStep, tabList])

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item className='text-gray-500'>ข้อมูล</Breadcrumb.Item>
        <Breadcrumb.Item className='text-gray-500'>รถน้ำหนักเกินหน่วยชั่ง</Breadcrumb.Item>
        <Breadcrumb.Item className='!font-bold'>{findTab}</Breadcrumb.Item>
      </Breadcrumb>
    )
  }, [findTab])

  return (
    <PageLayout
      breadcrumb={renderBreadcrumb}
    >
      <OverviewScreen
        setCurrentStep={setCurrentStep}
      />
    </PageLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => (async (context) => {
  const session = await getLoginSession(context.req)

  const valid = validatePermissionRoute(session, ['ADMIN', 'USER'])
  if (!valid) {
    return redirectToLogin()
  }

  store.dispatch(signIn(session));

  return sessionToProps(session, session?.message)
}));

export default React.memo(OverviewPage)
