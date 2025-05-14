import React, { useCallback, useEffect } from 'react'
import { FormSearchSummary } from '../form'
import { TableSummary } from '../table'
// API
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getSummary, clearSummary } from '@/store/features/vehicleWeightSlice'
import dayjs from 'dayjs'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'next/router'

const WeighingSummary = (props) => {
  const { tabKey, formSearch } = props
  const dispatch = useAppDispatch()
  const router = useRouter();

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getSummary, reducerName: 'vehicleWeight', reducerKey: 'summary'
  })

  useEffect(() => {
    if (tabKey === 'summary') {
      apiGetData(`/api/v1/weight/sum_daily`, {
        ...data.overview.search,
        start_date: router.query.start_date ? router.query.start_date : dayjs().startOf('month').format('YYYY-MM-DD'),
        end_date: router.query.end_date ? router.query.end_date : dayjs().format('YYYY-MM-DD'),
        search: '',
        page: 1,
        ordering: 'ASC'
      }, false, {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabKey])

  const onChangePage = useCallback((page, perPage) => {
    apiGetData(`/api/v1/weight/sum_daily`, {
      ...data.overview.search,
      page: page,
      page_size: perPage
    }, false, {})
  }, [data.overview.search, apiGetData])

  const clearData = useCallback(() => {
    apiGetData(`/api/v1/weight/sum_daily`, {
      ...data.overview.search,
      start_date: dayjs().startOf('month').format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      search: '',
      page: 1,
      page_size: 10,
      ordering: 'ASC',
    }, false, {})
    dispatch(clearSummary(data.overview.search))
  }, [data, apiGetData, dispatch])

  return (
    <div>
      <section>
        <FormSearchSummary
          initialValues={data.overview.search}
          apiGetData={apiGetData}
          clearData={clearData}
        />
      </section>
      <section className='mt-5'>
        <TableSummary
          // API DATA
          data={data.overview.data}
          loading={loading}
          // search
          formSearch={formSearch}
          // PAGE API
          page={data.overview.search.page}
          perPage={data.overview.search.page_size}
          total={data.overview.meta.total}
          onChange={onChangePage}
        />
      </section>
    </div>
  )
}

export default React.memo(WeighingSummary)
