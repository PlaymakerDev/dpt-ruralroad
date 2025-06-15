import React, { useEffect, useMemo } from 'react'
import { VehicleData, VehicleOnRoute } from '../card'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getItemSum/*, getTopVehicle*/, getVehicleStatus } from '@/store/features/informationSlice'
import { Spin } from 'antd'

const DetailCardSection = (props) => {
  const { data, loading } = props

  return (
    <div>
      <section>
        <VehicleData
          data={data.vehicle_count}
          loading={loading}
        />
      </section>
      <section className='mt-5'>
        <VehicleOnRoute
          data={data.roads}
          loading={loading}
        />
      </section>
    </div>
  )
}

export default React.memo(DetailCardSection)
