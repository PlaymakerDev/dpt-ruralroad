import React from 'react'
import { PageLayout } from '@/components/layout'
import UpdateScreen from '@/features/admin/information/overweight-vehicle/update/screen'
import { useRouter } from 'next/router'

const UpdatePage = (props) => {
  const { } = props
  const { query } = useRouter()

  return (
    <PageLayout>
      <UpdateScreen
        id={query.id}
      />
    </PageLayout>
  )
}

export default React.memo(UpdatePage)
