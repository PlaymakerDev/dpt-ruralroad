import React, { useEffect, useMemo, useState } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import ReportScreen from '@/features/admin/information/report/overview/screen'
import { Breadcrumb } from 'antd'
// CHECK ROLE
import { getLoginSession } from '@/utils/auth'
import { validatePermissionRoute, redirectToLogin, sessionToProps } from '@/utils/auth/routePermission'
import { wrapper, AppState } from '@/store'
import { signIn } from '@/store/features/userSlice'
import { useRouter } from 'next/router'

const INIT_CURRENT_STEP = 'central_management'

const ReportPage = (props) => {
  const { } = props
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(INIT_CURRENT_STEP)

  useEffect(() => {
    if (router?.query?.tabKey) {
      setCurrentStep(router?.query?.tabKey)
    }
  }, [router?.query?.tabKey])

  const tabList = useMemo(() => {
    return [
      {
        key: 'central_management',
        label: 'ส่วนกลางเสนอผู้บริหาร',
      },
      {
        key: 'weight_unit',
        label: 'หน่วยชั่ง ถึง ขทช.',
      },
      {
        key: 'highway_district',
        label: 'ขทช. ถึง สทช.',
      },
      {
        key: 'highway_region',
        label: 'สทช. ถึง สบร.',
      },
    ];
  }, [])

  const findTab = useMemo(() => {
    const tab = tabList?.find(item => item.key === currentStep)?.label
    return tab
  }, [currentStep, tabList])

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item className='text-gray-500'>ข้อมูล</Breadcrumb.Item>
        <Breadcrumb.Item className='text-gray-500'>รายงาน</Breadcrumb.Item>
        <Breadcrumb.Item className='font-bold'>{findTab}</Breadcrumb.Item>
      </Breadcrumb>
    )
  }, [findTab])

  return (
    <PageLayout
      breadcrumb={renderBreadcrumb}
    >
      <ReportScreen
        setCurrentStep={setCurrentStep}
        query={router?.query}
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

export default React.memo(ReportPage)
