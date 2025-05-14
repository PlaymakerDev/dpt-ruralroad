import React, { useMemo, useState, useEffect, useCallback, useContext, createContext } from 'react'
import { FormSearchStationDetail } from '../components'
// API
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getWeightWIMLog, getWeightWIMLogDetail, clearWIMDetail, getStation, getWeightStationLog, getWeightStationLogDetail } from '@/store/features/vehicleWeightSlice'
import dayjs from 'dayjs'
import { ModalWIMDetail } from '@/features/admin/vehicle-weight/overview/components/modal'
import { TableWeightDetail } from '@/features/admin/vehicle-weight/overview/components/detail'
import { useAppDispatch } from '@/store/hooks'
import { getStationDetail } from '@/store/features/masterSlice'

const INIT_MODAL = { open: false }

const StationDetailScreen = (props) => {
  const { stationId } = props
  const [open, setOpen] = useState(INIT_MODAL)
  const dispatch = useAppDispatch()

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getStation, reducerName: 'vehicleWeight', reducerKey: 'station'
  })

  const [apiGetDetailTable, loadingDetailTable, detailTable] = useGetAPI('overlay', {
    funcDispatch: getWeightStationLog, reducerName: 'vehicleWeight', reducerKey: 'station'
  })

  const [apiGetDetailModal, loadingDetailModal, detailModal] = useGetAPI('overlay', {
    funcDispatch: getWeightStationLogDetail, reducerName: 'vehicleWeight', reducerKey: 'station'
  })

  // const [apiGetMasterStationDetail, loadingMasterStationDetail, masterStationDetail] = useGetAPI('overlay', {
  //   funcDispatch: getStationDetail, reducerName: 'master', reducerKey: 'station'
  // })

  // const [apiGetMasterStation, loadingMasterStation, masterStation] = useGetAPI('overlay', {
  //   funcDispatch: apiGetMasterStation, reducerName: 'master', reducerKey: 'station'
  // })

  console.log(stationId)

  useEffect(() => {
    if (stationId) {
      apiGetDetailTable(`/api/v1/weight/weight_station_log`, {
        ...detailTable.detail.table.search,
        start_date: dayjs().format('YYYY-MM-DD'),
        end_date: dayjs().format('YYYY-MM-DD'),
        station: stationId,
        page: 1
      }, false, {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationId])

  const openModalWithData = useCallback(async (record) => {
    const responseModal = await apiGetDetailModal(`/api/v1/weight/weight_station_log/${record.td_id}`, {}, false, {})
    if (responseModal?.success) {
      setOpen({
        open: true,
        info: {
          log: responseModal?.data,
        }
      })
    }
  }, [apiGetDetailModal])

  const onChangePage = useCallback((page, perPage) => {
    apiGetDetailTable(`/api/v1/weight/weight_station_log`, { ...detailTable.detail.table.search, page: page, page_size: perPage }, false, {})
  }, [detailTable.detail.table.search, apiGetDetailTable])

  const clearData = useCallback(() => {
    apiGetDetailTable(`/api/v1/weight/weight_station_log`, {
      ...detailTable.detail.table.search,
      start_date: dayjs().format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      station: stationId,
      page: 1,
      page_size: 10
    }, false, {})
    dispatch(clearWIMDetail(detailTable.detail.table.search))
  }, [detailTable, apiGetDetailTable, dispatch])
  return (
    <div>
      <section>
        <FormSearchStationDetail
          initialValues={detailTable.detail.table.search}
          apiGetData={apiGetDetailTable}
          stationId={stationId}
          clearData={clearData}
        />
      </section>
      <section className='mt-5'>
        <TableWeightDetail
          // API DATA
          data={detailTable.detail.table.data}
          loading={loadingDetailTable}
          // PAGE API
          page={detailTable.detail.table.search.page}
          perPage={detailTable.detail.table.search.page_size}
          total={detailTable.detail.table.meta?.total || 0}
          onChange={onChangePage}
          // MODAL STATE
          setOpen={setOpen}
          openModalWithData={openModalWithData}
        />
      </section>
      <ModalWIMDetail
        open={open.open}
        info={open.info}
        setOpen={setOpen}
      />
    </div>
  )
}

export default React.memo(StationDetailScreen)
