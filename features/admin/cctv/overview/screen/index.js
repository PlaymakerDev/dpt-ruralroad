import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import { MenuCard, CCTVTable } from '../components'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getDepartmentGroup, getDepartmentListSum } from '@/store/features/cctvSlice'
import { useRouter } from 'next/router'
import { CctvID } from '@/pages/_app'

const OverviewScreen = (props) => {
  const { } = props

  const router = useRouter()
  const [cctvActive, setCctvActive] = useState()
  const { cctvID, setCctvID, cctvPage, setCctvPage } = useContext(CctvID);


  const [apiGetDepartmentGroup, loadDepartmentGroup, departmentGroup] = useGetAPI('overlay', {
    funcDispatch: getDepartmentGroup, reducerName: 'cctv', reducerKey: 'department_group'
  })

  const [apiGetDepartmentListSum, loadDepartmentListSum, departmentListSum] = useGetAPI('overlay', {
    funcDispatch: getDepartmentListSum, reducerName: 'cctv', reducerKey: 'deparment_list_sum'
  })

  useEffect(() => {
    apiGetDepartmentGroup('/api/v1/cctv/department_group', {
      ...departmentGroup.search
    }, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCctvActive(cctvID)
    setCctvID(0)
  }, [])

  useEffect(() => {

    if (cctvActive != null) {
      apiGetDepartmentListSum('/api/v1/cctv/deparment_list_sum', {
        ...departmentListSum.search,
        department_id: cctvActive,
      }, false)
    } else {
      apiGetDepartmentListSum('/api/v1/cctv/deparment_list_sum', {
        ...departmentListSum.search,
        department_id: 0,
      }, false)
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  }, [cctvActive])

  const findDepartmentListSum = useCallback(async (department_id) => {
    setCctvActive(department_id)
  }, [apiGetDepartmentListSum, departmentListSum])

  const onChangePage = useCallback((page, perPage) => {
    apiGetDepartmentListSum('/api/v1/cctv/deparment_list_sum', { ...departmentListSum.search, page: page, page_size: perPage }, false, {})
  }, [apiGetDepartmentListSum, departmentListSum])

  return (
    <>
      <Row gutter={[30, 30]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} className='!w-full'>
          <MenuCard
            data={departmentGroup.data}
            active={cctvActive || 0}
            findDepartmentListSum={findDepartmentListSum}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} className='!w-full'>
          <CCTVTable
            // API DATA
            setCctvID={setCctvID}
            data={departmentListSum.data}

            loading={loadDepartmentListSum}
            // PAGE API
            page={departmentListSum.search.page}
            perPage={departmentListSum.search.page_size}
            total={departmentListSum.meta.total}
            onChange={onChangePage}
          />
        </Col>
      </Row>
    </>
  )
}

export default React.memo(OverviewScreen)
