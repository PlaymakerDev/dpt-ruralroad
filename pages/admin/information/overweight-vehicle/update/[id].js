import React, { useEffect, useMemo, useState } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import UpdateScreen from '@/features/admin/information/overweight-vehicle/update/screen'
import { useRouter } from 'next/router'
// CHECK ROLE
import { getLoginSession } from '@/utils/auth'
import { validatePermissionRoute, redirectToLogin, sessionToProps } from '@/utils/auth/routePermission'
import { wrapper, AppState } from '@/store'
import { signIn } from '@/store/features/userSlice'
import { Breadcrumb, Spin } from 'antd'

const UpdatePage = (props) => {
  const { } = props
  const { query, push } = useRouter()
  const [param, setParam] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setParam(query)
    setLoading(true);
  }, [query])



  const tabList = useMemo(() => {
    return [
      {
        key: 'stationary',
        label: 'ข้อมูลรถเข้าชั่งสถานี',
      },
      {
        key: 'wim',
        label: 'ข้อมูลรถเข้าชั่ง WIM',
      },
      {
        key: 'mobile',
        label: 'ข้อมูลหน่วยชั่งเคลื่อนที่',
      },
    ];
  }, [])

  return (
    <>
      {
        !loading ? (
          <div className='!w-full !h-screen flex justify-center items-center'>
            <Spin size="large" />
          </div > // หรือใช้ Spinner component เช่น <Spin />
        ) : param ? (
          <PageLayout breadcrumb={
            <Breadcrumb separator='>'>
              <Breadcrumb.Item className='text-gray-500'>ข้อมูล</Breadcrumb.Item>
              <Breadcrumb.Item className='text-gray-500'
                onClick={() => push({
                  pathname: '/admin/information/overweight-vehicle/overview',
                  query: {
                    type: param.stationary,
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
                    type: param?.type,
                    plan_year: param?.plan_year,
                    start_date: param?.start_date,
                    end_date: param?.end_date,
                    department_id: param?.department_id,
                    station_id: param?.station_id,
                    page: param?.page
                  }
                })}
              >
                {tabList?.find(item => item.key === param?.type)?.label}
              </Breadcrumb.Item>
              <Breadcrumb.Item className='font-bold'>ข้อมูลบันทึกจับกุม</Breadcrumb.Item>
            </Breadcrumb>
          }>
            <UpdateScreen
              id={query?.id}
              type={param?.type}
              is_arrested={param?.is_arrested}
              query={param}
            />
          </PageLayout>
        ) :
          <div className='!w-full !h-screen flex justify-center items-center'>
            <p>Data not found</p>
          </div >
      }

    </>

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

export default React.memo(UpdatePage)
