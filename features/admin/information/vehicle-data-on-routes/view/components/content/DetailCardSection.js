import React, { useEffect, useMemo } from 'react'
import { VehicleData, RouteData } from '../card'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getRoadDetail } from '@/store/features/informationSlice'
import { getRoadDetailByRoadCode } from '@/store/features/masterSlice'
import { Spin } from 'antd'

const DetailCardSection = (props) => {
  const { data, detail, loading, loadDetail } = props

  return (
    <div>
      <section>
        <VehicleData
          data={data.vehicle_count}
          loading={loading}
        />
      </section>
      <section className='mt-5'>
        <RouteData
          data={detail}
          loading={loadDetail}
        />
      </section>
    </div>
  )
}

export default React.memo(DetailCardSection)
