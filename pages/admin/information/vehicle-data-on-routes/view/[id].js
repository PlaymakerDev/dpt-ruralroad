import React from 'react'
import { PageLayout } from '@/components/layout'
import ViewScreen from '@/features/admin/information/vehicle-data-on-routes/view/screen'
import { useRouter } from 'next/router'

const ViewPage = (props) => {
  const { } = props
  const { query } = useRouter()

  return (
    <PageLayout>
      <ViewScreen
        id={query.id || '1'}
      />
    </PageLayout>
  )
}

export default React.memo(ViewPage)
