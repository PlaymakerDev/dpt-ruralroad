import React, { useCallback, useState, useEffect } from 'react'
import { FormSearchEstablishUnit } from '../components/form'
import { TableEstablishUnit } from '../components/table'
import { ModalAddEstablishUnit } from '../components/modal'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getWorkPlans, clearWorkPlans } from '@/store/features/informationSlice'
import { getDepartmentAll } from '@/store/features/masterSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getWayAll } from '@/store/features/masterSlice'
import dayjs from 'dayjs';
import 'dayjs/locale/th'

const INIT_MODAL = { open: false, is_updatable: false, info: {} }

const UnitEstablishmentPlanScreen = (props) => {
  const { } = props
  const [open, setOpen] = useState(INIT_MODAL)
  const [step, setStep] = useState(1)

  const reportYear = () => {
    const planDate = dayjs(`30/09/${dayjs().year()}`, 'DD/MM/YYYY');
    const currentDate = dayjs();
    if (currentDate.isAfter(planDate)) {
      return (dayjs().add(1, 'year'))
    } else {
      return (dayjs())
    }
  }

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const role = user?.map_group_name

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getWorkPlans, reducerName: 'information', reducerKey: 'unit_establishment_plan'
  })
  const [apiGetDepartmentAll, loadingDepartmentAll, departmentAll] = useGetAPI('overlay', {
    funcDispatch: getDepartmentAll, reducerName: 'master', reducerKey: 'departments'
  })
  const [apiGetWayAll, loadingWayAll, wayAll] = useGetAPI('overlay', {
    funcDispatch: getWayAll, reducerName: 'master', reducerKey: 'way'
  })
  
  useEffect(() => {
    apiGetData(`/api/v1/info/workplan_way`, { plan_year: dayjs(reportYear()).format('YYYY') , page: '1' , page_size: '10' , order: 'ASC' , year_type: 'ce_year' }, false, {})
    apiGetDepartmentAll(`/api/v1/masters/departments_all`, undefined, false, {})
    apiGetWayAll('/api/v1/masters/way_all', {}, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    
  const onChangePage = useCallback((page, perPage) => {
    apiGetData(`/api/v1/info/workplan_way`, { ...data.workplans.search, page: page, page_size: perPage }, false, {})
  }, [data.workplans.search, apiGetData])

  const clearData = useCallback(() => {
    apiGetData(`/api/v1/info/workplan_way`, {
      ...data.workplans.search,
      department_id: null,
      order: "ASC",
      page: 1,
      page_size: 10,
      plan_year: reportYear().format('YYYY'),
      year_type: "ce_year",
    }, false, {})
    dispatch(clearWorkPlans(data.workplans.search))
  }, [data, apiGetData, dispatch])

  return (
    <div>
      <section>
        <FormSearchEstablishUnit
          initialValues={data.workplans.search}
          apiGetData={apiGetData}
          setOpen={setOpen}
          clearData={clearData}
          department={departmentAll.all}
          role={role}
        />
      </section>
      <section className='mt-5'>
        <TableEstablishUnit
          setOpen={setOpen}
          // API DATA
          data={data.workplans.data}
          loading={loading}
          // PAGE API
          page={data.workplans.search.page}
          perPage={data.workplans.search.page_size}
          total={data.workplans.meta.total}
          onChange={onChangePage}
          // PAGE STATE
          setStep={setStep}
          apiGetData={apiGetData}
          role={role}
        />
      </section>
      {open.open ?
        <ModalAddEstablishUnit
          open={open.open}
          info={open}
          setOpen={setOpen}
          route={wayAll?.all}
          apiGetData={apiGetData}
          loadingWayAll={loadingWayAll}
        /> : null}
    </div>
  )
}

export default React.memo(UnitEstablishmentPlanScreen)
