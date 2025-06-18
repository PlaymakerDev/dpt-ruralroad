import React, { /*useEffect,*/ useMemo } from 'react'
import { VehicleData, VehicleOnRoute } from '../card'
// import useGetAPI from '@/utils/hooks/api/useGetAPI'
// import { getItemSum, getTopVehicle, getVehicleStatus } from '@/store/features/informationSlice'
import { Spin } from 'antd'
import stf from '@/utils/stringformat'

const DetailCardSection = (props) => {
  const { data, loading } = props

  const renderVehicleOnRoute = useMemo(() => {
    if (!loading) {
      return (
        <VehicleOnRoute
          data={data.list}
          loading={loading}
        />
      )
    } else {
      return (
        <Spin spinning={loading}>
          <VehicleOnRoute
            data={data.list}
            loading={loading}
          />
        </Spin>
      )
    }
  }, [data.list, loading])

  return (
    <div>
      <section>
        <VehicleData
          data={data.total}
          loading={loading}
        />
      </section>
      <section className='mt-5'>
        <div className='card-container rounded-md flex items-center justify-between gap-1 p-2'>
          <h1 className='text-[clamp(1px, 4vw, 15px)] font-bold'>จำนวนรถเข้าชั่งรายวัน</h1>
          <p><strong>{stf(data.total.unique_vehicles).normal() || 0}</strong> คัน</p>
        </div>
      </section>
      <section className='mt-5'>
        {renderVehicleOnRoute}
      </section>
    </div>
  )
}

export default React.memo(DetailCardSection)
