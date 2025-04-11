import React, { useEffect, useMemo } from 'react'
import { VehicleData, VehicleOnRoute } from '../card'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getItemSum/*, getTopVehicle*/, getVehicleStatus } from '@/store/features/informationSlice'
import { Spin } from 'antd'

const DetailCardSection = (props) => {
  const { } = props

  const [apiGetItemSum, loadItemSum, itemSum] = useGetAPI('overlay', {
    funcDispatch: getItemSum, reducerName: 'information', reducerKey: 'vehicle_data_on_routes'
  })

  useEffect(() => {
    apiGetItemSum('/api/v1/info/current_vehicle_status/itemsSum', { ...itemSum.item_sum.search, page: 1, page_size: 20 }, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderVehicleData = useMemo(() => {
    if (!loadItemSum) {
      return (
        <VehicleData
          data={itemSum.item_sum.data}
        />
      )
    } else {
      return <Spin spinning={loadItemSum} />
    }
  }, [itemSum, loadItemSum])

  // const renderTopVehicle = useMemo(() => {
  //   if (!loadTopVehicle) {
  //     return (
  //       <VehicleOnRoute
  //         data={topVehicle.top_vehicle.data}
  //       />
  //     )
  //   } else {
  //     return <Spin spinning={loadTopVehicle} />

  //   }
  // }, [topVehicle, loadTopVehicle])

  const renderTopVehicle = useMemo(() => {
    if (!loadItemSum) {
      return (
        <VehicleOnRoute
          data={itemSum.item_sum.data.items}
        />
      )
    } else {
      return <Spin spinning={loadItemSum} />

    }
  }, [itemSum, loadItemSum])

  return (
    <div>
      <section>
        {renderVehicleData}
      </section>
      <section className='mt-5'>
        {renderTopVehicle}
      </section>
    </div>
  )
}

export default React.memo(DetailCardSection)
