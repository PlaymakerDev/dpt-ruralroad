import React from 'react'
import { PageLayout } from '@/components/layout'
import VehicleWeightScreen from '@/features/admin/vehicle-weight/screen'

const VehicleWeightPage = (props) => {
  const { } = props

  return (
    <PageLayout>
      <VehicleWeightScreen />
    </PageLayout>
  )
}

export default React.memo(VehicleWeightPage)
