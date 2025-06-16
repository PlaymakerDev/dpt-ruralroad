import React, { useCallback, useEffect, useRef } from 'react'
import { Row, Col, Button } from 'antd'
import { MapSection, DetailCardSection } from '../components/content'
import { getGPSDetail } from '@/store/features/informationSlice'
import { getRoadDetailByRoadCode } from '@/store/features/masterSlice'
import useGetAPI from '@/utils/hooks/api/useGetAPI'

const ViewScreen = (props) => {
  const { id } = props
  const isLoad = useRef(false)

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getGPSDetail, reducerName: 'information', reducerKey: 'gps'
  })

  const [apiGetRoadDetail, loadRoadDetail, roadDetail] = useGetAPI('overlay', {
    funcDispatch: getRoadDetailByRoadCode, reducerName: 'master', reducerKey: 'roads'
  })

  useEffect(() => {
    if (isLoad.current === true) return

    apiGetData('/api/v1/info/vehical_location', { way_name: id }, false)
    apiGetRoadDetail(`/api/v1/masters/roads/road_code/${id}`, {}, false)

    return () => {
      isLoad.current = true
    }
  }, [isLoad])

  // useEffect(() => {
  //   apiGetData('/api/v1/info/vehical_location', { way_name: id }, false)
  //   apiGetRoadDetail(`/api/v1/masters/roads/road_code/${id}`, {}, false)
  // }, [])

  const onReload = useCallback(() => {
    apiGetData('/api/v1/info/vehical_location', { way_name: id }, false)
  }, [])

  return (
    <section>
      <section className='mb-3'>
        <Button
          type='primary'
          htmlType='button'
          onClick={() => onReload()}
        >
          อัปเดทข้อมูลสายทาง
        </Button>
      </section>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <MapSection
            data={data.detail.data}
            loading={loading}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <DetailCardSection
            // DATA
            data={data.detail.data}
            detail={roadDetail.road_code}
            // LOADING
            loading={loading}
            loadDetail={loadRoadDetail}
          />
        </Col>
      </Row>
    </section>
  )
}

export default React.memo(ViewScreen)
