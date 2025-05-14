import React, { useCallback, useEffect, createContext, useState, useContext } from 'react'
import { FormSearchStationary } from '../form'
import { TableStationary } from '../table'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getStationOverview, clearStationOverview } from '@/store/features/informationSlice'
import { getStation as getMasterStation } from '@/store/features/masterSlice'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/router';
import { FormSearchNew } from '../../screen'

const Stationary = (props) => {
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
    funcDispatch: getStationOverview, reducerName: 'information', reducerKey: 'overweight_vehicle'
  })

  const [apiGetMasterStation, loadingMasterStation, masterStation] = useGetAPI('overlay', {
    funcDispatch: getMasterStation, reducerName: 'master', reducerKey: 'station'
  })

  // USE EFFECT
  useEffect(() => {
    if (tabKey === 'stationary') {
      apiGetData('/api/v1/info/weight_arrest/station', {
        // ...data.stationary.overview.search,
        plan_year: query.plan_year ? query.plan_year : reportYear().format('YYYY'),
        start_date: query.start_date ? query.start_date : dayjs().startOf('month').format('YYYY-MM-DD'),
        end_date: query.end_date ? query.end_date : dayjs().format('YYYY-MM-DD'),
        ...(query.station_id && { station_id: query.station_id }),
        page: query.page ? query.page : 1,
        page_size: 10,
        order: 'ASC'
      }, false, {})
      apiGetMasterStation('/api/v1/masters/station', {}, false, {})
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
    if (tabKey === 'stationary') {
      apiGetData(`/api/v1/info/weight_arrest/station`, { ...data?.stationary?.overview?.search, page: page, page_size: perPage }, false, {})
      setFormSearch({ ...formSearch, page: page })
    }
  }, [tabKey, apiGetData, data])

  const clearData = useCallback(() => {
    apiGetMasterStation('/api/v1/masters/station', {}, false, {})
    apiGetData(`/api/v1/info/weight_arrest/station`, {
      // ...data.stationary.overview.search,
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
    dispatch(clearStationOverview(data?.stationary?.overview?.search))
  }, [data, apiGetData, dispatch])
  return (
    <div>
      <section>
        <FormSearchStationary
          initialValues={data?.stationary?.overview?.search}
          apiGetData={apiGetData}
          clearData={clearData}
          // CONTEXT
          formSearch={formSearch}
          // MASTER DATA
          station={masterStation}
        />
      </section>
      <section className='mt-5'>
        <TableStationary
          // API DATA
          data={data?.stationary?.overview?.data}
          loading={loading}
          // CONTEXT
          formSearch={formSearch}
          // PAGE API
          page={data?.stationary?.overview?.search?.page}
          perPage={data?.stationary?.overview?.search?.page_size}
          total={data?.stationary?.overview?.meta?.total}
          onChange={onChangePage}
          role={role}
        />
      </section>
    </div>
  )
}

export default React.memo(Stationary)
