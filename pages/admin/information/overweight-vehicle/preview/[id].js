import React, { useContext, useMemo } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import PreviewScreen from '@/features/admin/information/overweight-vehicle/preview/screen'
import { useRouter } from 'next/router'
// CHECK ROLE
import { getLoginSession } from '@/utils/auth'
import { validatePermissionRoute, redirectToLogin, sessionToProps } from '@/utils/auth/routePermission'
import { wrapper, AppState } from '@/store'
import { signIn } from '@/store/features/userSlice'
import { Breadcrumb } from 'antd'
import { OverWeightVehicleTab } from '@/pages/_app'

const PreviewPage = (props) => {
  const { key } = props
  const { query, push } = useRouter()

  const tabList = useMemo(() => {
    return [
      {
        key: 'stationary',
        label: 'ข้อมูลรถเข้าชั่งสถานี',
      },
      {
        key: 'wim',
        label: 'ข้อมูลรถเข้าชั่ง VIS',
      },
      {
        key: 'mobile',
        label: 'ข้อมูลหน่วยชั่งเคลื่อนที่',
      },
    ];
  }, [])

  // const { vehicleMenuTab, setVehicleMenuTab } = useContext(OverWeightVehicleTab);

  const findTab = useMemo(() => {
    const tab = tabList?.find(item => item.key === query.type)?.label
    return tab
  }, [tabList])

  const renderBreadcrumb = useMemo(() => {
    //     ข้อมูล > รถน้ำหนักเกินหน่วยชั่ง > 
    // ข้อมูลรถเข้าชั่งสถานี > รายงาน

    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item className='text-gray-500'>ข้อมูล</Breadcrumb.Item>
        <Breadcrumb.Item className='text-gray-500'
          onClick={() => push({
            pathname: '/admin/information/overweight-vehicle/overview',
            query: {
              type: query.stationary,
            }
          })}
        >
          รถน้ำหนักเกินหน่วยชั่ง
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className='text-gray-500 cursor-pointer hover:text-white transition duration-300'
          onClick={() => push({
            pathname: '/admin/information/overweight-vehicle/overview',
            query: {
              type: query.type,
              plan_year: query.plan_year,
              start_date: query.start_date,
              end_date: query.end_date,
              department_id: query.department_id,
              station_id: query.station_id,
              page: query.page
            }
          })}
        >
          {findTab}
        </Breadcrumb.Item>
        <Breadcrumb.Item className='font-bold'>รายงาน</Breadcrumb.Item>
      </Breadcrumb>
    )
  }, [findTab, query, push])

  return (
    <PageLayout
      breadcrumb={renderBreadcrumb}
    >
      {query.id ?
        <PreviewScreen
          id={query.id}
        /> : null}
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


export default React.memo(PreviewPage)
