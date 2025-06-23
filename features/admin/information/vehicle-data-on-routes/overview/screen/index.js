import React, { useEffect, useRef } from 'react'
import { Row, Col } from 'antd'
import { MapSection, DetailCardSection } from '../components/content'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getGPSOverview } from '@/store/features/informationSlice'

const OverviewScreen = (props) => {
  const { } = props
  const isLoad = useRef(false)

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getGPSOverview, reducerName: 'information', reducerKey: 'gps'
  })

  useEffect(() => {
    if (isLoad.current === true) return

    apiGetData('/api/v1/info/all_vehical_location', { search: '' }, false)

    return () => {
      isLoad.current = true
    }
  }, [isLoad])

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
        <MapSection
          data={data.overview.data}
          loading={loading}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
        <DetailCardSection
          data={data.overview.data}
          loading={loading}
          onSearch={apiGetData}
        />
      </Col>
    </Row>
  )
}

export default React.memo(OverviewScreen)
