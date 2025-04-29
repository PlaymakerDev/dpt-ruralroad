import React, { useState } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import PreviewScreen from '@/features/admin/information/report/preview/screen'
import { useRouter } from 'next/router'
import { Breadcrumb } from 'antd'
import { useMemo } from 'react'
// CHECK ROLE
import { getLoginSession } from '@/utils/auth'
import { validatePermissionRoute, redirectToLogin, sessionToProps } from '@/utils/auth/routePermission'
import { wrapper, AppState } from '@/store'
import { signIn } from '@/store/features/userSlice'

const PreviewPage = (props) => {
  const { id, key } = props
  const { query, push } = useRouter()
  const [currentStep, setCurrentStep] = useState('')

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
    const tab = tabList?.find(item => item.key === query?.tabKey)?.label
    return tab
  }, [query, tabList])

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item className='text-gray-500'>ข้อมูล</Breadcrumb.Item>
        <Breadcrumb.Item className='text-gray-500'>รายงาน</Breadcrumb.Item>
        <Breadcrumb.Item
          className='text-gray-500 cursor-pointer hover:text-white transition duration-300'
          onClick={() => push({
            pathname: '/admin/information/report/overview',
            query: {
              tabKey: query?.tabKey
            }
          })}
        >
          {findTab}
        </Breadcrumb.Item>
        <Breadcrumb.Item className='font-bold'>{query?.description}</Breadcrumb.Item>
      </Breadcrumb>
    )
  }, [findTab, query, push])


  return (

    <PageLayout
      breadcrumb={renderBreadcrumb}
    >
      {!!query.id && (
        <PreviewScreen
          id={query.id}
          description={query.description}
        />
      )}
    </PageLayout>
    // </PageContext.Provider>
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

export default React.memo(PreviewPage)
