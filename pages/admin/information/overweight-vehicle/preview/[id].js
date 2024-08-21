import React from 'react'
import { PageLayout } from '@/components/layout'
import PreviewScreen from '@/features/admin/information/overweight-vehicle/preview/screen'
import { useRouter } from 'next/router'

const PreviewPage = (props) => {
  const { } = props
  const { query } = useRouter()

  return (
    <PageLayout>
      <PreviewScreen
        id={query.id}
      />
    </PageLayout>
  )
}

export default React.memo(PreviewPage)
