import React, { useMemo } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import UnitEstablishmentPlanScreen from '@/features/admin/information/unit-establishment-plan/screen'
import { Breadcrumb } from 'antd'
// CHECK ROLE
import { getLoginSession } from '@/utils/auth'
import { validatePermissionRoute, redirectToLogin, sessionToProps } from '@/utils/auth/routePermission'
import { wrapper, AppState } from '@/store'
import { signIn } from '@/store/features/userSlice'

const UnitEstablishmentPlanPage = (props) => {
  const { } = props

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item className='text-gray-500'>ข้อมูล</Breadcrumb.Item>
        <Breadcrumb.Item className='font-bold'>แผนการจัดตั้งหน่วย</Breadcrumb.Item>
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

export const getServerSideProps = wrapper.getServerSideProps(store => (async (context) => {
  const session = await getLoginSession(context.req)

  const valid = validatePermissionRoute(session, ['ADMIN', 'USER'])
  if (!valid) {
    return redirectToLogin(redirectPath)
  }

  store.dispatch(signIn(session));

  return sessionToProps(session, session?.message)
}));

export default React.memo(UnitEstablishmentPlanPage)
