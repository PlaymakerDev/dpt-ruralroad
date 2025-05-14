import React, { useCallback, useEffect, useMemo, useState, useContext, createContext } from 'react'
import { FormMobileDetail, TableMobileDetail } from '@/features/admin/vehicle-weight/overview/components/detail'
import { Button, message, Spin, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import {
	ModalImagePreview,
	ModalVehicleDetail,
	ModalAddMobileVehicleWeight,
} from '@/features/admin/vehicle-weight/overview/components/modal'
// API
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getWeightMobileCar, getWeightMobileMasterDepartment, getWeightMobileCarDetail, getImagePreview, clearWeightMobileCar } from '@/store/features/vehicleWeightSlice'
import { useAppDispatch } from '@/store/hooks'
import { getTruckDetail } from '@/store/features/informationSlice'

const INIT_MODAL = { open: false }
const INIT_DETAIL_PROPS = { tid: '', td_id: '' }

const MobileDetailScreen = (props) => {
	const { tid } = props
	const [open, setOpen] = useState(INIT_MODAL)
	// SET OPEN MODAL
	const [openPreview, setOpenPreview] = useState(INIT_MODAL)
	const [openAddVehicle, setOpenAddVehicle] = useState(INIT_MODAL)
	const [openVehicle, setOpenVehicle] = useState(INIT_MODAL)
	const [imageTDID, setimageTDID] = useState(INIT_DETAIL_PROPS)
	const dispatch = useAppDispatch()


	const [apiGetDetailCard, loadingDetailCard, detailCard] = useGetAPI('overlay', {
		funcDispatch: getWeightMobileMasterDepartment, reducerName: 'vehicleWeight', reducerKey: 'mobile'
	})

	const [apiGetDetailTable, loadingDetailTable, detailTable] = useGetAPI('overlay', {
		funcDispatch: getWeightMobileCar, reducerName: 'vehicleWeight', reducerKey: 'mobile'
	})

	const [apiGetDetailModal, loadingDetailModal, detailModal] = useGetAPI('overlay', {
		funcDispatch: getWeightMobileCarDetail, reducerName: 'vehicleWeight', reducerKey: 'mobile'
	})

	const [apiGetImagePreview, loadingImagePreview, ImagePreview] = useGetAPI('overlay', {
		funcDispatch: getImagePreview, reducerName: 'vehicleWeight', reducerKey: 'mobile'
	})

	const [apiGetTruckData, Truckloading, Truckdata] = useGetAPI('overlay', {
		funcDispatch: getTruckDetail, reducerName: 'information', reducerKey: 'overweight_vehicle'
	})

	useEffect(() => {
		if (tid) {
			apiGetDetailCard(`/api/v1/weight/weight_mobile_master_department/${tid}`, {}, false, {})
			dispatch(clearWeightMobileCar())
			apiGetDetailTable('/api/v1/weight/weight_mobile_car', {
				...detailTable.detail.table.search,
				tid: tid,
				page: 1,
				page_size: 10
			}, false, {})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tid])

	const onChangeTable = useCallback((page, perPage) => {
		apiGetDetailTable(`/api/v1/weight/weight_mobile_car`, {
			...detailTable.detail.table.search,
			page: page,
			page_size: perPage
		}, false, {})
	}, [apiGetDetailTable, detailTable])

	const onChangePage = useCallback((page, perPage) => {
		apiGetDetailTable(`/api/v1/weight/weight_mobile_car`, { ...detailTable.detail.table.search, page: page, page_size: perPage }, false, {})
	}, [detailTable.detail.table.search, apiGetDetailTable])

	const reloadDetail = useCallback(() => {
		apiGetDetailTable(`/api/v1/weight/weight_mobile_car`, { ...detailTable.detail.table.search }, false, {})
	}, [apiGetDetailTable, detailTable.detail.table.search])

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

	const td_id = openVehicle?.info?.mobile?.td_id ? openVehicle.info.mobile.td_id : ''

	const renderDepartmentDetail = useMemo(() => {
		if (!loadingDetailCard && typeof loadingDetailCard !== 'undefined') {
			return (
				<FormMobileDetail
					tid={tid}
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
	}, [loadingDetailCard, detailCard])

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
	}, [loadingDetailTable, detailTable, onChangePage, openModalWithData, reloadDetail, openImageModalWithData])

	return (
		<div>
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
			</section>
			<section className='mt-5'>
				{renderDepartmentTable}
			</section>
			<ModalImagePreview
				open={openPreview.open}
				setOpen={setOpenPreview}
				ImagePreview={ImagePreview}
				imageTDID={imageTDID}
			/>
			<ModalAddMobileVehicleWeight
				open={openAddVehicle.open}
				tid={{ tid: tid }}
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
	)
}

export default React.memo(MobileDetailScreen)
