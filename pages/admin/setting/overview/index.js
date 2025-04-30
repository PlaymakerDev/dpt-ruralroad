import React, { useMemo, useState } from 'react'
import SettingScreen from '@/features/admin/setting/overview/screen'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import { Breadcrumb } from 'antd'
// CHECK ROLE
import { getLoginSession } from '@/utils/auth'
import { validatePermissionRoute, redirectToLogin, sessionToProps } from '@/utils/auth/routePermission'
import { wrapper, AppState } from '@/store'
import { signIn } from '@/store/features/userSlice'

const SettingPage = (props) => {
  const { } = props
  const [currentStep, setCurrentStep] = useState('')

  const tabList = useMemo(() => {
    return [
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
  }, [])

  const findTab = useMemo(() => {
    const tab = tabList?.find(item => item.key === currentStep)?.tab
    return tab || 'สายทาง'
  }, [currentStep, tabList])

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item className='text-gray-500'>ตั้งค่าระบบ</Breadcrumb.Item>
        <Breadcrumb.Item className='font-bold'>{findTab}</Breadcrumb.Item>
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

export const getServerSideProps = wrapper.getServerSideProps(store => (async (context) => {
  const session = await getLoginSession(context.req)

  const valid = validatePermissionRoute(session, ['ADMIN'])
  if (!valid) {
    return redirectToLogin()
  }

  store.dispatch(signIn(session));

  return sessionToProps(session, session?.message)
}));

export default React.memo(SettingPage)
