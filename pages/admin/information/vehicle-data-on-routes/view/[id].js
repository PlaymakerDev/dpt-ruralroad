import React, { useMemo } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import ViewScreen from '@/features/admin/information/vehicle-data-on-routes/view/screen'
import { useRouter } from 'next/router'
import { Breadcrumb } from 'antd'
// CHECK ROLE
import { getLoginSession } from '@/utils/auth'
import { validatePermissionRoute, redirectToLogin, sessionToProps } from '@/utils/auth/routePermission'
import { wrapper, AppState } from '@/store'
import { signIn } from '@/store/features/userSlice'

const ViewPage = (props) => {
  const { } = props
  const { query, push } = useRouter()

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item className='text-gray-500'>ข้อมูล</Breadcrumb.Item>
        <Breadcrumb.Item className='text-gray-500 cursor-pointer hover:text-white transition duration-300' onClick={() => push('/admin/information/vehicle-data-on-routes/overview')}>ข้อมูลรถ GPS</Breadcrumb.Item>
        <Breadcrumb.Item className='font-bold'>รายละเอียดข้อมูลรถ</Breadcrumb.Item>
      </Breadcrumb>
    )
  }, [push])

  return (
    <PageLayout
      breadcrumb={renderBreadcrumb}
    >
      <ViewScreen
        id={query.id || '1'}
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

export default React.memo(ViewPage)
