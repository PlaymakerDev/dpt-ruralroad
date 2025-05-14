import React, { useCallback, useEffect, useMemo, useState, useContext, createContext } from 'react'
import { FormSearchMobile } from '../form'
import { TableMobile } from '../table'
import { FormMobileDetail, TableMobileDetail } from '../detail'
import { Button, message, Spin, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import {
  ModalImagePreview,
  ModalVehicleDetail,
  ModalAddMobileVehicleWeight,
  ModalAddMobileDepartment
} from '../modal'
// API
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getMobile, getWeightMobileCar, getWeightMobileMasterDepartment, getWeightMobileCarDetail, clearMobile, getImagePreview, clearWeightMobileCar } from '@/store/features/vehicleWeightSlice'
import dayjs from 'dayjs'
import { useAppDispatch } from '@/store/hooks'
import { PageContext } from '@/pages/admin/vehicle-weight/overview'
import { getDepartmentAll as getMasterDepartmentAll } from '@/store/features/masterSlice'
import { useSelector } from 'react-redux'
import { getTruckDetail } from '@/store/features/informationSlice'

const INIT_MODAL = { open: false, info: {} }
const INIT_DETAIL_PROPS = { tid: '', td_id: '' }

export const DateContext = createContext();

const MobileWeighingUnit = (props) => {
  const { tabKey, setCurrentStep } = props
  // SET STEP
  const [dateRange, setDateRange] = useState([dayjs().startOf('month').format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")]);
  // const [step, setStep] = useState(1)
  // SET OPEN MODAL
  const [openMobile, setOpenMobile] = useState(INIT_MODAL)
  const [openPreview, setOpenPreview] = useState(INIT_MODAL)
  const [openAddVehicle, setOpenAddVehicle] = useState(INIT_MODAL)
  const [openVehicle, setOpenVehicle] = useState(INIT_MODAL)
  const [detailProps, setDetailProps] = useState(INIT_DETAIL_PROPS)
  const [imageTDID, setimageTDID] = useState(INIT_DETAIL_PROPS)
  // USE CONTEXT
  const { step, setStep } = useContext(PageContext)
  // REDUCER
  const dispatch = useAppDispatch()

  const ImageFromStore = useSelector((state) => state.vehicleWeight.mobile.imagepreview);

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getMobile, reducerName: 'vehicleWeight', reducerKey: 'mobile'
  })

  const [apiGetDetailCard, loadingDetailCard, detailCard] = useGetAPI('overlay', {
    funcDispatch: getWeightMobileMasterDepartment, reducerName: 'vehicleWeight', reducerKey: 'mobile'
  })

  const [apiGetDetailTable, loadingDetailTable, detailTable] = useGetAPI('overlay', {
    funcDispatch: getWeightMobileCar, reducerName: 'vehicleWeight', reducerKey: 'mobile'
  })

  const [apiGetDetailModal, loadingDetailModal, detailModal] = useGetAPI('overlay', {
    funcDispatch: getWeightMobileCarDetail, reducerName: 'vehicleWeight', reducerKey: 'mobile'
  })

  const [apiGetMasterDepartment, loadingMasterDepartment, masterDepartment] = useGetAPI('overlay', {
    funcDispatch: getMasterDepartmentAll, reducerName: 'master', reducerKey: 'departments'
  })

  const [apiGetImagePreview, loadingImagePreview, ImagePreview] = useGetAPI('overlay', {
    funcDispatch: getImagePreview, reducerName: 'vehicleWeight', reducerKey: 'mobile'
  })

  const [apiGetTruckData, Truckloading, Truckdata] = useGetAPI('overlay', {
    funcDispatch: getTruckDetail, reducerName: 'information', reducerKey: 'overweight_vehicle'
  })

  useEffect(() => {
    if (tabKey === 'mobile' && step === 1) {
      apiGetData(`/api/v1/weight/mobile_master`, {
        ...data.overview.search,
        start_date: dayjs(dateRange[0]).format('YYYY-MM-DD'),
        end_date: dayjs(dateRange[1]).format('YYYY-MM-DD'),
      }, false, {})
      apiGetMasterDepartment('/api/v1/masters/departments_all', {}, false, {})
    }
    if (tabKey === 'mobile' && step === 2) {
      apiGetDetailCard(`/api/v1/weight/weight_mobile_master_department/${detailProps.tid}`, {}, false, {})
      dispatch(clearWeightMobileCar())
      apiGetDetailTable('/api/v1/weight/weight_mobile_car', {
        ...detailTable.detail.table.search,
        tid: detailProps.tid,
        page: 1,
        page_size: 10
      }, false, {})

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabKey, step, detailProps])


  const onChangeTable = useCallback((page, perPage) => {
    if (tabKey === 'mobile' && step === 2) {
      apiGetDetailTable(`/api/v1/weight/weight_mobile_car`, {
        ...detailTable.detail.table.search,
        page: page,
        page_size: perPage
      }, false, {})
    }
  }, [apiGetDetailTable, detailTable, step, tabKey])

  const openModalWithData = useCallback(async (record) => {
    const response = await Promise.all([
      apiGetDetailModal(`/api/v1/weight/weight_mobile_car/${record.td_id}`, {}, false, {}),
      apiGetTruckData(`/api/v1/info/weight/spot/${record.td_id}`, {}, false)
    ])
    if (response[0]?.success) {
      setOpenVehicle({
        open: true,
        info: {
          mobile: response[0]?.data[0],
          spot: response[1]
        }
      })
    } else {
      message.error('Failed to open modal')
    }
    // const response = await apiGetDetailModal(`/api/v1/weight/weight_mobile_car/${record.td_id}`, {}, false, {})
    // if (response?.success) {
    //   setOpenVehicle({
    //     open: true,
    //     info: {
    //       log: response?.data[0],
    //     }
    //   })
    // }
  }, [apiGetDetailModal, apiGetTruckData])

  const openImageModalWithData = useCallback(async (record) => {
    const response = await apiGetImagePreview(`/api/v1/weight/weight_mobile_master_detail/photo/${record.t_id}/${record.td_id}`, {}, false, {})
    if (response.success) {
      setOpenPreview({
        open: true,
        info: {
          log: response?.data[0],
        }
      })
    }
  }, [apiGetImagePreview])

  const onChangePage = useCallback((page, perPage) => {
    if (tabKey === 'mobile' && step === 1) {
      apiGetData(`/api/v1/weight/mobile_master`, { ...data.overview.search, page: page, page_size: perPage }, false, {})
    }
    if (tabKey === 'mobile' && step === 2) {
      apiGetDetailTable(`/api/v1/weight/weight_mobile_car`, { ...detailTable.detail.table.search, page: page, page_size: perPage }, false, {})
    }
  }, [apiGetData, apiGetDetailTable, data, detailTable, step, tabKey])

  const clearData = useCallback(() => {
    apiGetData(`/api/v1/weight/mobile_master`, {
      ...data.overview.search,
      start_date: dayjs().startOf('month').format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      branch: '',
      page: 1,
      page_size: 10
    }, false, {})
    dispatch(clearMobile(data.overview.search))
  }, [data, apiGetData, dispatch])

  const reload = useCallback(() => {
    apiGetData(`/api/v1/weight/mobile_master`, { ...data.overview.search }, false, {})
  }, [apiGetData, data.overview.search])

  const reloadDetail = useCallback(() => {
    apiGetDetailTable(`/api/v1/weight/weight_mobile_car`, { ...detailTable.detail.table.search }, false, {})
  }, [apiGetDetailTable, detailTable.detail.table.search])

  const renderDepartmentDetail = useMemo(() => {
    if (!loadingDetailCard && typeof loadingDetailCard !== 'undefined') {
      return (
        <FormMobileDetail
          tid={detailProps.tid}
          data={detailCard.detail.card.data}
        />
      )
    } else {
      return (
        <Spin
          spinning={loadingDetailCard}
        />
      )
    }
  }, [loadingDetailCard, detailCard, detailProps])

  const renderDepartmentTable = useMemo(() => {
    if (!loadingDetailTable && typeof loadingDetailTable !== 'undefined') {
      return (
        <TableMobileDetail
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
          // setOpen={setOpen}
          openModalWithData={openModalWithData}
          reload={reloadDetail}
          openImageModalWithData={openImageModalWithData}
          setimageTDID={setimageTDID}
        />
      )
    } else {
      return (
        <Spin
          spinning={loadingDetailTable}
        />
      )
    }
  }, [loadingDetailTable, detailTable, onChangePage, setCurrentStep, setStep, openModalWithData, reloadDetail, openImageModalWithData])

  const getDetail = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <>
            <section>
              <FormSearchMobile
                initialValues={data.overview.search}
                apiGetData={apiGetData}
                setOpen={setOpenMobile}
                clearData={clearData}
                dateRange={dateRange}
                // MASTER DATA
                department={masterDepartment}
              />
            </section>
            <section className='mt-5'>
              <TableMobile
                // API DATA
                data={data.overview.data}
                loading={loading}
                // PAGE API
                page={data.overview.search.page}
                perPage={data.overview.search.page_size}
                total={data.overview.meta.total}
                onChange={onChangePage}
                setStep={setStep}
                setCurrentStep={setCurrentStep}
                setDetailProps={setDetailProps}
                reload={reload}
              />
            </section>
            <ModalAddMobileDepartment
              open={openMobile.open}
              setOpen={setOpenMobile}
              onReload={reload}
              tid={detailProps}
            />
          </>
        )
      case 2:
        return (
          <>
            <section>
              {renderDepartmentDetail}
            </section>
            <section className='mt-5'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <Typography.Title level={5} className='!m-0'>ข้อมูลรถเข้าชั่ง</Typography.Title>
                <Button
                  type='primary'
                  size='large'
                  icon={<PlusOutlined />}
                  className='!w-full lg:!w-auto'
                  onClick={() => setOpenAddVehicle({ open: true })}
                >
                  เพิ่มข้อมูลรถที่เข้าชั่ง
                </Button>
              </div>
              <div className='mt-3'>
                {renderDepartmentTable}
              </div>
            </section>
          </>
        )
      default:
        return null
    }
  }, [
    apiGetData,
    clearData,
    data,
    loading,
    masterDepartment,
    onChangePage,
    openMobile,
    setCurrentStep,
    setStep,
    step,
    renderDepartmentDetail,
    renderDepartmentTable,
    reload,
    dateRange,
    detailProps
  ])

  const td_id = openVehicle?.info?.mobile
    ?.td_id ? openVehicle.info.mobile
    .td_id : ''

  return (
    <DateContext.Provider value={{ setDateRange }}>
      <div>
        {getDetail}
        <ModalImagePreview
          open={openPreview.open}
          setOpen={setOpenPreview}
          ImagePreview={ImagePreview}
          imageTDID={imageTDID}
        />
        <ModalAddMobileVehicleWeight
          open={openAddVehicle.open}
          tid={detailProps}
          setOpen={setOpenAddVehicle}
          reload={reloadDetail}
          latestTDID={detailTable.detail.table.data}
        />
        <ModalVehicleDetail
          open={openVehicle.open}
          info={openVehicle.info}
          // detailModal={detailModal}
          td_id={td_id}
          onChangeTable={onChangeTable}
          setOpen={setOpenVehicle}
        />
      </div>
    </DateContext.Provider>
  )
}

export default React.memo(MobileWeighingUnit)
