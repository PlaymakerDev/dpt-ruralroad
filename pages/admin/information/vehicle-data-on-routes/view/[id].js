import React, { useMemo } from 'react'
import PageLayout from '@/components/layout/new-layout/PageLayout'
import ViewScreen from '@/features/admin/information/vehicle-data-on-routes/view/screen'
import { useRouter } from 'next/router'
import { Breadcrumb } from 'antd'

const ViewPage = (props) => {
  const { } = props
  const { query } = useRouter()

  const renderBreadcrumb = useMemo(() => {
    return (
      <Breadcrumb separator='>'>
        <Breadcrumb.Item>ข้อมูล</Breadcrumb.Item>
        <Breadcrumb.Item>ข้อมูลรถในสายทาง</Breadcrumb.Item>
      </Breadcrumb>
    )
  }, [])

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

export default React.memo(ViewPage)
