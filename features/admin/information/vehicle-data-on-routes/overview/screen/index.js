import React, { useEffect } from 'react'
import { Row, Col } from 'antd'
import { MapSection, DetailCardSection } from '../components/content'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getGPSOverview } from '@/store/features/informationSlice'

const OverviewScreen = (props) => {
  const { } = props

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getGPSOverview, reducerName: 'information', reducerKey: 'gps'
  })

  useEffect(() => {
    apiGetData('/api/v1/info/all_vehical_location', {}, false)
  }, [])

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
        />
      </Col>
    </Row>
  )
}

export default React.memo(OverviewScreen)
