import React from 'react'
import { PageLayout } from '@/components/layout'
import UnitEstablishmentPlanScreen from '@/features/admin/information/unit-establishment-plan/screen'

const UnitEstablishmentPlanPage = (props) => {
  const { } = props

  return (
    <PageLayout>
      <UnitEstablishmentPlanScreen />
    </PageLayout>
  )
}

export default React.memo(UnitEstablishmentPlanPage)
