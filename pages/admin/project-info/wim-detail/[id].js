import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import WIMDetailScreen from '@/features/admin/project-info/wim-detail/screen'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import { Breadcrumb } from 'antd'

const WIMDetailPage = (props) => {
  const { } = props
  const router = useRouter()

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item
          className='text-gray-500 cursor-pointer hover:text-white transition duration-300'
          onClick={() => router.push('/admin/dashboard')}
        >
          หน้าหลัก
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className='text-gray-500 cursor-pointer hover:text-white transition duration-300'
          onClick={() => router.back()}
        >
          {router?.query?.prev_name || '-'}
        </Breadcrumb.Item>
        <Breadcrumb.Item className='font-bold'>รายละเอียด</Breadcrumb.Item>
      </Breadcrumb>
    )
  }, [router])

  return (
    <PageLayout
      breadcrumb={renderBreadcrumb}
    >
      <WIMDetailScreen
        stationId={router?.query?.id}
      />
    </PageLayout>
  )
}

export default React.memo(WIMDetailPage)
