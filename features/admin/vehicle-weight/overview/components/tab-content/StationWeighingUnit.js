import React, { useCallback, useEffect, useMemo, useState, useContext , createContext } from 'react'
import { FormSearchStation } from '../form'
import { TableStation } from '../table'
import { TableWeightDetail } from '../detail'
import { ModalWeightDetail } from '../modal'
// API
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getStation, getWeightStationLog, getWeightStationLogDetail, clearStation, clearWeightStationLog } from '@/store/features/vehicleWeightSlice'
import { getStationDetail, getStation as getMasterStation } from '@/store/features/masterSlice'
import dayjs from 'dayjs'
// import { useReducer } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { PageContext } from '@/pages/admin/vehicle-weight/overview'

const INIT_MODAL = { open: false }
const INIT_DETAIL_PROPS = { start_date: '', end_date: '', station_id: '' }

export const DateContext = createContext();

const StationWeighingUnit = (props) => {
  const { tabKey, setCurrentStep } = props
  // STATE
  // const [step, setStep] = useState(1)
  const [open, setOpen] = useState(INIT_MODAL)
  const [detailProps, setDetailProps] = useState(INIT_DETAIL_PROPS)
  const [dateRange, setDateRange] = useState([dayjs().format("YYYY-MM-DD"),dayjs().format("YYYY-MM-DD")]);
  // REDUCER
  // const [state, dispatch] = useReducer()
  const dispatch = useAppDispatch()
  // USE CONTEXT
  const { step, setStep } = useContext(PageContext)

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getStation, reducerName: 'vehicleWeight', reducerKey: 'station'
  })

  const [apiGetDetailTable, loadingDetailTable, detailTable] = useGetAPI('overlay', {
    funcDispatch: getWeightStationLog, reducerName: 'vehicleWeight', reducerKey: 'station'
  })

  const [apiGetDetailModal, loadingDetailModal, detailModal] = useGetAPI('overlay', {
    funcDispatch: getWeightStationLogDetail, reducerName: 'vehicleWeight', reducerKey: 'station'
  })

  const [apiGetMasterStationDetail, loadingMasterStationDetail, masterStationDetail] = useGetAPI('overlay', {
    funcDispatch: getStationDetail, reducerName: 'master', reducerKey: 'station'
  })

  const [apiGetMasterStation, loadingMasterStation, masterStation] = useGetAPI('overlay', {
    funcDispatch: getMasterStation, reducerName: 'master', reducerKey: 'station'
  })

  useEffect(() => {
    if (tabKey === 'station' && step === 1) {
      apiGetData(`/api/v1/weight/station_daily`, {
        ...data.overview.search,
        start_date: dayjs(dateRange[0]).format('YYYY-MM-DD'),
        end_date: dayjs(dateRange[1]).format('YYYY-MM-DD'),
        station_id: '',
        page: 1
      }, false, {})
      apiGetMasterStation('/api/v1/masters/station', {}, false, {})
    }
    if (tabKey === 'station' && step === 2) {
      dispatch(clearWeightStationLog())
      apiGetDetailTable(`/api/v1/weight/weight_station_log`, {
        ...detailTable.detail.table.search,
        start_date: dayjs(detailProps.start_date).format('YYYY-MM-DD'),
        end_date: dayjs(detailProps.end_date).format('YYYY-MM-DD'),
        station: detailProps.station_id,
        page: 1
      }, false, {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabKey, step, detailProps])

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

  // const openModalWithData = useCallback(async (record) => {
  //   const responseModal = await apiGetDetailModal(`/api/v1/weight/weight_station_log/${record.td_id}`, {}, false, {})
  //   if (responseModal?.success) {
  //     const response = await apiGetMasterStationDetail(`/api/v1/masters/station/${record.station_id}`, {}, false, {})
  //     if (response?.success) {
  //       setOpen({
  //         open: true,
  //         info: {
  //           log: responseModal?.data,
  //           master: response?.data
  //         }
  //       })
  //     }
  //   }
  // }, [apiGetDetailModal, apiGetMasterStationDetail])

  const onChangePage = useCallback((page, perPage) => {
    if (tabKey === 'station' && step === 1) {
      apiGetData(`/api/v1/weight/station_daily`, { ...data.overview.search, page: page, page_size: perPage }, false, {})
    }
    if (tabKey === 'station' && step === 2) {
      apiGetDetailTable(`/api/v1/weight/weight_station_log`, { ...detailTable.detail.table.search, page: page, page_size: perPage }, false, {})
    }
  }, [data.overview.search, detailTable.detail.table.search, apiGetData, apiGetDetailTable, tabKey, step])

  const clearData = useCallback(() => {
    apiGetData(`/api/v1/weight/station_daily`, {
      ...data.overview.search,
      start_date: dayjs().format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      station_id: '',
      page: 1,
      page_size: 10
    }, false, {})
    dispatch(clearStation(data.overview.search))
  }, [data, apiGetData, dispatch])

  const getDetail = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <>
            <section>
              <FormSearchStation
                initialValues={data.overview.search}
                apiGetData={apiGetData}
                clearData={clearData}
                dateRange={dateRange}
                // MASTER DATA
                station={masterStation}
              />
            </section>
            <section className='mt-5'>
              <TableStation
                // API DATA
                data={data.overview.data}
                loading={loading}
                // PAGE API
                page={data.overview.search.page}
                perPage={data.overview.search.page_size}
                total={data.overview.meta.total}
                onChange={onChangePage}
                // PAGE STATE
                step={step}
                setStep={setStep}
                setCurrentStep={setCurrentStep}
                setDetailProps={setDetailProps}
              />
            </section>
          </>
        )
      case 2:
        return (
          <TableWeightDetail
            // API DATA
            data={detailTable.detail.table.data}
            loading={loadingDetailTable}
            // PAGE API
            page={detailTable.detail.table.search.page}
            perPage={detailTable.detail.table.search.page_size}
            total={detailTable.detail.table.meta?.total || 0}
            onChange={onChangePage}
            // PAGE STATE
            setStep={setStep}
            setCurrentStep={setCurrentStep}
            // MODAL STATE
            setOpen={setOpen}
            openModalWithData={openModalWithData}
          />
        )
      default:
        return null;
    }
  }, [step, setStep, setCurrentStep, data, loading, detailTable, loadingDetailTable, onChangePage, clearData, apiGetData, openModalWithData, masterStation, dateRange])

  return (
    <DateContext.Provider value={{ setDateRange }}>
    <div>
      {getDetail}
      <ModalWeightDetail
        open={open.open}
        info={open.info}
        setOpen={setOpen}
      />
    </div>
    </DateContext.Provider>
  )
}

export default React.memo(StationWeighingUnit)
