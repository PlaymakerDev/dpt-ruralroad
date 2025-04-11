import React, { useState, useEffect, useCallback, useContext } from 'react'
import { FormSearchMobile } from '../form'
import { TableMobile } from '../table'
import { ModalVehicleDetail } from '../modal'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getMobileOverview, clearMobileOverview } from '@/store/features/informationSlice'
import { getDepartmentAll as getMasterDepartmentAll } from '@/store/features/masterSlice'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/router';
import { FormSearchNew } from '../../screen'

const INIT_MODAL = { open: false, td_id: '' }

const Mobile = (props) => {
  const { setFormSearch, localVehicleMenuTab, setLocalVehicleMenuTab } = useContext(FormSearchNew);

  const { tabKey, formSearch } = props
  const { query } = useRouter();
  // STATE
  const [open, setOpen] = useState(INIT_MODAL)
  // DISPATCH
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const role = user?.map_group_name
  // year
  const reportYear = () => {
    const planDate = dayjs(`30/09/${dayjs().year()}`, 'DD/MM/YYYY');
    const currentDate = dayjs();
    if (currentDate.isAfter(planDate)) {
      return (dayjs().add(1, 'year'))
    } else {
      return (dayjs())
    }
  }
  // USE GET API
  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getMobileOverview, reducerName: 'information', reducerKey: 'overweight_vehicle'
  })

  const [apiGetMasterDepartment, loadingMasterDepartment, masterDepartment] = useGetAPI('overlay', {
    funcDispatch: getMasterDepartmentAll, reducerName: 'master', reducerKey: 'departments'
  })

  // USE EFFECT
  useEffect(() => {
    if (tabKey === 'mobile') {
      apiGetData('/api/v1/info/weight_arrest/spot', {
        // ...data.mobile.overview.search,
        plan_year: query.plan_year ? query.plan_year : reportYear().format('YYYY'),
        start_date: query.start_date ? query.start_date : dayjs().format('YYYY-MM-DD'),
        end_date: query.end_date ? query.end_date : dayjs().format('YYYY-MM-DD'),
        // department_id: query.department_id ? query.department_id : '',
        ...(query.department_id && { department_id: query.department_id }),
        // department_id: Number(query.department_id) || '',
        page: query.page ? query.page : 1,
        page_size: 10,
        order: 'ASC'
      }, false, {})
      apiGetMasterDepartment('/api/v1/masters/departments_all', {}, false, {})
      setFormSearch({
        plan_year: query.plan_year ? query.plan_year : reportYear().format('YYYY'),
        start_date: query.start_date ? query.start_date : dayjs().format('YYYY-MM-DD'),
        end_date: query.end_date ? query.end_date : dayjs().format('YYYY-MM-DD'),
        department_id: query.department_id ? query.department_id : '',
        page: query.page ? query.page : 1,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabKey])

  const onChangePage = useCallback((page, perPage) => {
    if (tabKey === 'mobile') {
      apiGetData(`/api/v1/info/weight_arrest/spot`, {
        ...data.mobile.overview.search,
        page: page,
        page_size: perPage
      }, false, {})
      setFormSearch({ ...formSearch, page: page })
    }
  }, [tabKey, apiGetData, data])

  const clearData = useCallback(() => {
    apiGetMasterDepartment('/api/v1/masters/departments_all', {}, false, {})
    apiGetData(`/api/v1/info/weight_arrest/spot`, {
      plan_year: reportYear().format('YYYY'),
      start_date: dayjs().format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      // department_id: '',
      page: 1,
      page_size: 10,
      order: 'ASC'
    }, false, {})
    setFormSearch({
      plan_year: reportYear().format('YYYY'),
      start_date: dayjs().format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      department_id: '',
      page: 1,

    })
  }, [data, apiGetData, dispatch])


  return (
    <div>
      <section>
        <FormSearchMobile
          initialValues={data.mobile.overview.search}
          apiGetData={apiGetData}
          clearData={clearData}
          // MASTER DATA
          department={masterDepartment}
        />
      </section>
      <section className='mt-5'>
        <TableMobile
          // API DATA
          data={data.mobile.overview.data}
          loading={loading}
          // CONTEXT
          formSearch={formSearch}
          // PAGE API
          page={data.mobile.overview.search.page}
          perPage={data.mobile.overview.search.page_size}
          total={data.mobile.overview.meta.total}
          onChange={onChangePage}
          // STATE
          setOpen={setOpen}
          role={role}
        />
      </section>
      <ModalVehicleDetail
        open={open.open}
        setOpen={setOpen}
        td_id={open.td_id}
        changeTable={onChangePage}
      />
    </div>
  )
}

export default React.memo(Mobile)
