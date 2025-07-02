import React, { useMemo, useState, createContext, useCallback, useEffect } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import VehicleWeightScreen from '@/features/admin/vehicle-weight/overview/screen'
import { Breadcrumb } from 'antd'
import { useRouter } from 'next/router'
// CHECK ROLE
import { getLoginSession } from '@/utils/auth'
import { validatePermissionRoute, redirectToLogin, sessionToProps } from '@/utils/auth/routePermission'
import { wrapper, AppState } from '@/store'
import { signIn } from '@/store/features/userSlice'

const INIT_STEP = { step: '', in_detail: false }

export const PageContext = createContext(null)

const VehicleWeightPage = (props) => {
  const { } = props
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [currentStep, setCurrentStep] = useState(INIT_STEP)
  const [prevQuery, setPrevQuery] = useState(null)

  useEffect(() => {
    if (!router?.query) return

    setPrevQuery(router?.query)
  }, [router?.query])

  useEffect(() => {
    if (!router.isReady) {
      return
    }
  }, [router])

  const tabList = useMemo(() => {
    return [
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
  }, [])

  const updateStep = useCallback(() => {
    setStep(step - 1)
    setCurrentStep((prev) => ({
      ...prev,
      in_detail: false
    }))
  }, [step])

  const findTab = useMemo(() => {
    const tab = tabList?.find(item => item.key === currentStep.step)?.tab
    return tab || 'ข้อมูลรถเข้าชั่งสถานี'
  }, [currentStep, tabList])

  const renderBreadcrumb = useMemo(() => {
    if (currentStep.in_detail) {
      return (
        <Breadcrumb separator='>'>
          <Breadcrumb.Item className='text-gray-500'>ข้อมูลรถเข้าชั่ง</Breadcrumb.Item>
          <Breadcrumb.Item className='text-gray-500 cursor-pointer hover:text-white transition duration-300' onClick={() => updateStep()}>{findTab}</Breadcrumb.Item>
          <Breadcrumb.Item className='font-bold'>รายละเอียด</Breadcrumb.Item>
        </Breadcrumb>
      )
    }
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item className='text-gray-500'>ข้อมูลรถเข้าชั่ง</Breadcrumb.Item>
        <Breadcrumb.Item className='font-bold'>{findTab}</Breadcrumb.Item>
      </Breadcrumb>
    )
  }, [findTab, currentStep, updateStep])

  return (
    <PageLayout
      breadcrumb={renderBreadcrumb}
    >
      <PageContext.Provider value={{ step, setStep, prevQuery }}>
        <VehicleWeightScreen
          setCurrentStep={setCurrentStep}
          tabBar={router?.query?.key}
        />
      </PageContext.Provider>
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

export default React.memo(VehicleWeightPage)