import React, { useCallback, useEffect, createContext, useState, useContext } from 'react'
import { FormSearchWIM } from '../form'
import { TableWIM } from '../table'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getWIMOverview, clearWIMOverview } from '@/store/features/informationSlice'
import { getWIM as getMasterWIM } from '@/store/features/masterSlice'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/router';
import { FormSearchNew } from '../../screen'

const WIM = (props) => {
  const { setFormSearch, localVehicleMenuTab, setLocalVehicleMenuTab } = useContext(FormSearchNew);

  const { tabKey, formSearch } = props
  const { query } = useRouter();
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
    funcDispatch: getWIMOverview, reducerName: 'information', reducerKey: 'overweight_vehicle'
  })

  const [apiGetMasterWIM, loadingMasterWIM, masterWIM] = useGetAPI('overlay', {
    funcDispatch: getMasterWIM, reducerName: 'master', reducerKey: 'wim'
  })

  // USE EFFECT
  useEffect(() => {
    if (tabKey === 'wim') {
      apiGetData('/api/v1/info/weight_arrest/wim', {
        // ...data.wim.overview.search,
        plan_year: query.plan_year ? query.plan_year : reportYear().format('YYYY'),
        start_date: query.start_date ? query.start_date : dayjs().startOf('month').format('YYYY-MM-DD'),
        end_date: query.end_date ? query.end_date : dayjs().format('YYYY-MM-DD'),
        // station_id: query.station_id ? query.station_id : '',
        ...(query.station_id && { station_id: query.station_id }),
        page: query.page ? query.page : 1,
        page_size : 10,
        order: 'ASC'
      }, false, {})
      apiGetMasterWIM('/api/v1/masters/wim', {}, false, {})
      setFormSearch({
        plan_year: query.plan_year ? query.plan_year : reportYear().format('YYYY'),
        start_date: query.start_date ? query.start_date : dayjs().startOf('month').format('YYYY-MM-DD'),
        end_date: query.end_date ? query.end_date : dayjs().format('YYYY-MM-DD'),
        station_id: query.station_id ? query.station_id : '',
        page: query.page ? query.page : 1,

      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabKey])

  const onChangePage = useCallback((page, perPage) => {
    if (tabKey === 'wim') {
      apiGetData(`/api/v1/info/weight_arrest/wim`, {
        ...data.wim.overview.search,
        page: page,
        page_size: perPage
      }, false, {})
      setFormSearch({...formSearch,page:page})
    }
  }, [tabKey, apiGetData, data])

  const clearData = useCallback(() => {
    apiGetMasterWIM('/api/v1/masters/wim', {}, false, {})
    apiGetData(`/api/v1/info/weight_arrest/wim`, {
      // ...data.wim.overview.search,
      plan_year: reportYear().format('YYYY'),
      start_date: dayjs().startOf('month').format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      // station_id: '',
      page: 1,
      page_size: 10,
      order: 'ASC'
    }, false, {})
    setFormSearch({
      plan_year: reportYear().format('YYYY'),
      start_date: dayjs().startOf('month').format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      station_id: '',
      page: 1,

    })
    dispatch(clearWIMOverview(data?.wim?.overview?.search))
  }, [data, apiGetData, dispatch])

  return (
    <div>
      <section>
        <FormSearchWIM
          initialValues={data?.wim?.overview?.search}
          apiGetData={apiGetData}
          clearData={clearData}
          // MASTER DATA
          wim={masterWIM}
        />
      </section>
      <section className='mt-5'>
        <TableWIM
          // API DATA
          data={data?.wim?.overview?.data}
          loading={loading}
          // CONTEXT
          formSearch={formSearch}
          // PAGE API
          page={data?.wim?.overview?.search?.page}
          perPage={data?.wim?.overview?.search?.page_size}
          total={data?.wim?.overview?.meta?.total}
          onChange={onChangePage}
          role={role}
        />
      </section>
    </div>
  )
}

export default React.memo(WIM)
