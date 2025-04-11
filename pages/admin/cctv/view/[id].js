import React, { useMemo, createContext, useState } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import ViewScreen from '@/features/admin/cctv/view/screen'
import { Breadcrumb } from 'antd'
import { useRouter } from 'next/router'
// CHECK ROLE
import { getLoginSession } from '@/utils/auth'
import { validatePermissionRoute, redirectToLogin, sessionToProps } from '@/utils/auth/routePermission'
import { wrapper, AppState } from '@/store'
import { signIn } from '@/store/features/userSlice'

export const PageContext = createContext(null)

const ViewPage = (props) => {
  const { } = props
  const router = useRouter()
  const [menuName, setMenuName] = useState('')

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item
          className='text-gray-500 cursor-pointer hover:text-white transition duration-300'
          onClick={() => router.push({
            pathname: '/admin/cctv/overview',
            query: {
              state: 'clear'
            }
          }, '/admin/cctv/overview')}
        >
          รายละเอียดจุดการติดตั้ง
        </Breadcrumb.Item>
        <Breadcrumb.Item className='text-gray-500 cursor-pointer hover:text-white transition duration-300'
          onClick={() => {
            router.push('/admin/cctv/overview')
          }}>
          {menuName}
        </Breadcrumb.Item>
        <Breadcrumb.Item className='font-bold'>รายละเอียด</Breadcrumb.Item>
      </Breadcrumb>
    )
  }, [menuName, router])

  return (
    <PageLayout
      breadcrumb={renderBreadcrumb}
    >
      <PageContext.Provider value={{ setMenuName }}>
        <ViewScreen
          id={router.query.id}
          department_id={router.query.department_id}
          station_id={router.query.station_id}
          original_station_type={router.query.original_station_type}
        />
      </PageContext.Provider>
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

export default React.memo(ViewPage)
