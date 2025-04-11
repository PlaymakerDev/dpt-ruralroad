import React, { useCallback, useEffect } from 'react'
import { Pagination } from 'antd'
import { FormSearchCollaborate, TableCollaborate } from '../components'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getCollaboration, clearCollaboration } from '@/store/features/informationSlice'
import { getDepartment, getCollaborativeList, getWayAll, getDepartmentAll } from '@/store/features/masterSlice'
import { useAppDispatch } from '@/store/hooks'
import dayjs from 'dayjs'

const CollaborationAndIntegrationScreen = (props) => {
  const { } = props
  // DISPATCH
  const dispatch = useAppDispatch()
  // API GET
  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getCollaboration, reducerName: 'information', reducerKey: 'collaboration_and_integration'
  })
  const [apiGetDepartment, loadingDepartment, department] = useGetAPI('overlay', {
    funcDispatch: getDepartmentAll, reducerName: 'master', reducerKey: 'departments'
  })
  const [apiGetCollaborateList, loadingCollaborateList, collaborateList] = useGetAPI('overlay', {
    funcDispatch: getCollaborativeList, reducerName: 'master', reducerKey: 'collaborative_list'
  })
  const [apiGetWayAll, loadingWayAll, wayAll] = useGetAPI('overlay', {
    funcDispatch: getWayAll, reducerName: 'master', reducerKey: 'way'
  })
  // FETCH DATA
  useEffect(() => {
    apiGetData('/api/v1/info/collaboration', {
      start_date: dayjs().startOf('month').format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      page: 1,
      page_size: 10,
      order: 'ASC'
    }, false, {})
    apiGetDepartment('/api/v1/masters/departments_all', {}, false, {})
    apiGetCollaborateList('/api/v1/masters/collaborative_list', {}, false, {})
    apiGetWayAll('/api/v1/masters/way_all', {}, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ON CHANGE PAGE
  const onChangePage = useCallback((page, perPage) => {
    apiGetData(`/api/v1/info/collaboration`, {
      ...data.collaboration.search,
      page: page,
      page_size: perPage
    }, false, {})
  }, [apiGetData, data])

  // CLEAR DATA
  const clearData = useCallback(() => {
    apiGetData(`/api/v1/info/collaboration`, {
      ...data.collaboration.search,
      start_date: dayjs().startOf('month').format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      page: 1,
      page_size: 10,
      order: 'ASC'
    }, false, {})
    dispatch(clearCollaboration(data.collaboration.search))
  }, [data, apiGetData, dispatch])

  return (
    <div>
      <section>
        <FormSearchCollaborate
          initialValues={data.collaboration.search}
          apiGetData={apiGetData}
          clearData={clearData}
          // MASTER FILTER
          department={department}
          collaborateList={collaborateList}
          allWay={wayAll}
        />
      </section>
      <section className='mt-5'>
        <TableCollaborate
          data={data.collaboration.data}
          loading={loading}
          page={data.collaboration.search.page}
          pageSize={data.collaboration.search.page_size}
        />
      </section>
      <section className='mt-5'>
        <div className='flex justify-center'>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={10}
            current={data.collaboration.search.page}
            pageSize={data.collaboration.search.page_size}
            total={data.collaboration.meta.total}
            onChange={(pageNumber, pageSize) => onChangePage(pageNumber, pageSize)}
            // onShowSizeChange={(_, pageSize) => handleOnChangePageSize(pageSize)}
            showSizeChanger={false}
            hideOnSinglePage={data.collaboration.meta.total === 0}
          />
        </div>
      </section>
    </div>
  )
}

export default React.memo(CollaborationAndIntegrationScreen)
