import React, { useMemo, useState, useEffect, useCallback, useContext, createContext } from 'react'
import { FormSearchWIM } from '../form'
import { TableWIM } from '../table'
import { TableWIMDetail } from '../detail'
import { ModalWIMDetail } from '../modal'
// API
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getWIM, getWeightWIMLog, getWeightWIMLogDetail, clearWIM } from '@/store/features/vehicleWeightSlice'
import { getWIM as getMasterWIM, getStationDetail } from '@/store/features/masterSlice'
import dayjs from 'dayjs'
import { useAppDispatch } from '@/store/hooks'
import { PageContext } from '@/pages/admin/vehicle-weight/overview'

const INIT_MODAL = { open: false }
const INIT_DETAIL_PROPS = { start_date: '', end_date: '', station_id: '' }

export const DateContext = createContext();

const WIMWeighingUnit = (props) => {
  const { tabKey, setCurrentStep } = props
  // const [step, setStep] = useState(1)
  const [open, setOpen] = useState(INIT_MODAL)
  const [detailProps, setDetailProps] = useState(INIT_DETAIL_PROPS)
  const [dateRange, setDateRange] = useState([dayjs().startOf('month').format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")]);
  // REDUCER
  const dispatch = useAppDispatch()
  // USE CONTEXT
  const { step, setStep } = useContext(PageContext)

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getWIM, reducerName: 'vehicleWeight', reducerKey: 'wim'
  })

  const [apiGetDetailTable, loadingDetailTable, detailTable] = useGetAPI('overlay', {
    funcDispatch: getWeightWIMLog, reducerName: 'vehicleWeight', reducerKey: 'wim'
  })

  const [apiGetDetailModal, loadingDetailModal, detailModal] = useGetAPI('overlay', {
    funcDispatch: getWeightWIMLogDetail, reducerName: 'vehicleWeight', reducerKey: 'wim'
  })

  const [apiGetMasterStation, loadingMasterStation, masterStation] = useGetAPI('overlay', {
    funcDispatch: getStationDetail, reducerName: 'master', reducerKey: 'station'
  })

  const [apiGetMasterWIM, loadingMasterWIM, masterWIM] = useGetAPI('overlay', {
    funcDispatch: getMasterWIM, reducerName: 'master', reducerKey: 'wim'
  })

  useEffect(() => {
    if (tabKey === 'wim' && step === 1) {
      apiGetData(`/api/v1/weight/wim_daily`, {
        ...data.overview.search,
        start_date: dayjs(dateRange[0]).format('YYYY-MM-DD'),
        end_date: dayjs(dateRange[1]).format('YYYY-MM-DD'),
        station_id: '',
        page: 1
      }, false, {})
      apiGetMasterWIM('/api/v1/masters/wim', {}, false, {})
    }
    if (tabKey === 'wim' && step === 2) {
      apiGetDetailTable(`/api/v1/weight/weight_wim_log`, {
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
    const responseModal = await apiGetDetailModal(`/api/v1/weight/weight_wim_log/${record.td_id}`, {}, false, {})
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
  //   const responseModal = await apiGetDetailModal(`/api/v1/weight/weight_wim_log/${record.td_id}`, {}, false, {})
  //   if (responseModal?.success) {
  //     const response = await apiGetMasterStation(`/api/v1/masters/station/${record.station_id}`, {}, false, {})
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
  // }, [apiGetDetailModal, apiGetMasterStation])

  const onChangePage = useCallback((page, perPage) => {
    if (tabKey === 'wim' && step === 1) {
      apiGetData(`/api/v1/weight/wim_daily`, { ...data.overview.search, page: page, page_size: perPage }, false, {})
    }
    if (tabKey === 'wim' && step === 2) {
      apiGetDetailTable(`/api/v1/weight/weight_wim_log`, { ...detailTable.detail.table.search, page: page, page_size: perPage }, false, {})
    }
  }, [data.overview.search, detailTable.detail.table.search, apiGetDetailTable, apiGetData, tabKey, step])

  const clearData = useCallback(() => {
    apiGetData(`/api/v1/weight/wim_daily`, {
      ...data.overview.search,
      start_date: dayjs().startOf('month').format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      station_id: '',
      page: 1,
      page_size: 10
    }, false, {})
    dispatch(clearWIM(data.overview.search))
  }, [data, apiGetData, dispatch])

  const getDetail = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <>
            <section>
              <FormSearchWIM
                initialValues={data.overview.search}
                apiGetData={apiGetData}
                clearData={clearData}
                dateRange={dateRange}
                // MASTER DATA
                wim={masterWIM}
                percentage={data.overview.is_over10percent_count}
              />
            </section>
            <section className='mt-5'>
              <TableWIM
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
          <TableWIMDetail
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
  }, [
    apiGetData,
    clearData,
    data,
    detailTable,
    loading,
    loadingDetailTable,
    onChangePage,
    openModalWithData,
    setCurrentStep,
    setStep,
    step,
    masterWIM,
    dateRange
  ])

  return (
    <DateContext.Provider value={{ setDateRange }}>
      <div>
        {getDetail}
        <ModalWIMDetail
          open={open.open}
          info={open.info}
          setOpen={setOpen}
        />
      </div>
    </DateContext.Provider>
  )
}

export default React.memo(WIMWeighingUnit)
