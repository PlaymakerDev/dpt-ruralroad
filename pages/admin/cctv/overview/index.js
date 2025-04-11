import React, { useEffect, useMemo } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import OverviewScreen from '@/features/admin/cctv/overview/screen'
import { Breadcrumb } from 'antd'
import { useRouter } from 'next/router'
// CHECK ROLE
import { getLoginSession } from '@/utils/auth'
import { validatePermissionRoute, redirectToLogin, sessionToProps } from '@/utils/auth/routePermission'
import { wrapper, AppState } from '@/store'
import { signIn } from '@/store/features/userSlice'

const OverviewPage = (props) => {
  const { } = props
  const router = useRouter()

  useEffect(() => {
    if (router?.query?.state) {
      router.reload()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item className='font-bold'>รายละเอียดจุดการติดตั้ง</Breadcrumb.Item>
      </Breadcrumb>
    )
  }, [])

  return (
    <PageLayout
      breadcrumb={renderBreadcrumb}
    >
      <OverviewScreen
        clear={router.query.state}
      />
    </PageLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => (async (context) => {
  const [session, redirectPath] = await getLoginSession(context.req, context.res)

  const valid = validatePermissionRoute(session, ['ADMIN','USER'])
  if (!valid) {
    return redirectToLogin(redirectPath)
  }
  

  store.dispatch(signIn(session));

  return sessionToProps(session, session?.message)
}));

export default React.memo(OverviewPage)
