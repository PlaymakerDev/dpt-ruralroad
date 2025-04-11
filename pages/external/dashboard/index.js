import React from 'react'
import PageLayout from '@/components/layout/external-layout/PageLayout'
import DashboardScreen from '@/features/external/dashboard/screen'
import { useRouter } from 'next/router'

const DashboardPage = (props) => {
  const { } = props
  const router = useRouter()

  return (
    <PageLayout>
      <DashboardScreen
        query={router.query}
      />
    </PageLayout>
  )
}

export default React.memo(DashboardPage)
