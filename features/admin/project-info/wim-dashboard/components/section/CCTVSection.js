import React, { useEffect, useMemo } from 'react'
import { CCTVListing } from '../cctv'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getList, getStationSum } from '@/store/features/cctvSlice'
import { Radio, Spin } from 'antd'
import CCTVIconMenu from '@/components/icon/CCTVIconMenu'
import { Failed, Success } from '@/components/icon'

const CCTVSection = (props) => {
  const { stationId } = props

  const elemProps = {
    className: 'flex flex-col items-center justify-between'
  }

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getList, reducerName: 'cctv', reducerKey: 'list'
  })

  const [apiGetStation, loadStation, station] = useGetAPI('overlay', {
    funcDispatch: getStationSum, reducerName: 'cctv', reducerKey: 'station_sum'
  })

  useEffect(() => {
    if (stationId) {
      apiGetData('/api/v1/cctv/list', {
        ...data.search,
        page_size: 100,
        // department_id: id,
        station_id: stationId
        // department_id: 66,
        // station_id: 4
      }, false)

      apiGetStation(`/api/v1/cctv/station_sum/${stationId}/wim`)
      // apiGetStation(`/api/v1/cctv/station_sum/4/wim`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationId])

  const renderCCTVListing = useMemo(() => {
    if (!loading) {
      return (
        <CCTVListing
          data={data.data}
        />
      )
    } else {
      return <Spin spinning={loading} />
    }
  }, [loading, data])

  // const renderCCTVStatus = useMemo(() => {
  //   if (!loadStation) {
  //     return (
  //       <section className='flex flex-wrap justify-center lg:justify-end items-end h-full gap-5'>
  //         <div {...elemProps}>
  //           <CCTVIconMenu width={22} height={20} className='mx-auto' />
  //           <p className='text-[clamp(1px, 4vw, 15px)] font-bold'>กล้องทั้งหมด {station.data.total_cameras || 0}</p>
  //         </div>
  //         <div {...elemProps}>
  //           <Success width={20} height={20} className='mx-auto' />
  //           <p className='text-[clamp(1px, 4vw, 15px)] font-bold text-[#22c55e]'>กล้องออนไลน์ {station.data.online_cameras || 0}</p>
  //         </div>
  //         <div {...elemProps}>
  //           <Failed width={20} height={20} className='mx-auto' />
  //           <p className='text-[clamp(1px, 4vw, 15px)] font-bold text-[#FF4A4A]'>กล้องออฟไลน์ {station.data.offline_cameras || 0}</p>
  //         </div>
  //       </section>
  //     )
  //   } else {
  //     return (
  //       <Spin spinning={loadStation} />
  //     )
  //   }
  // }, [loadStation, station])


  return (
    <div className={`h-[23rem] overflow-auto overflow-x-hidden ${data?.data?.length > 4 ? 'pr-3' : ''}`}>
      {renderCCTVListing}
    </div>
  )
}

export default React.memo(CCTVSection)
